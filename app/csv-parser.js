/* KPI HUNTER — HDC CSV Parser */
window.KPIHUNTER_CSV = window.KPIHUNTER_CSV || {};

(function(ns) {

  /* ── Parse CSV text to rows/headers ── */
  ns.parseCSV = function(csvText, delimiter) {
    delimiter = delimiter || ',';
    var lines = csvText.split(/\r\n|\n/);
    var headers = [];
    var rows = [];
    var errors = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;

      var cells = [];
      var current = '';
      var inQuotes = false;

      for (var j = 0; j < line.length; j++) {
        var c = line[j];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === delimiter && !inQuotes) {
          cells.push(current.trim().replace(/^"(.*)"$/, '$1'));
          current = '';
        } else {
          current += c;
        }
      }
      cells.push(current.trim().replace(/^"(.*)"$/, '$1'));

      if (i === 0) {
        headers = cells;
      } else {
        var row = {};
        headers.forEach(function(h, idx) {
          row[h] = cells[idx] || '';
        });
        rows.push(row);
      }
    }

    return { headers: headers, rows: rows, errors: errors };
  };

  /* ── Validate HDC CSV structure ── */
  ns.validateHDCFormat = function(headers, rows) {
    var required = ['a_name', 'target', 'result'];
    var optional = ['targetq1', 'resultq1', 'targetq2', 'resultq2', 'targetq3', 'resultq3', 'targetq4', 'resultq4', 'F3', 'F6', 'F9', 'F12'];
    var errors = [];
    var warnings = [];

    required.forEach(function(col) {
      if (headers.indexOf(col) < 0) {
        errors.push('หาไม่เจอคอลัมน์: ' + col);
      }
    });

    var hasQuarterly = false;
    optional.forEach(function(col) {
      if (headers.indexOf(col) >= 0) hasQuarterly = true;
    });
    if (!hasQuarterly) {
      warnings.push('ไม่พบข้อมูลรายไตรมาส (targetq1, resultq1 เป็นต้น)');
    }

    if (rows.length === 0) {
      errors.push('ไม่มีข้อมูลในไฟล์');
    }

    return { valid: errors.length === 0, errors: errors, warnings: warnings };
  };

  /* ── Extract unit data from one CSV row ── */
  ns.extractUnitRow = function(row, headers) {
    var aName = row['a_name'] || '';
    var parts = aName.split(':');
    var unitCode = parts[0] ? parts[0].trim() : '';
    var unitName = parts[1] ? parts[1].trim() : aName;

    var extractVal = function(colName) {
      var val = row[colName];
      if (val === undefined || val === null || val === 'null' || val === '') return null;
      var num = parseFloat(val);
      return isNaN(num) ? null : num;
    };

    /* คำนวณ % จาก raw count หรือดึงจาก F3 */
    var rawTarget = extractVal('target');
    var rawResult = extractVal('result');
    var f3Pct     = extractVal('F3');

    /* ใช้ F3 เป็น % ถ้ามี ไม่งั้นคำนวณเอง */
    var pct = null;
    if (f3Pct !== null) {
      pct = f3Pct;
    } else if (rawTarget !== null && rawResult !== null && rawTarget > 0) {
      pct = Math.round((rawResult / rawTarget) * 10000) / 100;
    } else if (rawResult !== null && rawTarget === 0) {
      pct = 0;
    }

    var overall = {
      unitCode:  unitCode,
      unitName:  unitName,
      target:    rawTarget,   /* raw count (denominator) */
      result:    rawResult,   /* raw count (numerator) */
      pct:       pct,         /* ร้อยละ — ใช้แสดงผล */
      F:         row['F3'] || ''
    };

    var q1 = {
      target: extractVal('targetq1'),
      result: extractVal('resultq1'),
      pct:    extractVal('F3'),
      F:      row['F3'] || ''
    };
    var q2 = {
      target: extractVal('targetq2'),
      result: extractVal('resultq2'),
      pct:    extractVal('F6'),
      F:      row['F6'] || ''
    };
    var q3 = {
      target: extractVal('targetq3'),
      result: extractVal('resultq3'),
      pct:    extractVal('F9'),
      F:      row['F9'] || ''
    };
    var q4 = {
      target: extractVal('targetq4'),
      result: extractVal('resultq4'),
      pct:    extractVal('F12'),
      F:      row['F12'] || ''
    };

    return { unitCode, unitName, overall, q1, q2, q3, q4 };
  };

  /* ── Map CSV units to app units (จับคู่ด้วยรหัส 5 หลักเท่านั้น) ──
   *  กรณีพิเศษ: 77569 (บ้านห้วยน้ำขาว) → รวมเข้า 07853 (เข็กน้อย)
   * ──────────────────────────────────────────────────────────────── */
  var MERGE_MAP = { '77569': '07853' }; /* รหัสที่ต้องรวม → รหัสเป้าหมาย */

  ns.createUnitMapping = function(csvUnits, appUnits) {
    var matched   = [];
    var unmatched = [];
    var mergePool = {}; /* code → csvUnit (รอรวม) */

    /* รอบแรก: จับคู่ด้วยรหัส */
    csvUnits.forEach(function(csvUnit) {
      var code = csvUnit.unitCode;

      /* ถ้าเป็นรหัสที่ต้องรวม → เก็บไว้ก่อน */
      if (MERGE_MAP[code]) {
        mergePool[code] = csvUnit;
        return;
      }

      /* จับคู่ด้วยรหัส 5 หลัก */
      var appUnit = appUnits.find(function(u) { return u.code === code; });
      if (appUnit) {
        matched.push({ csvUnit: csvUnit, appUnit: appUnit });
      } else {
        unmatched.push({ csvUnit: csvUnit, reason: 'ไม่พบรหัส ' + code });
      }
    });

    /* รอบสอง: รวม mergePool เข้าหน่วยเป้าหมาย */
    Object.keys(mergePool).forEach(function(srcCode) {
      var srcUnit  = mergePool[srcCode];
      var tgtCode  = MERGE_MAP[srcCode];
      var tgtMatch = matched.find(function(m) { return m.appUnit.code === tgtCode; });

      if (tgtMatch) {
        /* รวม raw count */
        var src = srcUnit.overall;
        var tgt = tgtMatch.csvUnit.overall;
        var newRawTarget = (tgt.target || 0) + (src.target || 0);
        var newRawResult = (tgt.result || 0) + (src.result || 0);
        var newPct = newRawTarget > 0
          ? Math.round((newRawResult / newRawTarget) * 10000) / 100
          : 0;

        /* อัปเดต overall ของเป้าหมาย */
        tgt.target = newRawTarget;
        tgt.result = newRawResult;
        tgt.pct    = newPct;
        tgt.F      = String(newPct);
        tgtMatch.csvUnit.mergedFrom = srcCode;
      } else {
        /* ไม่พบเป้าหมาย → ขึ้น unmatched */
        unmatched.push({ csvUnit: srcUnit, reason: 'ไม่พบหน่วยเป้าหมาย ' + tgtCode });
      }
    });

    return { matched, unmatched };
  };

  /* ── Convert CSV data to unit quarterly mapping ── */
  ns.csvToUnitQuarterlyMapping = function(mappedUnits) {
    var unitMapping = {};

    mappedUnits.forEach(function(m) {
      var unitId = m.appUnit.id;
      unitMapping[unitId] = {
        unitId: unitId,
        unitCode: m.csvUnit.unitCode,
        unitName: m.csvUnit.unitName,
        appUnitName: m.appUnit.name,
        q1: m.csvUnit.q1,
        q2: m.csvUnit.q2,
        q3: m.csvUnit.q3,
        q4: m.csvUnit.q4,
        overall: m.csvUnit.overall
      };
    });

    return unitMapping;
  };

})(window.KPIHUNTER_CSV);
