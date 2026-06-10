/* KPI HUNTER — Upload Page */

function UploadPage({ onComplete }) {
  const [dragOver,    setDragOver]    = useState(false);
  const [file,        setFile]        = useState(null);
  const [preview,     setPreview]     = useState(null);
  const [parsedRows,  setParsedRows]  = useState([]);
  const [quality,     setQuality]     = useState(null);
  const [step,        setStep]        = useState('upload'); // upload | kpi-select | preview | done
  const [loading,     setLoading]     = useState(false);
  const [parseError,  setParseError]  = useState('');
  const [doneStats,   setDoneStats]   = useState(null);
  const [selectedKPI, setSelectedKPI] = useState('');

  const D = window.KPIHUNTER;
  const meta = D.getUploadMeta();

  /* ── ตรวจหา column ที่ถูกต้องจาก header row ── */
  function detectCols(headers) {
    var numCol  = headers.find(h => /ลำดับ/.test(h));
    var nameCol = headers.find(h => /ตัวชี้วัด/.test(h));
    var tgtCol  = headers.find(h => /เป้าหมาย/.test(h));
    /* ผลงาน: ต้องการคอลัมน์ที่มี "เขาค้อ" หรือ "ผลงาน" แต่ไม่ใช่ "ประเมิน" */
    var resCol  = headers.find(h => (/เขาค้อ/.test(h) || /ผลงาน/.test(h)) && !/ประเมิน/.test(h));
    /* ประเมิน */
    var pfCol   = headers.find(h => /ประเมิน/.test(h) || /สถานะ/.test(h));
    return { numCol, nameCol, tgtCol, resCol, pfCol };
  }

  /* ── อ่านไฟล์ Excel หรือ CSV ── */
  function handleFile(f) {
    if (!f) return;
    const isCSV = /\.(csv|txt)$/i.test(f.name);
    const isExcel = /\.(xlsx|xls)$/i.test(f.name);

    if (!isCSV && !isExcel) {
      setParseError('รองรับไฟล์ .xlsx, .xls, .csv, และ .txt (HDC export)');
      return;
    }

    setFile(f);
    setParseError('');
    setLoading(true);

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        if (isCSV) {
          handleCSVFile(f, e.target.result);
        } else {
          handleExcelFile(f, e.target.result);
        }
      } catch(err) {
        setParseError('อ่านไฟล์ไม่สำเร็จ: ' + err.message);
        setStep('upload');
        setLoading(false);
      }
    };
    reader.onerror = function() {
      setParseError('ไม่สามารถเปิดไฟล์ได้');
      setLoading(false);
    };

    if (isCSV) {
      reader.readAsText(f);
    } else {
      reader.readAsArrayBuffer(f);
    }
  }

  /* ── Handle CSV file (HDC format) ── */
  function handleCSVFile(f, csvText) {
    const CSV = window.KPIHUNTER_CSV;
    const parsed = CSV.parseCSV(csvText, ',');
    const validation = CSV.validateHDCFormat(parsed.headers, parsed.rows);

    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Extract unit data
    var csvUnits = parsed.rows.map(row => CSV.extractUnitRow(row, parsed.headers));

    // Map to app units
    var mapping = CSV.createUnitMapping(csvUnits, D.units);

    // Store for confirmation
    setParsedRows({
      sourceType: 'csv',
      csvUnits: csvUnits,
      matched: mapping.matched,
      unmatched: mapping.unmatched
    });

    setPreview({
      fileName:    f.name,
      fileSize:    (f.size / 1024).toFixed(1) + ' KB',
      sourceType:  'csv',
      rows:        csvUnits.length,
      matched:     mapping.matched.length,
      unmatched:   mapping.unmatched.length,
      warnings:    validation.warnings
    });

    setQuality({
      completeness: mapping.matched.length > 0 ? ((mapping.matched.length / csvUnits.length) * 100).toFixed(1) : 0,
      empty:        0,
      anomalies:    0,
      score:        mapping.unmatched.length === 0 ? 'ดีมาก' : mapping.unmatched.length <= 2 ? 'ดี' : 'พอใช้'
    });

    setStep('kpi-select');
    setLoading(false);
  }

  /* ── Handle Excel file ── */
  function handleExcelFile(f, arrayBuffer) {
    const data     = new Uint8Array(arrayBuffer);
    const wb       = XLSX.read(data, { type: 'array' });
    const sheetName = wb.SheetNames.find(n => /ประเมิน|KPI/i.test(n)) || wb.SheetNames[0];
    const ws        = wb.Sheets[sheetName];
    const rows      = XLSX.utils.sheet_to_json(ws, { defval: '' });

    if (!rows.length) throw new Error('ไม่พบข้อมูลในชีท');

    const headers = Object.keys(rows[0]);
    const cols    = detectCols(headers);

    if (!cols.numCol) throw new Error('ไม่พบคอลัมน์ "ลำดับ" ในไฟล์');

    var parsed = [];
    var empty  = 0;
    var anomaly = 0;
    rows.forEach(function(row) {
      var num = String(row[cols.numCol] || '').trim();
      if (!num || num === 'ลำดับ') return;
      var result   = cols.resCol  ? String(row[cols.resCol]  || '').trim() : '';
      var passfail = cols.pfCol   ? String(row[cols.pfCol]   || '').trim() : '';
      var name     = cols.nameCol ? String(row[cols.nameCol] || '').trim() : '';
      var target   = cols.tgtCol  ? String(row[cols.tgtCol]  || '').trim() : '';
      if (result === '') empty++;
      var numVal = parseFloat(result);
      if (!isNaN(numVal) && (numVal < 0 || numVal > 100)) anomaly++;
      parsed.push({ num, name, target, result, passfail });
    });

    var withData = parsed.filter(function(r) { return r.result !== ''; });
    var passed   = parsed.filter(function(r) { return r.passfail === 'ผ่าน'; });
    var comp     = parsed.length > 0 ? ((withData.length / parsed.length) * 100).toFixed(1) : 0;

    setParsedRows(parsed);
    setPreview({
      fileName:   f.name,
      fileSize:   (f.size / 1024).toFixed(1) + ' KB',
      sourceType: 'excel',
      sheetName:  sheetName,
      sheets:     wb.SheetNames,
      rows:       parsed.length,
      columns:    headers.slice(0, 8),
      colResult:  cols.resCol  || '(ไม่พบ)',
      colPassfail:cols.pfCol   || '(ไม่พบ)',
      sampleData: parsed.slice(0, 5).map(function(r) {
        return { num: r.num, name: r.name, target: r.target, result: r.result, status: r.passfail };
      }),
      withData:   withData.length,
      passed:     passed.length,
    });
    setQuality({
      completeness: parseFloat(comp),
      empty:        empty,
      anomalies:    anomaly,
      score:        comp >= 90 ? 'ดีมาก' : comp >= 75 ? 'ดี' : comp >= 50 ? 'พอใช้' : 'ต่ำ'
    });
    setStep('preview');
    setLoading(false);
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function confirmImport() {
    if (preview.sourceType === 'csv') {
      // Import CSV quarterly data and apply to selected KPI
      var CSV = window.KPIHUNTER_CSV;
      var unitMapping = CSV.csvToUnitQuarterlyMapping(parsedRows.matched);
      var csvMeta = {
        fileName:   file ? file.name : '',
        uploadDate: new Date().toLocaleString('th-TH'),
        sourceType: 'csv',
        kpiId:      selectedKPI,
        unitsMatched: parsedRows.matched.length,
        unitsUnmatched: parsedRows.unmatched.length,
      };
      // Apply unit data to the selected KPI and calculate aggregate result
      if (selectedKPI) {
        D.applyCSVUnitData(selectedKPI, unitMapping);
        D.saveResults();
      }
      D.importCSVQuarterlyData(unitMapping, csvMeta);
      setDoneStats({ total: parsedRows.matched.length, matched: parsedRows.matched.length, unmatched: parsedRows.unmatched.length });
    } else {
      // Import Excel KPI data
      D.applyBulkResults(parsedRows, {
        fileName:   file ? file.name : '',
        uploadDate: new Date().toLocaleString('th-TH'),
        rows:       parsedRows.length,
        sourceType: 'excel'
      });
      var passed = D.kpis.filter(function(k) { return k.passfail === 'ผ่าน'; });
      setDoneStats({ total: parsedRows.length, withData: preview.withData, passed: passed.length });
    }
    setStep('done');
  }

  /* ── Done ── */
  if (step === 'done') {
    var isCSV = preview && preview.sourceType === 'csv';
    return React.createElement('div', { className:'page-content' },
      React.createElement('div', { className:'upload-success' },
        React.createElement('div', { className:'upload-success-check' },
          React.createElement('svg', { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:'#10B981', strokeWidth:2.5, strokeLinecap:'round' },
            React.createElement('path', { d:'M20 6L9 17l-5-5' })
          )
        ),
        React.createElement('h2', null, 'นำเข้าข้อมูลสำเร็จ'),
        React.createElement('p', null, 'ไฟล์ ' + (file ? file.name : '') + ' ถูกประมวลผลและบันทึกแล้ว'),
        doneStats && React.createElement('div', { className:'upload-success-stats' },
          isCSV ? [
            React.createElement('div', { key:'matched' }, React.createElement('strong', null, doneStats.matched), ' หน่วยจับคู่สำเร็จ'),
            React.createElement('div', { key:'unmatched' }, React.createElement('strong', null, doneStats.unmatched), ' หน่วยไม่พบคู่')
          ] : [
            React.createElement('div', { key:'total' }, React.createElement('strong', null, doneStats.total), ' ตัวชี้วัด'),
            React.createElement('div', { key:'withData' }, React.createElement('strong', null, doneStats.withData), ' มีข้อมูล'),
            React.createElement('div', { key:'passed' }, React.createElement('strong', null, doneStats.passed), ' ผ่านเกณฑ์')
          ]
        ),
        React.createElement('div', { style:{display:'flex', gap:12, justifyContent:'center'} },
          React.createElement('button', {
            className:'btn-secondary',
            onClick: () => { setStep('upload'); setFile(null); setPreview(null); setParsedRows([]); }
          }, 'อัปโหลดไฟล์ใหม่'),
          React.createElement('button', {
            className:'btn-primary',
            onClick: () => onComplete && onComplete('dashboard')
          }, 'ไปหน้า Dashboard')
        )
      )
    );
  }

  /* ── KPI Select (for CSV only) ── */
  if (step === 'kpi-select' && preview) {
    var ssoKPIs = D.kpis.filter(function(k) { return k.type === 'sso' || k.type === 'both'; });
    return React.createElement('div', { className:'page-content' },
      React.createElement(SectionHeader, {
        title: 'เลือกตัวชี้วัดสำหรับไฟล์นี้',
        sub: file ? file.name : ''
      }),
      React.createElement('div', { className:'card', style:{maxWidth:640} },
        React.createElement('div', { style:{fontWeight:700, marginBottom:8} }, 'ไฟล์ HDC นี้เป็นข้อมูลตัวชี้วัดไหน?'),
        React.createElement('div', { style:{fontSize:'var(--text-sm)', color:'var(--color-text-muted)', marginBottom:16} },
          'ข้อมูลจาก HDC 1 ไฟล์ = 1 ตัวชี้วัด กรุณาเลือกตัวชี้วัดที่ตรงกับไฟล์ที่อัปโหลด'
        ),
        React.createElement('select', {
          value: selectedKPI,
          onChange: function(e) { setSelectedKPI(e.target.value); },
          style: {
            width:'100%', padding:'10px 12px', borderRadius:8,
            border:'1px solid var(--color-border-default)',
            fontSize:'var(--text-sm)', marginBottom:16
          }
        },
          React.createElement('option', { value:'' }, '-- เลือกตัวชี้วัด --'),
          ssoKPIs.map(function(k) {
            return React.createElement('option', { key:k.id, value:k.id },
              k.num + '. ' + k.name
            );
          })
        ),
        React.createElement('div', { style:{display:'flex', gap:12} },
          React.createElement('button', {
            className:'btn-secondary',
            onClick: function() { setStep('upload'); setFile(null); setPreview(null); setParsedRows([]); }
          }, 'ยกเลิก'),
          React.createElement('button', {
            className:'btn-primary',
            disabled: !selectedKPI,
            onClick: function() { if (selectedKPI) setStep('preview'); }
          }, 'ถัดไป: ตรวจสอบข้อมูล')
        )
      )
    );
  }

  /* ── Preview ── */
  if (step === 'preview' && preview) {
    var isCSV = preview.sourceType === 'csv';

    return React.createElement('div', { className:'page-content' },
      React.createElement(SectionHeader, {
        title: 'ตรวจสอบข้อมูลก่อนนำเข้า',
        sub: preview.fileName + (isCSV ? ' (CSV)' : ' · ชีท: ' + preview.sheetName)
      }),

      React.createElement('div', { className:'grid-2' },

        /* File info */
        React.createElement('div', { className:'card' },
          React.createElement('div', { style:{fontWeight:700, marginBottom:12} }, 'ข้อมูลไฟล์'),
          React.createElement('div', { className:'file-info-grid' },
            (isCSV ? [
              ['ชื่อไฟล์',         preview.fileName],
              ['ขนาดไฟล์',        preview.fileSize],
              ['รูปแบบ',          'HDC CSV'],
              ['จำนวนหน่วยบริการ', preview.rows + ' แห่ง'],
              ['จับคู่สำเร็จ',     preview.matched + ' แห่ง'],
              ['ไม่พบคู่',         preview.unmatched + ' แห่ง'],
            ] : [
              ['ชื่อไฟล์',         preview.fileName],
              ['ขนาดไฟล์',        preview.fileSize],
              ['ชีทที่ใช้',        preview.sheetName],
              ['จำนวนชีททั้งหมด', preview.sheets.length + ' ชีท'],
              ['รายการ KPI พบ',   preview.rows + ' รายการ'],
              ['มีข้อมูลผลงาน',   preview.withData + ' รายการ'],
              ['ผ่านเกณฑ์',       preview.passed + ' รายการ'],
              ['คอลัมน์ผลงาน',    preview.colResult],
              ['คอลัมน์ประเมิน',  preview.colPassfail],
            ]).map(([k,v]) =>
              React.createElement('div', { key:k, className:'fi-row' },
                React.createElement('span', null, k),
                React.createElement('span', null, v)
              )
            )
          )
        ),

        /* Quality */
        React.createElement('div', { className:'card' },
          React.createElement('div', { style:{fontWeight:700, marginBottom:12} }, 'Data Quality Score'),
          React.createElement('div', { style:{display:'flex', alignItems:'center', gap:'var(--space-6)', padding:'var(--space-2) 0'} },
            React.createElement('div', { style:{position:'relative', flexShrink:0} },
              React.createElement(MiniDonut, { value:quality.completeness, max:100, color:'#10B981', size:88 }),
              React.createElement('div', { style:{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'} },
                React.createElement('div', { style:{fontSize:'var(--text-xl)', fontWeight:800, color:'#059669', lineHeight:1} }, quality.completeness + '%'),
                React.createElement('div', { style:{fontSize:'9px', color:'var(--color-text-muted)'} }, 'ครบถ้วน')
              )
            ),
            React.createElement('div', null,
              React.createElement('div', { className:'dq-row' },
                React.createElement('span', { className:'dq-dot green' }),
                'ข้อมูลครบถ้วน: ', React.createElement('strong', null, quality.completeness + '%')
              ),
              React.createElement('div', { className:'dq-row' },
                React.createElement('span', { className:'dq-dot amber' }),
                'ช่องว่าง: ', React.createElement('strong', null, quality.empty + ' รายการ')
              ),
              React.createElement('div', { className:'dq-row' },
                React.createElement('span', { className:'dq-dot red' }),
                'ค่าผิดปกติ: ', React.createElement('strong', null, quality.anomalies + ' รายการ')
              ),
              React.createElement('div', { className:'dq-score' },
                'คุณภาพข้อมูล:',
                React.createElement('span', { className:'badge badge-pass', style:{marginLeft:8} }, quality.score)
              )
            )
          )
        )
      ),

      /* Column mapping */
      React.createElement('div', { className:'card' },
        React.createElement('div', { style:{fontWeight:700, marginBottom:12} }, 'Column ที่ตรวจพบ'),
        React.createElement('div', { className:'mapping-grid' },
          preview.columns.map(col =>
            React.createElement('div', { key:col, className:'mapping-item' },
              React.createElement('span', { style:{fontSize:'var(--text-xs)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'} }, col),
              React.createElement('span', { className:'mapping-status' },
                React.createElement(Icon, { path:'M5 13l4 4L19 7', size:12 }),
                'พบ'
              )
            )
          )
        )
      ),

      /* Sample / Unit Matching */
      isCSV ? React.createElement('div', { className:'card' },
        React.createElement('div', { style:{fontWeight:700, marginBottom:12} }, 'การจับคู่หน่วยบริการ'),
        parsedRows.matched && parsedRows.matched.length > 0 && React.createElement('div', { style:{marginBottom:16} },
          React.createElement('div', { style:{fontSize:'var(--text-sm)', color:'var(--color-text-muted)', marginBottom:8} }, 'จับคู่สำเร็จ (' + parsedRows.matched.length + ' แห่ง):'),
          React.createElement('div', { style:{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8} },
            parsedRows.matched.slice(0, 10).map((m, i) =>
              React.createElement('div', { key:i, style:{fontSize:'var(--text-sm)', padding:8, background:'#ECFDF5', border:'1px solid #A7F3D0', borderRadius:'6px', display:'flex', justifyContent:'space-between'} },
                React.createElement('span', null, m.csvUnit.unitCode + ': ' + m.csvUnit.unitName.substring(0, 25)),
                React.createElement('span', { style:{color:'#059669', fontSize:'11px', fontWeight:600} }, '✓')
              )
            )
          )
        ),
        parsedRows.unmatched && parsedRows.unmatched.length > 0 && React.createElement('div', null,
          React.createElement('div', { style:{fontSize:'var(--text-sm)', color:'var(--color-text-muted)', marginBottom:8} }, 'ไม่พบคู่ (' + parsedRows.unmatched.length + ' แห่ง):'),
          React.createElement('div', { style:{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8} },
            parsedRows.unmatched.map((u, i) =>
              React.createElement('div', { key:i, style:{fontSize:'var(--text-sm)', padding:8, background:'#FFF7ED', border:'1px solid #FED7AA', borderRadius:'6px'} },
                u.csvUnit.unitCode + ': ' + u.csvUnit.unitName.substring(0, 25)
              )
            )
          )
        )
      ) : React.createElement('div', { className:'card' },
        React.createElement('div', { style:{fontWeight:700, marginBottom:12} }, 'ตัวอย่างข้อมูล (5 แถวแรก)'),
        React.createElement('div', { className:'table-wrap' },
          React.createElement('table', { className:'data-table compact' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, 'ลำดับ'),
                React.createElement('th', null, 'ตัวชี้วัด'),
                React.createElement('th', null, 'เป้าหมาย'),
                React.createElement('th', { style:{textAlign:'right'} }, 'ผลงาน'),
                React.createElement('th', null, 'ประเมิน')
              )
            ),
            React.createElement('tbody', null,
              preview.sampleData.map((r,i) =>
                React.createElement('tr', { key:i },
                  React.createElement('td', { className:'td-num' }, r.num),
                  React.createElement('td', null, r.name || '-'),
                  React.createElement('td', { className:'td-target' }, r.target || '-'),
                  React.createElement('td', { className:'td-result' }, r.result || '-'),
                  React.createElement('td', null, React.createElement(KPIBadge, { passfail:r.status }))
                )
              )
            )
          )
        )
      ),

      /* Actions */
      React.createElement('div', { className:'upload-actions' },
        React.createElement('button', {
          className:'btn-secondary',
          onClick: () => { setStep('upload'); setFile(null); setPreview(null); setParsedRows([]); }
        }, 'ยกเลิก'),
        React.createElement('button', {
          className:'btn-primary',
          onClick: confirmImport
        },
          React.createElement(Icon, { path:'M5 13l4 4L19 7', size:14, color:'#fff' }),
          'ยืนยันนำเข้าและบันทึก'
        )
      )
    );
  }

  /* ── Upload ── */
  return React.createElement('div', { className:'page-content' },
    React.createElement(SectionHeader, {
      title: 'อัปโหลดข้อมูล KPI',
      sub: 'นำเข้าไฟล์ HDC Export (.txt/.csv) หรือไฟล์ Excel — อำเภอเขาค้อ'
    }),

    /* แสดงข้อมูลที่บันทึกไว้ล่าสุด */
    meta && React.createElement('div', {
      style: {
        display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
        background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10,
        marginBottom:16, fontSize:'var(--text-sm)', color:'#1E40AF'
      }
    },
      React.createElement(Icon, { path:'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', size:16, color:'#3B82F6' }),
      React.createElement('div', null,
        React.createElement('strong', null, 'ข้อมูลที่บันทึกล่าสุด: '),
        meta.fileName + ' · อัปโหลดเมื่อ ' + meta.uploadDate + ' · ' + meta.rows + ' รายการ'
      ),
      React.createElement('button', {
        onClick: function() { D.clearAllData(); window.dispatchEvent(new CustomEvent('kpihunter-data-changed')); },
        style: {
          marginLeft:'auto', padding:'4px 12px', borderRadius:6,
          border:'1px solid #BFDBFE', background:'#fff',
          color:'#DC2626', fontSize:'var(--text-xs)', fontWeight:600, cursor:'pointer'
        }
      }, 'ล้างข้อมูล')
    ),

    React.createElement('div', { className:'upload-area-wrap' },

      parseError && React.createElement('div', {
        style: {
          display:'flex', alignItems:'center', gap:8, padding:'10px 16px',
          background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8,
          marginBottom:12, color:'#991B1B', fontSize:'var(--text-sm)', fontWeight:500
        }
      },
        React.createElement(Icon, { path:'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', size:16, color:'#DC2626' }),
        parseError
      ),

      React.createElement('div', {
        className: 'upload-area' + (dragOver ? ' drag-over' : ''),
        onDragOver: e => { e.preventDefault(); setDragOver(true); },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop
      },
        React.createElement('input', {
          type:'file', accept:'.xlsx,.xls,.csv,.txt',
          className:'upload-input',
          onChange: e => handleFile(e.target.files[0])
        }),
        loading
          ? React.createElement('div', { style:{padding:'var(--space-4)'} },
              React.createElement('div', { style:{width:40,height:40,border:'3px solid var(--color-herb-200)',borderTopColor:'var(--color-herb-600)',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto var(--space-4)'} }),
              React.createElement('div', { className:'upload-text' }, 'กำลังอ่านไฟล์...')
            )
          : React.createElement(React.Fragment, null,
              React.createElement('div', { className:'upload-icon' },
                React.createElement('svg', { width:52, height:52, viewBox:'0 0 24 24', fill:'none', stroke: dragOver ? '#2D6A4F' : '#9CA3AF', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round' },
                  React.createElement('path', { d:'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4m0 0L8 8m4-4v12' })
                )
              ),
              React.createElement('div', { className:'upload-text' }, 'ลากวางไฟล์ หรือคลิกเพื่อเลือก'),
              React.createElement('div', { className:'upload-hint' },
                React.createElement('strong', null, 'HDC Export:'), ' .txt หรือ .csv  |  ',
                React.createElement('strong', null, 'Excel:'), ' .xlsx, .xls'
              ),
              React.createElement('div', { className:'upload-tag' }, 'ปีงบประมาณ 2569 · อำเภอเขาค้อ')
            )
      ),

      React.createElement('div', { className:'upload-tips' },
        React.createElement('h4', null, 'คำแนะนำการอัปโหลด'),
        React.createElement('ul', null,
          React.createElement('li', null, React.createElement('strong', null, 'HDC Export (.txt/.csv):'), ' ดึงข้อมูลจาก HDC ต่อ 1 ตัวชี้วัด → วางไฟล์ → ระบบจับคู่หน่วยบริการอัตโนมัติ'),
          React.createElement('li', null, React.createElement('strong', null, 'Excel (.xlsx):'), ' ไฟล์ประเมินผลรวมจาก สสจ. — ระบบอ่านคอลัมน์ผลงาน/ประเมินอัตโนมัติ'),
          React.createElement('li', null, 'ข้อมูลจะถูกบันทึกในเบราว์เซอร์ — ปิดแล้วเปิดใหม่ข้อมูลยังอยู่'),
          React.createElement('li', null, 'สามารถแก้ไขค่ารายตัวได้เพิ่มเติมในหน้า KPI Explorer'),
          React.createElement('li', null, 'อัปโหลดไฟล์ใหม่ทุกเดือนเพื่ออัปเดตผลงาน')
        )
      )
    )
  );
}

/* Spin animation */
const uploadStyle = document.createElement('style');
uploadStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(uploadStyle);

Object.assign(window, { UploadPage });
