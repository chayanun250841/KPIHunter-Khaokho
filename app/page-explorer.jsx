/* KPI HUNTER — KPI Explorer Page */

function ExplorerPage({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editResult, setEditResult] = useState('');
  const [editPassfail, setEditPassfail] = useState('');
  const [saveMsg, setSaveMsg] = useState('');
  const [unitInputs, setUnitInputs] = useState({});   // { unitId: { target, result } }
  const [unitSaveMsg, setUnitSaveMsg] = useState('');
  const [showUnitEntry, setShowUnitEntry] = useState(false);
  const D3 = window.KPIHUNTER;

  function startEdit(e, k) {
    e.stopPropagation();
    setEditingId(k.id);
    setEditResult(typeof k.result === 'number' ? k.result : '');
    setEditPassfail(k.passfail || 'ผ่าน');
    setSaveMsg('');
  }

  function openUnitEntry(kpi) {
    // Pre-fill with existing unit data if available
    var existing = D3.unitPerformance[kpi.id] || [];
    var inputs = {};
    D3.units.forEach(function(u) {
      var ex = existing.find(function(d) { return d.unitId === u.id; });
      inputs[u.id] = {
        target: ex && ex.target != null ? String(ex.target) : '',
        result: ex && ex.result != null ? String(ex.result) : ''
      };
    });
    setUnitInputs(inputs);
    setShowUnitEntry(true);
    setUnitSaveMsg('');
  }

  function saveUnitEntry(kpi) {
    // Build unitMapping from inputs
    var unitMapping = {};
    D3.units.forEach(function(u) {
      var inp = unitInputs[u.id] || {};
      var t = inp.target !== '' ? parseFloat(inp.target) : null;
      var r = inp.result !== '' ? parseFloat(inp.result) : null;
      if (t !== null || r !== null) {
        unitMapping[u.id] = {
          overall: { target: t, result: r, F: '' },
          q1: { target: null, result: null, F: '' },
          q2: { target: null, result: null, F: '' },
          q3: { target: null, result: null, F: '' },
          q4: { target: null, result: null, F: '' }
        };
      }
    });
    D3.applyCSVUnitData(kpi.id, unitMapping);
    D3.saveResults();
    window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
    setShowUnitEntry(false);
    setUnitSaveMsg('บันทึกผลงานรายหน่วยแล้ว');
    setTimeout(function() { setUnitSaveMsg(''); }, 3000);
  }

  function cancelEdit(e) {
    e && e.stopPropagation();
    setEditingId(null);
    setSaveMsg('');
  }

  function saveEdit(e, kpiId) {
    e.stopPropagation();
    D3.updateKPI(kpiId, editResult, editPassfail);
    setEditingId(null);
    setSaveMsg('บันทึกแล้ว');
    setTimeout(() => setSaveMsg(''), 2500);
  }

  const categories = useMemo(() => {
    const cats = {};
    D3.kpis.forEach(k => { if (k.category) cats[k.category] = (cats[k.category] || 0) + 1; });
    return Object.entries(cats).map(([k, v]) => ({ value: k, label: k.split('(')[0].trim(), count: v }));
  }, []);

  const filtered = useMemo(() => {
    return D3.kpis.filter(k => {
      if (search && k.name.toLowerCase().indexOf(search.toLowerCase()) < 0 && k.num.indexOf(search) < 0) return false;
      if (statusFilter === 'pass' && k.passfail !== 'ผ่าน') return false;
      if (statusFilter === 'fail' && k.passfail.indexOf('ไม่ผ่าน') < 0) return false;
      if (statusFilter === 'none' && k.passfail !== '') return false;
      if (typeFilter && k.type !== typeFilter) return false;
      if (catFilter && k.category !== catFilter) return false;
      if (riskFilter && k.risk !== riskFilter) return false;
      return true;
    });
  }, [search, statusFilter, typeFilter, catFilter, riskFilter]);

  // Detail panel
  if (selectedKPI) {
    const k = selectedKPI;
    const trend = D3.trends[k.id];
    const unitData = D3.unitPerformance[k.id];
    return React.createElement('div', { className: 'page-content' },
      React.createElement('button', { className: 'back-btn', onClick: () => setSelectedKPI(null) },
        '← กลับไปรายการ KPI'
      ),
      React.createElement('div', { className: 'card kpi-detail-card' },
        React.createElement('div', { className: 'kpi-detail-header' },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 } },
              React.createElement(TypeBadge, { type: k.type }),
              React.createElement(KPIBadge, { passfail: k.passfail }),
              React.createElement(RiskBadge, { risk: k.risk })
            ),
            React.createElement('h2', { className: 'kpi-detail-name' }, k.num + '. ' + k.name),
            React.createElement('div', { className: 'kpi-detail-meta' },
              React.createElement('span', null, 'กลุ่มงาน: ' + (k.pm || '-')),
              React.createElement('span', null, 'หมวด: ' + (k.category || '-'))
            )
          ),
          React.createElement('div', { className: 'kpi-detail-score' },
            React.createElement(MiniDonut, { value: k.result, max: k.targetNum || 100, color: k.passfail === 'ผ่าน' ? '#10B981' : '#EF4444', size: 100 }),
            React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { fontSize: 'var(--text-xl)', fontWeight: 800 } }, typeof k.result === 'number' ? k.result.toFixed(1) : '-'),
              React.createElement('div', { style: { fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' } }, 'ผลงาน')
            )
          )
        ),
        React.createElement('div', { className: 'kpi-detail-grid' },
          React.createElement('div', { className: 'detail-stat' },
            React.createElement('div', { className: 'detail-stat-label' }, 'เป้าหมาย'),
            React.createElement('div', { className: 'detail-stat-value' }, k.target || '-')
          ),
          React.createElement('div', { className: 'detail-stat' },
            React.createElement('div', { className: 'detail-stat-label' }, 'ผลงาน'),
            React.createElement('div', { className: 'detail-stat-value' }, typeof k.result === 'number' ? k.result.toFixed(2) : '-')
          ),
          React.createElement('div', { className: 'detail-stat' },
            React.createElement('div', { className: 'detail-stat-label' }, 'ผลการประเมิน'),
            React.createElement('div', { className: 'detail-stat-value' }, React.createElement(KPIBadge, { passfail: k.passfail }))
          ),
          React.createElement('div', { className: 'detail-stat' },
            React.createElement('div', { className: 'detail-stat-label' }, 'หน่วยรับผิดชอบ'),
            React.createElement('div', { className: 'detail-stat-value' }, React.createElement(TypeBadge, { type: k.type }))
          )
        )
      ),

      /* Trend */
      trend && React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, { title: 'แนวโน้มรายเดือน', sub: 'ปีงบประมาณ 2569' }),
        React.createElement('div', { className: 'trend-chart' },
          trend.map((v, i) => {
            const maxV = Math.max(...trend);
            const pct = maxV > 0 ? (v / maxV) * 100 : 0;
            const barColor = k.targetNum && v >= k.targetNum ? '#10B981' : v >= (k.targetNum || 80) * 0.8 ? '#F59E0B' : '#EF4444';
            return React.createElement('div', { key: i, className: 'trend-bar-col' },
              React.createElement('div', { className: 'trend-value' }, v.toFixed(1)),
              React.createElement('div', { className: 'trend-bar-wrap' },
                React.createElement('div', { className: 'trend-bar', style: { height: Math.max(4, pct) + '%', background: barColor } })
              ),
              React.createElement('div', { className: 'trend-label' }, D3.monthNames[i])
            );
          }),
          k.targetNum && React.createElement('div', { className: 'trend-target-line', style: { bottom: (k.targetNum / Math.max(...trend) * 100) + '%' } },
            React.createElement('span', null, 'เป้า ' + k.targetNum)
          )
        )
      ),

      /* Unit breakdown */
      unitData && unitData.some(u => u.value > 0) && React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, { title: 'ผลงานรายหน่วยบริการ' }),
        React.createElement(HBarChart, {
          items: unitData.sort((a, b) => b.value - a.value).map(u => ({
            label: u.unitName, value: u.value, target: k.targetNum || 80
          })),
          maxVal: Math.max(100, ...unitData.map(u => u.value))
        })
      ),

      /* Unit save message */
      unitSaveMsg && React.createElement('div', {
        style:{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',background:'#ECFDF5',
               borderRadius:8,color:'#065F46',fontWeight:600,fontSize:'var(--text-sm)'}
      }, unitSaveMsg),

      /* Manual Unit Entry Panel */
      React.createElement('div', { className: 'card' },
        React.createElement('div', { style:{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: showUnitEntry ? 16 : 0} },
          React.createElement('div', { style:{fontWeight:700} },
            'กรอกผลงานรายหน่วยบริการ',
            React.createElement('span', { style:{fontSize:'var(--text-xs)', color:'var(--color-text-muted)', fontWeight:400, marginLeft:8} },
              k.type === 'sso' ? 'ตัวชี้วัด สสอ./รพ.สต.' : k.type === 'both' ? 'ตัวชี้วัดร่วม' : 'ตัวชี้วัดโรงพยาบาล'
            )
          ),
          React.createElement('button', {
            className: showUnitEntry ? 'btn-secondary' : 'btn-primary',
            style:{padding:'6px 14px', fontSize:'var(--text-sm)'},
            onClick: function() {
              if (!showUnitEntry) openUnitEntry(k);
              else setShowUnitEntry(false);
            }
          }, showUnitEntry ? 'ยุบ' : 'กรอกผลงาน')
        ),

        showUnitEntry && React.createElement(React.Fragment, null,
          React.createElement('div', { style:{fontSize:'var(--text-xs)', color:'var(--color-text-muted)', marginBottom:12} },
            'กรอก เป้าหมาย (ตัวเลขจำนวนคน/ราย) และ ผลงาน ของแต่ละหน่วยบริการ — ระบบจะคำนวณ % รวมให้อัตโนมัติ'
          ),
          React.createElement('div', { style:{overflowX:'auto'} },
            React.createElement('table', { className:'data-table compact', style:{minWidth:500} },
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'หน่วยบริการ'),
                  React.createElement('th', { style:{textAlign:'right', width:120} }, 'เป้าหมาย'),
                  React.createElement('th', { style:{textAlign:'right', width:120} }, 'ผลงาน'),
                  React.createElement('th', { style:{textAlign:'right', width:80} }, '% ผลงาน')
                )
              ),
              React.createElement('tbody', null,
                D3.units.map(function(u) {
                  var inp = unitInputs[u.id] || { target: '', result: '' };
                  var t = parseFloat(inp.target);
                  var r = parseFloat(inp.result);
                  var pct = (!isNaN(t) && !isNaN(r) && t > 0) ? (r / t * 100).toFixed(1) : '-';
                  return React.createElement('tr', { key: u.id },
                    React.createElement('td', null,
                      React.createElement('span', { style:{fontWeight:600} }, u.short),
                      React.createElement('span', { style:{fontSize:10, color:'var(--color-text-muted)', marginLeft:6} }, u.code)
                    ),
                    React.createElement('td', null,
                      React.createElement('input', {
                        type:'number', min:0, placeholder:'0',
                        value: inp.target,
                        onChange: function(e) {
                          var v = e.target.value;
                          setUnitInputs(function(prev) {
                            var n = Object.assign({}, prev);
                            n[u.id] = Object.assign({}, n[u.id] || {}, { target: v });
                            return n;
                          });
                        },
                        style:{width:'100%', padding:'4px 8px', borderRadius:6, border:'1px solid var(--color-border-default)',
                               textAlign:'right', fontSize:'var(--text-sm)'}
                      })
                    ),
                    React.createElement('td', null,
                      React.createElement('input', {
                        type:'number', min:0, placeholder:'0',
                        value: inp.result,
                        onChange: function(e) {
                          var v = e.target.value;
                          setUnitInputs(function(prev) {
                            var n = Object.assign({}, prev);
                            n[u.id] = Object.assign({}, n[u.id] || {}, { result: v });
                            return n;
                          });
                        },
                        style:{width:'100%', padding:'4px 8px', borderRadius:6, border:'1px solid var(--color-border-default)',
                               textAlign:'right', fontSize:'var(--text-sm)'}
                      })
                    ),
                    React.createElement('td', { style:{textAlign:'right', fontWeight:600,
                      color: pct !== '-' ? (parseFloat(pct) >= (k.targetNum || 80) ? '#059669' : '#DC2626') : 'var(--color-text-muted)'}
                    }, pct !== '-' ? pct + '%' : '-')
                  );
                })
              )
            )
          ),
          React.createElement('div', { style:{display:'flex', gap:12, marginTop:16, justifyContent:'flex-end'} },
            React.createElement('button', { className:'btn-secondary', onClick: function() { setShowUnitEntry(false); } }, 'ยกเลิก'),
            React.createElement('button', {
              className:'btn-primary',
              onClick: function() { saveUnitEntry(k); }
            },
              React.createElement(Icon, { path:'M5 13l4 4L19 7', size:14, color:'#fff' }),
              'บันทึกผลงานรายหน่วย'
            )
          )
        )
      )
    );
  }

  return React.createElement('div', { className: 'page-content' },
    React.createElement(SectionHeader, { title: 'KPI Explorer', sub: 'ค้นหาและกรองตัวชี้วัด — ' + filtered.length + ' รายการ' }),
    
    /* Search & Filters */
    React.createElement('div', { className: 'card filter-card' },
      React.createElement(SearchInput, { value: search, onChange: setSearch, placeholder: 'ค้นหาตัวชี้วัด...' }),
      React.createElement('div', { className: 'filter-row' },
        React.createElement('span', { className: 'filter-label' }, 'สถานะ:'),
        React.createElement(FilterPills, {
          value: statusFilter, onChange: setStatusFilter,
          options: [
            { value: 'pass', label: '✓ ผ่าน', count: D3.kpis.filter(k => k.passfail === 'ผ่าน').length },
            { value: 'fail', label: '✗ ไม่ผ่าน', count: D3.kpis.filter(k => k.passfail.indexOf('ไม่ผ่าน') >= 0).length },
            { value: 'none', label: 'ไม่มีข้อมูล' }
          ]
        })
      ),
      React.createElement('div', { className: 'filter-row' },
        React.createElement('span', { className: 'filter-label' }, 'หน่วยงาน:'),
        React.createElement(FilterPills, {
          value: typeFilter, onChange: setTypeFilter,
          options: [
            { value: 'sso', label: 'สสอ./รพ.สต.' },
            { value: 'rph', label: 'โรงพยาบาล' },
            { value: 'both', label: 'ร่วมกัน' }
          ]
        })
      ),
      React.createElement('div', { className: 'filter-row' },
        React.createElement('span', { className: 'filter-label' }, 'ความเสี่ยง:'),
        React.createElement(FilterPills, {
          value: riskFilter, onChange: setRiskFilter,
          options: [
            { value: 'critical', label: 'วิกฤต' },
            { value: 'high', label: 'เสี่ยงสูง' },
            { value: 'medium', label: 'เสี่ยง' },
            { value: 'pass', label: 'ผ่าน' }
          ]
        })
      )
    ),

    /* KPI Table */
    React.createElement('div', { className: 'card' },
      saveMsg && React.createElement('div', {
        style: { display:'flex', alignItems:'center', gap:8, padding:'8px 16px', background:'#ECFDF5',
                 borderRadius:8, marginBottom:12, color:'#065F46', fontWeight:600, fontSize:'var(--text-sm)' }
      },
        React.createElement(Icon, { path:'M5 13l4 4L19 7', size:14, color:'#059669' }),
        saveMsg
      ),
      filtered.length === 0
        ? React.createElement(EmptyState, { title: 'ไม่พบตัวชี้วัดที่ตรงกับเงื่อนไข', sub: 'ลองเปลี่ยนเงื่อนไขการค้นหา' })
        : React.createElement('div', { className: 'table-wrap' },
            React.createElement('table', { className: 'data-table' },
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', { style: { width: 50 } }, 'ลำดับ'),
                  React.createElement('th', null, 'ตัวชี้วัด'),
                  React.createElement('th', { style: { width: 90 } }, 'หน่วยงาน'),
                  React.createElement('th', { style: { width: 110, textAlign: 'right' } }, 'ผลงาน'),
                  React.createElement('th', { style: { width: 120 } }, 'เป้าหมาย'),
                  React.createElement('th', { style: { width: 90 } }, 'สถานะ'),
                  React.createElement('th', { style: { width: 80 } }, 'ความเสี่ยง'),
                  React.createElement('th', { style: { width: 90 } }, 'แนวโน้ม'),
                  React.createElement('th', { style: { width: 36 } }, '')
                )
              ),
              React.createElement('tbody', null,
                filtered.map(k => {
                  const trend = D3.trends[k.id];
                  const isEditing = editingId === k.id;

                  if (isEditing) {
                    return React.createElement('tr', { key: k.id, style: { background: '#F0F9F3' } },
                      React.createElement('td', { className: 'td-num' }, k.num),
                      React.createElement('td', { className: 'td-name', colSpan: 2 },
                        React.createElement('span', { style: { fontSize:'var(--text-xs)', color:'var(--color-herb-700)', fontWeight:600 } },
                          k.name.length > 55 ? k.name.substring(0, 55) + '…' : k.name
                        )
                      ),
                      /* result input */
                      React.createElement('td', { style: { textAlign:'right' } },
                        React.createElement('input', {
                          type: 'number', step: '0.01', min: '0', max: '100',
                          value: editResult,
                          onChange: e => setEditResult(e.target.value),
                          onClick: e => e.stopPropagation(),
                          style: {
                            width: 80, padding: '4px 8px', border: '1.5px solid var(--color-herb-400)',
                            borderRadius: 6, fontSize: 'var(--text-sm)', fontWeight: 700,
                            textAlign: 'right', outline: 'none', background: '#fff'
                          },
                          autoFocus: true
                        })
                      ),
                      React.createElement('td', { className: 'td-target' }, k.target ? (k.target.length > 15 ? k.target.substring(0, 15) + '...' : k.target) : '-'),
                      /* passfail select */
                      React.createElement('td', null,
                        React.createElement('select', {
                          value: editPassfail,
                          onChange: e => setEditPassfail(e.target.value),
                          onClick: e => e.stopPropagation(),
                          style: {
                            padding: '4px 8px', border: '1.5px solid var(--color-herb-400)',
                            borderRadius: 6, fontSize: 'var(--text-sm)', fontWeight: 600,
                            outline: 'none', background: '#fff', cursor: 'pointer',
                            color: editPassfail === 'ผ่าน' ? '#065F46' : '#991B1B'
                          }
                        },
                          React.createElement('option', { value: 'ผ่าน' }, 'ผ่าน'),
                          React.createElement('option', { value: 'ไม่ผ่าน' }, 'ไม่ผ่าน'),
                          React.createElement('option', { value: '' }, 'ไม่มีข้อมูล')
                        )
                      ),
                      React.createElement('td', null),
                      /* save / cancel */
                      React.createElement('td', null,
                        React.createElement('div', { style: { display:'flex', gap:4 } },
                          React.createElement('button', {
                            title: 'บันทึก',
                            onClick: e => saveEdit(e, k.id),
                            style: {
                              width:28, height:28, borderRadius:6, border:'none',
                              background:'var(--color-herb-600)', color:'#fff',
                              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
                            }
                          }, React.createElement(Icon, { path:'M5 13l4 4L19 7', size:13, color:'#fff' })),
                          React.createElement('button', {
                            title: 'ยกเลิก',
                            onClick: cancelEdit,
                            style: {
                              width:28, height:28, borderRadius:6,
                              border:'1px solid var(--color-border-default)',
                              background:'#fff', cursor:'pointer',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              color:'var(--color-text-muted)'
                            }
                          }, React.createElement(Icon, { path:'M6 18L18 6M6 6l12 12', size:13 }))
                        )
                      )
                    );
                  }

                  return React.createElement('tr', {
                    key: k.id, className: 'clickable-row', onClick: () => setSelectedKPI(k)
                  },
                    React.createElement('td', { className: 'td-num' }, k.num),
                    React.createElement('td', { className: 'td-name' }, k.name.length > 50 ? k.name.substring(0, 50) + '...' : k.name),
                    React.createElement('td', null, React.createElement(TypeBadge, { type: k.type })),
                    React.createElement('td', { className: 'td-result', style: { color: k.passfail === 'ผ่าน' ? '#065F46' : k.passfail.indexOf('ไม่ผ่าน') >= 0 ? '#991B1B' : 'inherit' } },
                      typeof k.result === 'number' ? k.result.toFixed(1) : '-'
                    ),
                    React.createElement('td', { className: 'td-target' }, k.target ? (k.target.length > 15 ? k.target.substring(0, 15) + '...' : k.target) : '-'),
                    React.createElement('td', null, React.createElement(KPIBadge, { passfail: k.passfail })),
                    React.createElement('td', null, React.createElement(RiskBadge, { risk: k.risk })),
                    React.createElement('td', null, trend ? React.createElement(Sparkline, { data: trend, color: k.passfail === 'ผ่าน' ? '#10B981' : '#EF4444', width: 80, height: 24 }) : '-'),
                    React.createElement('td', { onClick: e => e.stopPropagation() },
                      React.createElement('button', {
                        title: 'แก้ไขค่า',
                        onClick: e => startEdit(e, k),
                        style: {
                          width:28, height:28, borderRadius:6,
                          border:'1px solid var(--color-border-default)',
                          background:'#fff', cursor:'pointer',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          color:'var(--color-text-muted)', transition:'all 0.15s'
                        }
                      }, React.createElement(Icon, { path:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', size:13 }))
                    )
                  );
                })
              )
            )
          )
    )
  );
}

Object.assign(window, { ExplorerPage });
