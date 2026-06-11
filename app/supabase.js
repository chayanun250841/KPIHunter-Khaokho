/* KPI HUNTER — Supabase Client */
(function () {
  var cfg = window.KPIHUNTER_CONFIG;

  /* ถ้ายังไม่ได้ตั้งค่า → ใช้ localStorage อย่างเดียว */
  if (!cfg || !cfg.supabaseUrl || cfg.supabaseUrl.indexOf('YOUR_') === 0) {
    console.info('[KPI Hunter] Supabase not configured — using localStorage only');
    window.KPIHUNTER_DB = null;
    return;
  }

  if (typeof supabase === 'undefined') {
    console.warn('[KPI Hunter] Supabase SDK not loaded');
    window.KPIHUNTER_DB = null;
    return;
  }

  var db = supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey);

  window.KPIHUNTER_DB = {

    /* โหลดผลงาน KPI ทั้งหมดจาก DB */
    loadResults: function () {
      return db.from('kpi_results').select('kpi_id, result, passfail, updated_at')
        .then(function (res) {
          if (res.error) throw res.error;
          return res.data || [];
        });
    },

    /* บันทึก KPI เดียว */
    saveResult: function (kpiId, result, passfail) {
      return db.from('kpi_results').upsert({
        kpi_id: kpiId,
        result: result,
        passfail: passfail,
        updated_at: new Date().toISOString()
      }, { onConflict: 'kpi_id' })
        .then(function (res) { if (res.error) throw res.error; });
    },

    /* บันทึกทุก KPI พร้อมกัน (หลังอัปโหลด Excel) */
    saveAllResults: function (kpis) {
      var rows = kpis
        .filter(function (k) { return k.passfail !== ''; })
        .map(function (k) {
          return {
            kpi_id: k.id,
            result: k.result,
            passfail: k.passfail,
            updated_at: new Date().toISOString()
          };
        });
      if (!rows.length) return Promise.resolve();
      return db.from('kpi_results').upsert(rows, { onConflict: 'kpi_id' })
        .then(function (res) { if (res.error) throw res.error; });
    },

    /* บันทึก session การอัปโหลด */
    saveUploadSession: function (meta) {
      return db.from('upload_sessions').insert({
        file_name: meta.fileName,
        upload_date: meta.uploadDate,
        rows_count: meta.rows
      }).then(function (res) { if (res.error) throw res.error; });
    },

    /* ดึงประวัติการอัปโหลดล่าสุด */
    getLastUpload: function () {
      return db.from('upload_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .then(function (res) {
          if (res.error || !res.data || !res.data.length) return null;
          var row = res.data[0];
          return { fileName: row.file_name, uploadDate: row.upload_date, rows: row.rows_count };
        });
    },

    /* ─── unitPerformance (ผลงานรายหน่วย) ─── */
    saveUnitPerf: function (unitPerformance) {
      var rows = Object.keys(unitPerformance).map(function(kpiId) {
        return {
          kpi_id: kpiId,
          unit_data: unitPerformance[kpiId],
          updated_at: new Date().toISOString()
        };
      });
      if (!rows.length) return Promise.resolve();
      return db.from('kpi_unit_perf').upsert(rows, { onConflict: 'kpi_id' })
        .then(function(res) { if (res.error) throw res.error; });
    },

    loadUnitPerf: function () {
      return db.from('kpi_unit_perf').select('kpi_id, unit_data')
        .then(function(res) {
          if (res.error) throw res.error;
          var out = {};
          (res.data || []).forEach(function(row) { out[row.kpi_id] = row.unit_data; });
          return out;
        });
    },

    /* ─── App settings (year/month/district) ─── */
    saveAppSettings: function (settings) {
      return db.from('app_settings').upsert(
        { key: 'meta', value: settings, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      ).then(function(res) { if (res.error) throw res.error; });
    },

    loadAppSettings: function () {
      return db.from('app_settings').select('value').eq('key', 'meta').limit(1)
        .then(function(res) {
          if (res.error || !res.data || !res.data.length) return null;
          return res.data[0].value;
        });
    },

    /* ─── ลบ KPI เดียวออกจากผลงาน ─── */
    deleteResult: function (kpiId) {
      return Promise.all([
        db.from('kpi_results').delete().eq('kpi_id', kpiId),
        db.from('kpi_unit_perf').delete().eq('kpi_id', kpiId)
      ]).then(function(res) {
        res.forEach(function(r) { if (r && r.error) throw r.error; });
      });
    },

    /* ─── ล้างผลงานทั้งหมด (รีเซตระบบ) ─── */
    clearAll: function () {
      return Promise.all([
        db.from('kpi_results').delete().neq('kpi_id', '__none__'),
        db.from('kpi_unit_perf').delete().neq('kpi_id', '__none__'),
        db.from('upload_sessions').delete().not('id', 'is', null)
      ]).then(function(res) {
        res.forEach(function(r) { if (r && r.error) throw r.error; });
      });
    },

    /* ─── เก็บรายการ KPI ที่เพิ่ม/ลบเอง (cross-device) ─── */
    saveCustomKpi: function (custom) {
      return db.from('app_settings').upsert(
        { key: 'kpi_custom', value: custom, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      ).then(function(res) { if (res.error) throw res.error; });
    },

    loadCustomKpi: function () {
      return db.from('app_settings').select('value').eq('key', 'kpi_custom').limit(1)
        .then(function(res) {
          if (res.error || !res.data || !res.data.length) return null;
          return res.data[0].value;
        });
    },

    /* ─── เก็บการแก้ไขชื่อ/เป้า/หน่วย/หมวดของ KPI (cross-device) ─── */
    saveKPIEdits: function (edits) {
      return db.from('app_settings').upsert(
        { key: 'kpi_edits', value: edits, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      ).then(function(res) { if (res.error) throw res.error; });
    },
    loadKPIEdits: function () {
      return db.from('app_settings').select('value').eq('key', 'kpi_edits').limit(1)
        .then(function(res) {
          if (res.error || !res.data || !res.data.length) return null;
          return res.data[0].value;
        });
    }
  };

  console.info('[KPI Hunter] Supabase connected:', cfg.supabaseUrl);
})();
