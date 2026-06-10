/* KPI HUNTER — Mock Data (based on real เขาค้อ FY2569 Excel) */
window.KPIHUNTER = window.KPIHUNTER || {};

(function(ns) {
  ns.meta = {
    year: 2569, district: 'เขาค้อ', province: 'เพชรบูรณ์',
    month: 'มีนาคม', monthNum: 6, // เดือนที่ 6 ของปีงบประมาณ
    uploadDate: '2569-03-15', fileName: 'ประเมินผล_KPI_2569_เขาค้อ.xlsx'
  };

  /* ─── Settings persistence ─── */
  var LS_SETTINGS = 'kpihunter_settings_v1';
  (function() {
    try {
      var s = localStorage.getItem(LS_SETTINGS);
      if (s) {
        var saved = JSON.parse(s);
        if (saved.year)     ns.meta.year     = saved.year;
        if (saved.month)    ns.meta.month    = saved.month;
        if (saved.district) ns.meta.district = saved.district;
        if (saved.province) ns.meta.province = saved.province;
      }
    } catch(e) {}
  })();

  ns.saveSettings = function(settings) {
    if (settings.year)     ns.meta.year     = parseInt(settings.year) || ns.meta.year;
    if (settings.month)    ns.meta.month    = settings.month;
    if (settings.district) ns.meta.district = settings.district;
    if (settings.province) ns.meta.province = settings.province;
    try { localStorage.setItem(LS_SETTINGS, JSON.stringify(ns.meta)); } catch(e) {}
    /* sync settings ขึ้น Supabase */
    if (window.KPIHUNTER_DB) {
      window.KPIHUNTER_DB.saveAppSettings(ns.meta).catch(function(e){ console.warn('[Supabase] saveAppSettings:', e); });
    }
    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
  };

  /* ─── KPI name/detail overrides ─── */
  var LS_KPI_EDITS = 'kpihunter_kpi_edits_v1';
  (function() {
    try {
      var s = localStorage.getItem(LS_KPI_EDITS);
      if (s) {
        var edits = JSON.parse(s);
        ns.kpis && ns.kpis.forEach(function(k) {
          if (edits[k.id]) Object.assign(k, edits[k.id]);
        });
      }
    } catch(e) {}
  })();

  ns.saveKPIEdits = function(edits) {
    // edits = { kpiId: { name, target, targetNum, category, type }, ... }
    try {
      var existing = {};
      try { var s = localStorage.getItem(LS_KPI_EDITS); if(s) existing = JSON.parse(s); } catch(e) {}
      Object.assign(existing, edits);
      localStorage.setItem(LS_KPI_EDITS, JSON.stringify(existing));
      // Apply to live data
      Object.keys(edits).forEach(function(kpiId) {
        var k = ns.kpis && ns.kpis.find(function(x){ return x.id === kpiId; });
        if (k) Object.assign(k, edits[kpiId]);
      });
    } catch(e) {}
    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
  };

  ns.units = [
    { id:'U08', name:'รพ.เขาค้อ',         code:'11272', short:'รพ.เขาค้อ' },
    { id:'U04', name:'รพ.สต.เข็กน้อย',    code:'07853', short:'เข็กน้อย' },
    { id:'U09', name:'รพ.สต.เหล่าหญ้า',   code:'07847', short:'เหล่าหญ้า' },
    { id:'U05', name:'รพ.สต.นายาว',       code:'07846', short:'นายาว' },
    { id:'U03', name:'รพ.สต.ปานสุขุม',    code:'07845', short:'ปานสุขุม' },
    { id:'U06', name:'รพ.สต.ป่าแดง',      code:'07844', short:'ป่าแดง' },
    { id:'U02', name:'รพ.สต.หนองแม่นา',   code:'07852', short:'หนองแม่นา' },
    { id:'U01', name:'รพ.สต.เสลียงแห้ง',  code:'07851', short:'เสลียงแห้ง' },
    { id:'U11', name:'รพ.สต.รื่นฤดี',     code:'07850', short:'รื่นฤดี' },
    { id:'U07', name:'รพ.สต.พัฒนวรพงษ์',  code:'07849', short:'พัฒนวรพงษ์' },
    { id:'U10', name:'รพ.สต.ป่าคา',       code:'07848', short:'ป่าคา' },
  ];

  // Categories
  var CAT = {
    PPP: 'ส่งเสริมสุขภาพ ป้องกันโรค (PP&P)',
    SE: 'บริการเป็นเลิศ (Service)',
    PE: 'บุคลากรเป็นเลิศ (People)',
    GE: 'บริหารเป็นเลิศ (Governance)',
    AREA: 'ตัวชี้วัดเขตสุขภาพ/จังหวัด'
  };

  // Type classification helper
  function classifyType(name) {
    var ssoKeys = ['พัฒนาการสมวัย','ฟันดีไม่มีผุ','ตรวจฟัน','พัฒนาการล่าช้า','จัดการสุขภาพ','ความรอบรู้','ยืนยันวินิจฉัย','คัดกรองผู้ป่วยโรคเบาหวาน','คัดกรองผู้ป่วยโรคความดัน','MMR','ปฐมภูมิ','แผนไทย','คัดกรองวัณโรค','ADL','คัดกรองมะเร็งลำไส้','คัดกรองมะเร็งปากมดลูก','คัดกรองมะเร็งเต้านม','ฝากครรภ์','ฟลูออไรด์','พระภิกษุสงฆ์','ภาวะซีด','Mental Health','คัดกรองสุขภาพจิต','ป่วยไข้เลือดออก','คัดกรองไวรัสตับ','NCD Clinic','รพ.สต. ทุกแห่ง','ธาตุเหล็ก'];
    var rphKeys = ['GREEN & CLEAN','หลอดเลือดสมอง','ขึ้นทะเบียน','สำเร็จการรักษา','ตายทารก','คัดกรองการได้ยิน','Family Meeting','มะเร็งระยะประคับประคอง','จิตเวชยาเสพติด','ผู้บริจาคอวัยวะ','Donor Card','Retention','วิกฤต','พระบรมราชานุเคราะห์','โรงพยาบาลชุมชน','HbA1c','LDL','Total Performance','Smart Hospital','sonographer','ฟันเทียม','Colposcopy','Colonoscopy','Psychicorner','TeleMed','ภาวะวิกฤตทางการเงิน','RDU','หญิงตั้งครรภ์ที่ใช้สารเสพติด','หญิงมาคลอด','ออกกลางคัน','3Refer','SumAdjRW'];
    var bothKeys = ['อุบัติเหตุทางถนน','มูลค่าการใช้ยาสมุนไพร','ฆ่าตัวตาย','ดูแลต่อเนื่องที่บ้าน','ไซเบอร์','องค์กรแห่งความสุข','ผลงานวิชาการ','MOPH Refer','D-RTI','Refer back'];
    for(var i=0;i<ssoKeys.length;i++) if(name.indexOf(ssoKeys[i])>=0) return 'sso';
    for(var i=0;i<bothKeys.length;i++) if(name.indexOf(bothKeys[i])>=0) return 'both';
    for(var i=0;i<rphKeys.length;i++) if(name.indexOf(rphKeys[i])>=0) return 'rph';
    return 'rph'; // default
  }

  // Parse target to numeric
  function parseTarget(t) {
    if(!t) return null;
    var m = t.match(/(\d+\.?\d*)/);
    return m ? parseFloat(m[1]) : null;
  }

  // Risk level
  function riskLevel(result, targetNum, passfail) {
    if(!passfail || passfail === '') return 'none';
    if(passfail === 'ผ่าน') {
      if(targetNum && result < targetNum * 1.1) return 'low'; // barely passing
      return 'pass';
    }
    if(targetNum && targetNum > 0) {
      var ratio = result / targetNum;
      if(ratio < 0.5) return 'critical';
      if(ratio < 0.8) return 'high';
      return 'medium';
    }
    return 'high';
  }

  // Raw KPI data from Excel (เขาค้อ FY2569)
  var raw = [
    ['1','อัตราส่วนการตายมารดาไทยต่อการเกิดมีชีพแสนคน','ไม่เกิน 15 ต่อแสน','ส่งเสริมสุขภาพ',0,'ผ่าน',CAT.PPP],
    ['2.1','ร้อยละของเด็ก 0-5 ปี มีพัฒนาการสมวัย','ร้อยละ 88','ส่งเสริมสุขภาพ',75,'ผ่าน',CAT.PPP],
    ['2.2','ร้อยละของเด็ก 0-5 ปี ฟันดีไม่มีผุ (Cavity Free)','ร้อยละ 80','ทันตสาธารณสุข',69.8,'ไม่ผ่าน',CAT.PPP],
    ['2.3','ร้อยละของเด็ก 0-5 ปี ได้รับการตรวจฟัน','> ร้อยละ 50','ทันตสาธารณสุข',54.8,'ผ่าน',CAT.PPP],
    ['3','เด็กปฐมวัยพัฒนาการล่าช้าเข้าถึงบริการ','ร้อยละ 30','ควบคุมโรคไม่ติดต่อฯ',9.24,'ไม่ผ่าน',CAT.PPP],
    ['4','ชุมชนมีการจัดการสุขภาพที่เหมาะสม','ร้อยละ 90','ปฐมภูมิ',100,'ผ่าน',CAT.PPP],
    ['5','ความรอบรู้ด้านสุขภาพ อายุ 15 ปีขึ้นไป','ร้อยละ 83','ส่งเสริมสุขภาพ',92.49,'ผ่าน',CAT.PPP],
    ['6.1','ยืนยันวินิจฉัยกลุ่มสงสัยป่วยโรคเบาหวาน','≥ ร้อยละ 70','ควบคุมโรคไม่ติดต่อฯ',94.29,'ผ่าน',CAT.PPP],
    ['6.2','คัดกรองผู้ป่วยโรคเบาหวาน','≥ ร้อยละ 90','ควบคุมโรคไม่ติดต่อฯ',93.64,'ผ่าน',CAT.PPP],
    ['6.3','ยืนยันวินิจฉัยกลุ่มสงสัยป่วยโรคความดันโลหิตสูง','≥ ร้อยละ 80','ควบคุมโรคไม่ติดต่อฯ',98,'ผ่าน',CAT.PPP],
    ['6.4','คัดกรองผู้ป่วยโรคความดันโลหิตสูง','≥ ร้อยละ 90','ควบคุมโรคไม่ติดต่อฯ',92.95,'ผ่าน',CAT.PPP],
    ['7','อุบัติเหตุทางถนนเด็กและเยาวชน ลดลง','ร้อยละ 3','ควบคุมโรคไม่ติดต่อฯ',25,'ผ่าน',CAT.PPP],
    ['8','วัคซีน MMR2 เด็กต่ำกว่า 3 ปี','≥ ร้อยละ 95','ควบคุมโรคติดต่อ',76.57,'ผ่าน',CAT.PPP],
    ['9.1','GREEN & CLEAN Hospital (มาตรฐาน)','ระดับพื้นฐาน','อนามัยสิ่งแวดล้อมฯ',5,'ผ่าน',CAT.PPP],
    ['9.2','GREEN & CLEAN Hospital (ท้าทาย)','ระดับท้าทาย','อนามัยสิ่งแวดล้อมฯ',4,'ไม่ผ่าน',CAT.PPP],
    ['10','หน่วยบริการปฐมภูมิผ่านเกณฑ์คุณภาพ พ.ร.บ.ปฐมภูมิ','ร้อยละ 100','ปฐมภูมิฯ',81.82,'ไม่ผ่าน',CAT.SE],
    ['11','อัตราตายผู้ป่วยหลอดเลือดสมอง (Stroke)','< ร้อยละ 7','ควบคุมโรคไม่ติดต่อฯ',3.7,'',CAT.SE],
    ['12.1','คัดกรองวัณโรคกลุ่มเสี่ยงรายใหม่','ร้อยละ 90','ควบคุมโรคติดต่อ',89.39,'ผ่าน',CAT.SE],
    ['12.2','ความครอบคลุมขึ้นทะเบียนผู้ป่วยวัณโรค','ร้อยละ 85','ควบคุมโรคติดต่อ',18.03,'ไม่ผ่าน',CAT.SE],
    ['12.3','ความสำเร็จการรักษาผู้ป่วยวัณโรค','ร้อยละ 88','ควบคุมโรคติดต่อ',0,'ไม่ผ่าน',CAT.SE],
    ['13','อัตราตายทารกแรกเกิด ≤ 28 วัน','< 3.60 ต่อพัน','ส่งเสริมสุขภาพ',0,'ผ่าน',CAT.SE],
    ['14','ความครอบคลุมคัดกรองการได้ยินทารก','≥ ร้อยละ 95','ส่งเสริมสุขภาพ',85,'ไม่ผ่าน',CAT.SE],
    ['15.1','Palliative Care เข้าถึงบริการ','ร้อยละ 50','พัฒนาคุณภาพฯ',86.96,'ผ่าน',CAT.SE],
    ['15.2','Palliative Care ดูแลต่อเนื่องที่บ้าน','ร้อยละ 55','พัฒนาคุณภาพฯ',48.28,'ไม่ผ่าน',CAT.SE],
    ['15.3','Palliative Care Family Meeting','ร้อยละ 10','พัฒนาคุณภาพฯ',69.57,'ผ่าน',CAT.SE],
    ['15.4','มะเร็งระยะประคับประคอง Palliative Care','ร้อยละ 55','พัฒนาคุณภาพฯ',57.69,'ไม่ผ่าน',CAT.SE],
    ['16','แพทย์แผนไทยระดับปฐมภูมิ','ร้อยละ 25','แพทย์แผนไทยฯ',43.48,'ผ่าน',CAT.SE],
    ['17','มูลค่าการใช้ยาสมุนไพร UC','ร้อยละ 100','แพทย์แผนไทยฯ',39.01,'ไม่ผ่าน',CAT.SE],
    ['18.1','อัตราการฆ่าตัวตายสำเร็จ','≤ 7.8 ต่อแสน','ควบคุมโรคไม่ติดต่อฯ',2.44,'ผ่าน',CAT.SE],
    ['18.2','ผู้พยายามฆ่าตัวตายเข้าถึงบริการ','ร้อยละ 75','ควบคุมโรคไม่ติดต่อฯ',100,'ผ่าน',CAT.SE],
    ['19.1','จิตเวชยาเสพติดก่อความรุนแรง SMI-V','ร้อยละ 40','ควบคุมโรคไม่ติดต่อฯ',5.07,'ไม่ผ่าน',CAT.SE],
    ['20','ผู้ป่วยมะเร็งได้รับการรักษาภายใน 4 สัปดาห์','ร้อยละ 80','พัฒนาคุณภาพฯ',100,'ผ่าน',CAT.SE],
    ['23.2','Donor Card เพิ่มจำนวน','ร้อยละ 10','พัฒนาคุณภาพฯ',0,'ไม่ผ่าน',CAT.SE],
    ['25','ผู้ป่วยยาเสพติดบำบัดรักษา Retention','ร้อยละ 70','ควบคุมโรคไม่ติดต่อฯ',89.16,'ผ่าน',CAT.SE],
    ['26','ผู้ป่วยวิกฤตเข้าถึงบริการแพทย์ฉุกเฉิน','≥ ร้อยละ 29','พัฒนาคุณภาพฯ',47.46,'ผ่าน',CAT.SE],
    ['28','ผ่านเกณฑ์ความมั่นคงปลอดภัยไซเบอร์','ร้อยละ 100','สุขภาพดิจิทัล',70.59,'ไม่ผ่าน',CAT.GE],
    ['29.1','โรงพยาบาลชุมชนผ่าน HA','ร้อยละ 100','พัฒนาคุณภาพฯ',100,'ผ่าน',CAT.GE],
    ['30.1','HbA1c ผ่านเกณฑ์','ร้อยละ 100','พัฒนาคุณภาพฯ',89.47,'ผ่าน',CAT.GE],
    ['30.2','LDL ผ่านเกณฑ์','ร้อยละ 100','พัฒนาคุณภาพฯ',100,'ผ่าน',CAT.GE],
    ['33','Total Performance Score','ร้อยละ 80','พัฒนาคุณภาพฯ',93.33,'ผ่าน',CAT.GE],
    // ตัวชี้วัดเขตสุขภาพ/จังหวัด (Area-based)
    ['A-1','คัดกรองสุขภาพจิต กลุ่มอายุ < 20 ปี','≥ ร้อยละ 30','ควบคุมโรคไม่ติดต่อฯ',0.85,'ไม่ผ่าน',CAT.AREA],
    ['A-2','การฆ่าตัวตายสำเร็จกลุ่มอายุ < 20 ปี','0','ควบคุมโรคไม่ติดต่อฯ',0,'ผ่าน',CAT.AREA],
    ['A-3','ผู้มีความเสี่ยงฆ่าตัวตายเข้าถึงบริการ','ร้อยละ 75','ควบคุมโรคไม่ติดต่อฯ',100,'ผ่าน',CAT.AREA],
    ['A-4.1','คัดกรองมะเร็งลำไส้ใหญ่ (FOBT)','≥ ร้อยละ 35','ควบคุมโรคไม่ติดต่อฯ',52.15,'ผ่าน',CAT.AREA],
    ['A-4.2','ส่องกล้อง Colonoscopy (ผิดปกติ)','≥ ร้อยละ 55','ควบคุมโรคไม่ติดต่อฯ',0,'ไม่ผ่าน',CAT.AREA],
    ['A-5.1','คัดกรองมะเร็งปากมดลูก','≥ ร้อยละ 35','ควบคุมโรคไม่ติดต่อฯ',20.06,'ไม่ผ่าน',CAT.AREA],
    ['A-5.2','ส่องกล้อง Colposcopy (ผิดปกติ)','≥ ร้อยละ 50','ควบคุมโรคไม่ติดต่อฯ',0,'ไม่ผ่าน',CAT.AREA],
    ['A-6','คัดกรองมะเร็งเต้านม','≥ ร้อยละ 80','ส่งเสริมสุขภาพ',90.03,'ผ่าน',CAT.AREA],
    ['A-7','ฝากครรภ์คุณภาพ 5 ครั้ง','ร้อยละ 75','ส่งเสริมสุขภาพ',71.18,'ไม่ผ่าน',CAT.AREA],
    ['A-8','ป่วยไข้เลือดออกลดลง','ลดลง ร้อยละ 15','ควบคุมโรคติดต่อ',100,'ผ่าน',CAT.AREA],
    ['A-9','ADL ผู้สูงอายุ','ร้อยละ 95','ส่งเสริมสุขภาพ',97.55,'ผ่าน',CAT.AREA],
    ['A-10','RDU จังหวัดใช้ยาอย่างสมเหตุผล','4 แห่ง','พัฒนาคุณภาพฯ',4,'ผ่าน',CAT.AREA],
    ['A-11.1','องค์กรแห่งความสุขที่มีคุณภาพ','ร้อยละ 80','ทรัพยากรบุคคล',71.6,'ไม่ผ่าน',CAT.AREA],
    ['A-11.2','หน่วยงานมีผลงานวิชาการ','ร้อยละ 70','ทรัพยากรบุคคล',44.44,'ไม่ผ่าน',CAT.AREA],
    ['A-12','พระภิกษุสงฆ์ คัดกรอง NCD','≥ ร้อยละ 100','ส่งเสริมสุขภาพ',26.09,'ไม่ผ่าน',CAT.AREA],
    ['A-13','เด็กอายุ 9 เดือน คัดกรองภาวะซีด','≥ ร้อยละ 100','ส่งเสริมสุขภาพ',34.33,'ไม่ผ่าน',CAT.AREA],
    ['A-14','เด็กอายุ 4 ปี คัดกรองภาวะซีด','≥ ร้อยละ 100','ส่งเสริมสุขภาพ',19.42,'ไม่ผ่าน',CAT.AREA],
    ['A-15.1','คัดกรองไวรัสตับอักเสบบี','ร้อยละ 90','ควบคุมโรคติดต่อ',55.25,'ไม่ผ่าน',CAT.AREA],
    ['A-15.2','คัดกรองไวรัสตับอักเสบซี','ร้อยละ 90','ควบคุมโรคติดต่อ',10.33,'ไม่ผ่าน',CAT.AREA],
    ['A-16','TeleMed ภาพรวม','ร้อยละ 5','สุขภาพดิจิทัล',0.26,'ไม่ผ่าน',CAT.AREA],
    ['A-17','รพ.สต. ทุกแห่งให้บริการ Telemedicine','ร้อยละ 10','สุขภาพดิจิทัล',0.14,'ไม่ผ่าน',CAT.AREA],
    ['A-18','Smart Hospital ระดับทอง','100%','สุขภาพดิจิทัล',0,'ไม่ผ่าน',CAT.AREA],
    ['A-19','D-RTI ความปลอดภัยทางถนน','≥ 35 คะแนน','ควบคุมโรคไม่ติดต่อฯ',26,'ไม่ผ่าน',CAT.AREA],
    ['A-20','NCD Clinic Plus ใน รพ.สต.','ร้อยละ 100','ควบคุมโรคไม่ติดต่อฯ',90,'ผ่าน',CAT.AREA],
  ];

  /* ─── localStorage helpers ─── */
  var LS_RESULTS   = 'kpihunter_results_v1';
  var LS_META      = 'kpihunter_upload_meta';
  var LS_UNIT_PERF = 'kpihunter_unit_perf_v1';

  ns.saveResults = function() {
    try {
      var out = {};
      ns.kpis.forEach(function(k) { out[k.id] = { result: k.result, passfail: k.passfail }; });
      localStorage.setItem(LS_RESULTS, JSON.stringify(out));
    } catch(e) {}
    /* ── บันทึก unitPerformance ── */
    try {
      localStorage.setItem(LS_UNIT_PERF, JSON.stringify(ns.unitPerformance));
    } catch(e) {}
    /* ── sync unitPerformance ขึ้น Supabase ── */
    if (window.KPIHUNTER_DB && Object.keys(ns.unitPerformance).length > 0) {
      window.KPIHUNTER_DB.saveUnitPerf(ns.unitPerformance).catch(function(e){ console.warn('[Supabase] saveUnitPerf:', e); });
    }
  };

  ns.loadSavedResults = function() {
    try {
      var raw2 = localStorage.getItem(LS_RESULTS);
      if (!raw2) return;
      var saved = JSON.parse(raw2);
      ns.kpis.forEach(function(k) {
        if (saved[k.id] !== undefined) {
          k.result   = saved[k.id].result;
          k.passfail = saved[k.id].passfail;
          k.risk     = riskLevel(k.result, k.targetNum, k.passfail);
          if (ns.trends[k.id]) ns.trends[k.id][5] = k.result;
        }
      });
    } catch(e) {}
    /* ── โหลด unitPerformance กลับมา ── */
    try {
      var up = localStorage.getItem(LS_UNIT_PERF);
      if (up) {
        var parsed = JSON.parse(up);
        Object.keys(parsed).forEach(function(kpiId) {
          ns.unitPerformance[kpiId] = parsed[kpiId];
        });
      }
    } catch(e) {}
  };

  ns.updateKPI = function(kpiId, result, passfail) {
    var k = ns.kpis.find(function(x) { return x.id === kpiId; });
    if (!k) return;
    k.result   = result === '' || result === null ? 0 : parseFloat(result);
    k.passfail = passfail;
    k.risk     = riskLevel(k.result, k.targetNum, k.passfail);
    if (ns.trends[k.id]) ns.trends[k.id][5] = k.result;
    /* localStorage (เร็ว, offline) */
    ns.saveResults();
    /* Supabase (background) */
    if (window.KPIHUNTER_DB) {
      window.KPIHUNTER_DB.saveResult(kpiId, k.result, k.passfail)
        .catch(function(e) { console.warn('Supabase saveResult error:', e); });
    }
    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
  };

  /* แก้หลายรายการพร้อมกัน (จาก upload) */
  ns.applyBulkResults = function(rows, meta) {
    rows.forEach(function(r) {
      var k = ns.kpis.find(function(x) { return String(x.num).trim() === String(r.num).trim(); });
      if (!k) return;
      if (r.result !== '' && r.result !== null && r.result !== undefined)
        k.result = parseFloat(r.result) || 0;
      if (r.passfail) k.passfail = r.passfail;
      k.risk = riskLevel(k.result, k.targetNum, k.passfail);
      if (ns.trends[k.id]) ns.trends[k.id][5] = k.result;
    });
    /* localStorage */
    ns.saveResults();
    if (meta) { try { localStorage.setItem(LS_META, JSON.stringify(meta)); } catch(e) {} }
    /* Supabase (background) */
    if (window.KPIHUNTER_DB) {
      window.KPIHUNTER_DB.saveAllResults(ns.kpis)
        .catch(function(e) { console.warn('Supabase saveAllResults error:', e); });
      if (meta) {
        window.KPIHUNTER_DB.saveUploadSession(meta)
          .catch(function(e) { console.warn('Supabase saveUploadSession error:', e); });
      }
    }
    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
  };

  ns.getUploadMeta = function() {
    try { var m = localStorage.getItem(LS_META); return m ? JSON.parse(m) : null; } catch(e) { return null; }
  };

  /* ─── Auto-sync จาก Supabase (เรียกตอน startup) ─── */
  ns.syncFromSupabase = function(onDone) {
    if (!window.KPIHUNTER_DB) {
      if (onDone) onDone({ source: 'local' });
      return;
    }
    var db = window.KPIHUNTER_DB;
    Promise.all([
      db.loadResults().catch(function(){ return []; }),
      db.loadUnitPerf().catch(function(){ return {}; }),
      db.loadAppSettings().catch(function(){ return null; })
    ]).then(function(res) {
      var results   = res[0];
      var unitPerf  = res[1];
      var settings  = res[2];

      /* ── Apply settings ── */
      if (settings) {
        if (settings.year)     ns.meta.year     = settings.year;
        if (settings.month)    ns.meta.month    = settings.month;
        if (settings.district) ns.meta.district = settings.district;
        if (settings.province) ns.meta.province = settings.province;
        try { localStorage.setItem(LS_SETTINGS, JSON.stringify(ns.meta)); } catch(e) {}
      }

      /* ── Apply KPI results ── */
      if (results && results.length > 0) {
        var savedMap = {};
        results.forEach(function(r) { savedMap[r.kpi_id] = r; });
        ns.kpis.forEach(function(k) {
          if (savedMap[k.id]) {
            k.result   = savedMap[k.id].result;
            k.passfail = savedMap[k.id].passfail;
            k.risk     = riskLevel(k.result, k.targetNum, k.passfail);
            if (ns.trends[k.id]) ns.trends[k.id][5] = k.result;
          }
        });
        /* cache ลง localStorage */
        try {
          var out = {};
          ns.kpis.forEach(function(k) { out[k.id] = { result: k.result, passfail: k.passfail }; });
          localStorage.setItem(LS_RESULTS, JSON.stringify(out));
        } catch(e) {}
      }

      /* ── Apply unitPerformance ── */
      if (unitPerf && Object.keys(unitPerf).length > 0) {
        Object.keys(unitPerf).forEach(function(kpiId) {
          ns.unitPerformance[kpiId] = unitPerf[kpiId];
        });
        try { localStorage.setItem(LS_UNIT_PERF, JSON.stringify(ns.unitPerformance)); } catch(e) {}
      }

      window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
      if (onDone) onDone({ source: 'supabase', kpiCount: results.length });
    }).catch(function(err) {
      console.warn('[KPI Hunter] syncFromSupabase failed:', err);
      if (onDone) onDone({ source: 'local', error: err });
    });
  };

  ns.clearAllData = function() {
    localStorage.removeItem(LS_RESULTS);
    localStorage.removeItem(LS_META);
    localStorage.removeItem(LS_UNIT_PERF);
    localStorage.removeItem('kpihunter_csv_meta_v1');
    localStorage.removeItem('kpihunter_unit_quarterly_v1');
  };

  /* ─── CSV Data Storage & Loading ─── */
  ns.getCSVMeta = function() {
    try {
      var m = localStorage.getItem('kpihunter_csv_meta_v1');
      return m ? JSON.parse(m) : null;
    } catch(e) { return null; }
  };

  ns.getUnitQuarterlyData = function(unitId) {
    try {
      var all = localStorage.getItem('kpihunter_unit_quarterly_v1');
      var data = all ? JSON.parse(all) : {};
      return unitId ? (data[unitId] || null) : data;
    } catch(e) { return unitId ? null : {}; }
  };

  ns.saveUnitQuarterlyData = function(unitData, csvMeta) {
    try {
      localStorage.setItem('kpihunter_unit_quarterly_v1', JSON.stringify(unitData));
      if (csvMeta) {
        localStorage.setItem('kpihunter_csv_meta_v1', JSON.stringify(csvMeta));
      }
    } catch(e) {
      console.error('Failed to save quarterly data:', e);
    }
  };

  /* ─── CSV Helper: Match unit by code ─── */
  ns.matchUnitByCode = function(codeStr) {
    if (!codeStr) return null;
    var code = String(codeStr).trim();
    for (var i = 0; i < ns.units.length; i++) {
      if (ns.units[i].code === code) return ns.units[i];
    }
    return null;
  };

  /* ─── CSV Helper: Extract quarterly results from row ─── */
  ns.extractQuarterlyResults = function(row, headers) {
    var q = {};
    var findCol = function(name) {
      var idx = headers.indexOf(name);
      return idx >= 0 ? row[idx] : null;
    };
    q.q1 = { target: findCol('targetq1'), result: findCol('resultq1'), F: findCol('F3') };
    q.q2 = { target: findCol('targetq2'), result: findCol('resultq2'), F: findCol('F6') };
    q.q3 = { target: findCol('targetq3'), result: findCol('resultq3'), F: findCol('F9') };
    q.q4 = { target: findCol('targetq4'), result: findCol('resultq4'), F: findCol('F12') };
    return q;
  };

  /* ─── CSV: Store per-KPI unit data and rebuild unitPerformance ─── */
  ns.applyCSVUnitData = function(kpiId, unitMapping) {
    // unitMapping: { 'U06': { overall: {target,result,F}, q1..q4, ... }, ... }
    var kpi = ns.kpis.find(function(k) { return k.id === kpiId; });
    if (!kpi) return;

    var unitData = [];
    var totalTarget = 0, totalResult = 0, unitCount = 0;

    ns.units.forEach(function(u) {
      var uData = unitMapping[u.id];
      if (!uData) return;
      var overall = uData.overall || {};
      var target = overall.target != null ? parseFloat(overall.target) : null;
      var result = overall.result != null ? parseFloat(overall.result) : null;
      var F = overall.F || '';

      /* ใช้ pct ที่คำนวณแล้ว (รวม 77569 แล้ว) หรือคำนวณจาก raw count */
      var pct = null;
      if (overall.pct != null) {
        pct = parseFloat(overall.pct);
        if (target !== null && result !== null) {
          totalTarget += target;
          totalResult += result;
          unitCount++;
        }
      } else if (target !== null && result !== null) {
        pct = target > 0 ? Math.round((result / target) * 10000) / 100 : (result > 0 ? 100 : 0);
        totalTarget += target;
        totalResult += result;
        unitCount++;
      }

      var passed = pct !== null ? (kpi.targetNum ? pct >= kpi.targetNum : F === 'ผ่าน') : null;
      unitData.push({
        unitId: u.id,
        unitName: u.short,
        value: pct !== null ? Math.round(pct * 100) / 100 : 0,
        passed: passed,
        target: target,
        result: result
      });
    });

    ns.unitPerformance[kpiId] = unitData;

    // Calculate overall KPI result (aggregate)
    if (unitCount > 0 && totalTarget > 0) {
      var aggPct = Math.round((totalResult / totalTarget) * 10000) / 100;
      kpi.result = aggPct;
      kpi.passfail = kpi.targetNum ? (aggPct >= kpi.targetNum ? 'ผ่าน' : 'ไม่ผ่าน') : '';
      kpi.risk = riskLevel(kpi.result, kpi.targetNum, kpi.passfail);
      if (ns.trends[kpiId]) ns.trends[kpiId][5] = kpi.result;
    }
  };

  /* ─── CSV: Apply quarterly data and update KPI results ─── */
  ns.importCSVQuarterlyData = function(unitMapping, csvMeta) {
    // unitMapping = result from csvToUnitQuarterlyMapping per-unit
    // Store in kpiId → unitId map format
    ns.unitQuarterlyData = unitMapping;

    // Build per-unit performance from overall column
    // unitMapping: { 'U06': { unitCode, unitName, overall, q1..q4 }, ... }
    // For the current CSV context (one KPI at a time), we store per kpiId
    // The calling code must pass kpiId if it wants to update a specific KPI
    // Otherwise just store the unit quarterly data
    ns.saveUnitQuarterlyData(unitMapping, csvMeta || {});
    ns.saveResults();

    if (window.KPIHUNTER_DB) {
      window.KPIHUNTER_DB.saveAllResults(ns.kpis)
        .catch(function(e) { console.warn('Supabase sync error:', e); });
    }

    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
  };

  // Build KPI objects (no initial mock data - empty structure)
  ns.kpis = raw.map(function(r, idx) {
    var targetNum = parseTarget(r[2]);
    var type = classifyType(r[1]);
    return {
      id: 'K' + (idx+1),
      num: r[0],
      name: r[1],
      target: r[2],
      targetNum: targetNum,
      pm: r[3],
      result: 0,
      passfail: '',
      category: r[6],
      type: type,
      risk: 'none'
    };
  });

  // Unit-level data storage (from CSV imports)
  ns.unitQuarterlyData = {};
  ns.unitPerformance = {};

  // Monthly trends (6 months: ต.ค. - มี.ค.) - initialize empty
  ns.monthNames = ['ต.ค.','พ.ย.','ธ.ค.','ม.ค.','ก.พ.','มี.ค.'];
  ns.trends = {};
  ns.kpis.forEach(function(kpi) {
    ns.trends[kpi.id] = [0, 0, 0, 0, 0, 0];
  });

  // Apply saved data (must come after trends are built)
  ns.loadSavedResults();

  // Summary calculations
  ns.getSummary = function() {
    var all = ns.kpis.filter(function(k) { return k.passfail !== ''; });
    var passed = all.filter(function(k) { return k.passfail === 'ผ่าน'; });
    var failed = all.filter(function(k) { return k.passfail.indexOf('ไม่ผ่าน') >= 0; });
    var critical = ns.kpis.filter(function(k) { return k.risk === 'critical'; });
    var high = ns.kpis.filter(function(k) { return k.risk === 'high'; });
    var sso = ns.kpis.filter(function(k) { return k.type === 'sso'; });
    var rph = ns.kpis.filter(function(k) { return k.type === 'rph'; });
    var both = ns.kpis.filter(function(k) { return k.type === 'both'; });
    return {
      total: ns.kpis.length,
      evaluated: all.length,
      passed: passed.length,
      failed: failed.length,
      passRate: all.length > 0 ? (passed.length / all.length * 100).toFixed(1) : 0,
      critical: critical.length,
      highRisk: high.length,
      sso: sso.length,
      rph: rph.length,
      both: both.length,
      noData: ns.kpis.filter(function(k) { return k.result === null; }).length
    };
  };

  // Get unit rankings
  ns.getUnitRankings = function() {
    var rankings = [];
    ns.units.forEach(function(u) {
      var totalKPIs = 0, passedKPIs = 0, totalScore = 0;
      for (var kpiId in ns.unitPerformance) {
        var ud = ns.unitPerformance[kpiId].find(function(d) { return d.unitId === u.id; });
        if (ud) {
          totalKPIs++;
          totalScore += ud.value;
          if (ud.passed) passedKPIs++;
        }
      }
      var avg = totalKPIs > 0 ? totalScore / totalKPIs : 0;
      rankings.push({
        unit: u, totalKPIs: totalKPIs, passedKPIs: passedKPIs,
        failedKPIs: totalKPIs - passedKPIs,
        passRate: totalKPIs > 0 ? (passedKPIs / totalKPIs * 100).toFixed(1) : 0,
        avgScore: Math.round(avg * 100) / 100
      });
    });
    rankings.sort(function(a, b) { return b.avgScore - a.avgScore; });
    return rankings;
  };

  // PM department summary
  ns.getPMSummary = function() {
    var groups = {};
    ns.kpis.forEach(function(k) {
      if (!k.pm) return;
      if (!groups[k.pm]) groups[k.pm] = { name: k.pm, total: 0, passed: 0, failed: 0 };
      groups[k.pm].total++;
      if (k.passfail === 'ผ่าน') groups[k.pm].passed++;
      else if (k.passfail.indexOf('ไม่ผ่าน') >= 0) groups[k.pm].failed++;
    });
    return Object.keys(groups).map(function(k) { return groups[k]; })
      .sort(function(a, b) { return b.total - a.total; });
  };

})(window.KPIHUNTER);
