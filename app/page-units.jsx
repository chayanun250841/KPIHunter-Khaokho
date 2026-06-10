/* KPI HUNTER — Unit Performance Page */

function UnitPerformancePage() {
  const D4 = window.KPIHUNTER;
  const [selectedUnit, setSelectedUnit] = useState(null);
  const rankings = useMemo(() => D4.getUnitRankings(), []);

  // Build heatmap data
  const heatmapKPIs = useMemo(() => {
    return D4.kpis.filter(k => D4.unitPerformance[k.id]).slice(0, 20);
  }, []);

  if (selectedUnit) {
    const unit = D4.units.find(u => u.id === selectedUnit);
    const rank = rankings.find(r => r.unit.id === selectedUnit);
    // Get all KPI data for this unit
    const unitKPIs = [];
    Object.keys(D4.unitPerformance).forEach(kpiId => {
      const kpi = D4.kpis.find(k => k.id === kpiId);
      const ud = D4.unitPerformance[kpiId].find(d => d.unitId === selectedUnit);
      if (kpi && ud) unitKPIs.push({ ...kpi, unitValue: ud.value, unitPassed: ud.passed });
    });
    unitKPIs.sort((a, b) => a.unitValue - b.unitValue);

    return React.createElement('div', { className: 'page-content' },
      React.createElement('button', { className: 'back-btn', onClick: () => setSelectedUnit(null) }, '← กลับไปอันดับหน่วยบริการ'),
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'unit-detail-header' },
          React.createElement('div', null,
            React.createElement('h2', { className: 'section-title' }, unit.name),
            React.createElement('div', { style: { color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' } }, 'รหัส: ' + unit.code)
          ),
          React.createElement('div', { className: 'unit-detail-stats' },
            React.createElement('div', { className: 'uds-item' },
              React.createElement('div', { className: 'uds-value green' }, rank.passedKPIs),
              React.createElement('div', { className: 'uds-label' }, 'ผ่าน')
            ),
            React.createElement('div', { className: 'uds-item' },
              React.createElement('div', { className: 'uds-value red' }, rank.failedKPIs),
              React.createElement('div', { className: 'uds-label' }, 'ไม่ผ่าน')
            ),
            React.createElement('div', { className: 'uds-item' },
              React.createElement('div', { className: 'uds-value' }, rank.avgScore.toFixed(1) + '%'),
              React.createElement('div', { className: 'uds-label' }, 'คะแนนเฉลี่ย')
            )
          )
        )
      ),

      /* KPIs needing attention */
      React.createElement('div', { className: 'grid-2' },
        React.createElement('div', { className: 'card' },
          React.createElement(SectionHeader, { title: 'KPI ที่ต้องเร่งรัด', sub: 'ผลงานต่ำสุดของหน่วยนี้' }),
          React.createElement('div', { className: 'table-wrap' },
            React.createElement('table', { className: 'data-table compact' },
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'ตัวชี้วัด'),
                  React.createElement('th', { style: { textAlign: 'right', width: 80 } }, 'ผลงาน'),
                  React.createElement('th', { style: { width: 70 } }, 'สถานะ')
                )
              ),
              React.createElement('tbody', null,
                unitKPIs.filter(k => !k.unitPassed).slice(0, 10).map(k =>
                  React.createElement('tr', { key: k.id },
                    React.createElement('td', { className: 'td-name' }, k.name.length > 40 ? k.name.substring(0, 40) + '...' : k.name),
                    React.createElement('td', { className: 'td-result red' }, k.unitValue.toFixed(1) + '%'),
                    React.createElement('td', null, React.createElement('span', { className: 'badge badge-fail' }, '✗'))
                  )
                )
              )
            )
          )
        ),
        React.createElement('div', { className: 'card' },
          React.createElement(SectionHeader, { title: 'KPI ที่ผ่านเกณฑ์', sub: 'ผลงานที่ดีของหน่วยนี้' }),
          React.createElement('div', { className: 'table-wrap' },
            React.createElement('table', { className: 'data-table compact' },
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'ตัวชี้วัด'),
                  React.createElement('th', { style: { textAlign: 'right', width: 80 } }, 'ผลงาน'),
                  React.createElement('th', { style: { width: 70 } }, 'สถานะ')
                )
              ),
              React.createElement('tbody', null,
                unitKPIs.filter(k => k.unitPassed).sort((a, b) => b.unitValue - a.unitValue).slice(0, 10).map(k =>
                  React.createElement('tr', { key: k.id },
                    React.createElement('td', { className: 'td-name' }, k.name.length > 40 ? k.name.substring(0, 40) + '...' : k.name),
                    React.createElement('td', { className: 'td-result green' }, k.unitValue.toFixed(1) + '%'),
                    React.createElement('td', null, React.createElement('span', { className: 'badge badge-pass' }, '✓'))
                  )
                )
              )
            )
          )
        )
      ),

      /* All KPIs for this unit */
      React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, { title: 'ผลงานทุกตัวชี้วัด' }),
        React.createElement(HBarChart, {
          items: unitKPIs.sort((a, b) => b.unitValue - a.unitValue).map(k => ({
            label: k.name.length > 30 ? k.name.substring(0, 30) + '...' : k.name,
            value: k.unitValue,
            target: k.targetNum || 80
          })),
          maxVal: 100
        })
      )
    );
  }

  return React.createElement('div', { className: 'page-content' },
    React.createElement(SectionHeader, { title: 'ผลงานรายหน่วยบริการ', sub: 'อำเภอเขาค้อ — ' + D4.units.length + ' หน่วย' }),

    /* Ranking Cards — เรียงตามลำดับที่กำหนด */
    React.createElement('div', { className: 'unit-ranking-grid' },
      D4.units.map((unit, i) => {
        const r = rankings.find(x => x.unit.id === unit.id);
        if (!r) return null;
        const scoreColor = r.avgScore >= 80 ? '#065F46' : r.avgScore >= 60 ? '#92400E' : '#991B1B';
        return React.createElement('div', {
          key: unit.id, className: 'unit-rank-card', onClick: () => setSelectedUnit(unit.id)
        },
          React.createElement('div', { className: 'urc-rank' },
            React.createElement('span', { className: 'urc-rank-num', style:{fontSize:11} }, '#' + (i + 1))
          ),
          React.createElement('div', { className: 'urc-body' },
            React.createElement('div', { className: 'urc-name' }, unit.short),
            React.createElement('div', { className: 'urc-score', style: { color: scoreColor } }, r.avgScore.toFixed(1) + '%'),
            React.createElement('div', { className: 'urc-meta' },
              React.createElement('span', { className: 'green' }, '✓ ' + r.passedKPIs),
              React.createElement('span', { className: 'red' }, '✗ ' + r.failedKPIs)
            ),
            React.createElement(ProgressBar, { value: parseFloat(r.passRate), target: 100 })
          )
        );
      })
    ),

    /* Heatmap */
    React.createElement('div', { className: 'card' },
      React.createElement(SectionHeader, { title: 'Heatmap: KPI × หน่วยบริการ', sub: 'สีเข้ม = ผลงานสูง | สีอ่อน = ผลงานต่ำ | คอลัมน์สุดท้าย = รวมอำเภอ' }),
      React.createElement('div', { className: 'heatmap-wrap' },
        React.createElement('table', { className: 'heatmap-table' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', { className: 'hm-kpi-col' }, 'ตัวชี้วัด'),
              D4.units.map(u => React.createElement('th', { key: u.id, className: 'hm-unit-col' }, u.short)),
              React.createElement('th', { className: 'hm-unit-col hm-total-col' }, 'รวม %'),
              React.createElement('th', { className: 'hm-unit-col hm-total-col' }, 'ผล')
            )
          ),
          React.createElement('tbody', null,
            heatmapKPIs.map(kpi => {
              const data = D4.unitPerformance[kpi.id] || [];
              /* คำนวณค่าเฉลี่ยรวมจากข้อมูลจริง */
              const actualResult = typeof kpi.result === 'number' ? kpi.result : null;
              const allVals = data.map(d => d.value).filter(v => v != null);
              const avgAll = allVals.length > 0 ? allVals.reduce((s,v) => s+v, 0) / allVals.length : null;
              const displayTotal = actualResult !== null ? actualResult : avgAll;
              const totalPassed = kpi.passfail === 'ผ่าน';
              const totalBg = displayTotal !== null
                ? (totalPassed ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.15)')
                : 'var(--color-neutral-50)';

              return React.createElement('tr', { key: kpi.id },
                React.createElement('td', { className: 'hm-kpi-name' },
                  kpi.name.length > 35 ? kpi.name.substring(0, 35) + '...' : kpi.name
                ),
                D4.units.map(u => {
                  const ud = data.find(d => d.unitId === u.id);
                  if (!ud) return React.createElement('td', { key: u.id, className: 'hm-cell' }, '—');
                  const intensity = Math.min(1, ud.value / 100);
                  const bg = ud.passed
                    ? 'rgba(16, 185, 129, ' + (0.12 + intensity * 0.55) + ')'
                    : 'rgba(239, 68, 68, ' + (0.12 + (1 - intensity) * 0.55) + ')';
                  return React.createElement('td', { key: u.id, className: 'hm-cell', style: { background: bg } },
                    React.createElement('span', { className: 'hm-val' }, ud.value.toFixed(0))
                  );
                }),
                /* รวม % คอลัมน์ */
                React.createElement('td', { className: 'hm-cell hm-total-cell', style: { background: totalBg } },
                  React.createElement('span', { className: 'hm-val hm-total-val' },
                    displayTotal !== null ? displayTotal.toFixed(1) : '—'
                  )
                ),
                /* สถานะผ่าน/ไม่ผ่าน */
                React.createElement('td', { className: 'hm-cell hm-status-cell' },
                  kpi.passfail === 'ผ่าน'
                    ? React.createElement('span', { className: 'hm-pass' }, '✓')
                    : kpi.passfail.indexOf('ไม่ผ่าน') >= 0
                      ? React.createElement('span', { className: 'hm-fail' }, '✗')
                      : React.createElement('span', { style:{color:'#9CA3AF'} }, '—')
                )
              );
            })
          )
        )
      )
    )
  );
}

Object.assign(window, { UnitPerformancePage });
