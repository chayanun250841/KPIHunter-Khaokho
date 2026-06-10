/* KPI HUNTER — Dashboard Page */
const D2 = window.KPIHUNTER;

/* Icon paths */
const ICONS = {
  chart:  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  check:  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  xmark:  'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  alert:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
};

function DashboardPage() {
  const summary   = useMemo(() => D2.getSummary(), []);
  const failedKPIs = useMemo(() => D2.kpis.filter(k => k.passfail.indexOf('ไม่ผ่าน') >= 0).sort((a, b) => a.result - b.result), []);
  const criticalKPIs = useMemo(() => D2.kpis.filter(k => k.risk === 'critical' || k.risk === 'high'), []);
  const unitRank  = useMemo(() => D2.getUnitRankings(), []);
  const pmSummary = useMemo(() => D2.getPMSummary(), []);

  return React.createElement('div', { className: 'page-content' },

    /* ── Summary Cards ── */
    React.createElement('div', { className: 'cards-grid-4' },
      React.createElement(SummaryCard, {
        iconPath: ICONS.chart, label: 'KPI ทั้งหมด',
        value: summary.total, sub: 'ประเมินแล้ว ' + summary.evaluated + ' รายการ',
        color: '#2D6A4F'
      }),
      React.createElement(SummaryCard, {
        iconPath: ICONS.check, label: 'ผ่านเกณฑ์',
        value: summary.passed, sub: 'อัตราผ่าน ' + summary.passRate + '%',
        color: '#059669'
      }),
      React.createElement(SummaryCard, {
        iconPath: ICONS.xmark, label: 'ไม่ผ่านเกณฑ์',
        value: summary.failed, sub: 'ต้องเร่งรัดดำเนินการ',
        color: '#DC2626'
      }),
      React.createElement(SummaryCard, {
        iconPath: ICONS.alert, label: 'เสี่ยงสูง / วิกฤต',
        value: summary.critical + summary.highRisk,
        sub: criticalKPIs.length > 0
          ? criticalKPIs[0].name.length > 32
            ? criticalKPIs[0].name.substring(0, 32) + '...'
            : criticalKPIs[0].name
          : 'ไม่พบรายการเสี่ยง',
        color: '#D97706'
      })
    ),

    /* ── Donut + Type Breakdown ── */
    React.createElement('div', { className: 'grid-2' },

      /* Donut */
      React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, { title: 'อัตราผ่านเกณฑ์ภาพรวม', sub: 'ปีงบประมาณ 2569 · ณ เดือนมีนาคม' }),
        React.createElement('div', { style: { display:'flex', alignItems:'center', gap:'var(--space-8)', paddingBottom:'var(--space-2)' } },
          React.createElement('div', { style: { position:'relative', flexShrink:0 } },
            React.createElement(MiniDonut, { value: summary.passRate, max: 100, color: '#2D6A4F', size: 144 }),
            React.createElement('div', { style: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' } },
              React.createElement('div', { style: { fontSize:'var(--text-3xl)', fontWeight:800, color:'#2D6A4F', lineHeight:1 } }, summary.passRate + '%'),
              React.createElement('div', { style: { fontSize:'var(--text-xs)', color:'var(--color-text-muted)', marginTop:4 } }, 'อัตราผ่าน')
            )
          ),
          React.createElement('div', { style: { flex:1 } },
            React.createElement('div', { className: 'stat-row' },
              React.createElement('span', { className: 'stat-dot', style: { background:'#10B981' } }),
              React.createElement('span', null, 'ผ่านเกณฑ์'),
              React.createElement('span', { className: 'stat-num green' }, summary.passed)
            ),
            React.createElement('div', { className: 'stat-row' },
              React.createElement('span', { className: 'stat-dot', style: { background:'#EF4444' } }),
              React.createElement('span', null, 'ไม่ผ่านเกณฑ์'),
              React.createElement('span', { className: 'stat-num red' }, summary.failed)
            ),
            React.createElement('div', { className: 'stat-row' },
              React.createElement('span', { className: 'stat-dot', style: { background:'#D1D5DB' } }),
              React.createElement('span', null, 'ยังไม่ประเมิน'),
              React.createElement('span', { className: 'stat-num' }, summary.total - summary.evaluated)
            )
          )
        )
      ),

      /* Type breakdown */
      React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, { title: 'แยกตามหน่วยรับผิดชอบ', sub: 'สัดส่วน KPI รายประเภทหน่วยบริการ' }),
        React.createElement('div', { style: { display:'flex', gap:'var(--space-3)', paddingBottom:'var(--space-2)' } },
          [
            { type:'sso', count:summary.sso },
            { type:'rph', count:summary.rph },
            { type:'both', count:summary.both }
          ].map(function(t) {
            var tl = typeLabel(t.type);
            var items = D2.kpis.filter(function(k) { return k.type === t.type; });
            var p = items.filter(function(k) { return k.passfail === 'ผ่าน'; }).length;
            var f = items.filter(function(k) { return k.passfail.indexOf('ไม่ผ่าน') >= 0; }).length;
            var rate = (p + f) > 0 ? (p / (p + f) * 100).toFixed(0) : '—';
            return React.createElement('div', { key: t.type, className: 'type-card', style: { borderTopColor: tl.color } },
              React.createElement('div', { style: { fontSize:'11px', fontWeight:700, color:tl.color, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.05em' } }, tl.text),
              React.createElement('div', { style: { fontSize:'var(--text-2xl)', fontWeight:800, marginBottom:4 } }, t.count),
              React.createElement('div', { style: { fontSize:'11px', color:'var(--color-text-muted)', marginBottom:6 } },
                React.createElement('span', { style:{color:'#059669',fontWeight:700} }, p),
                ' ผ่าน · ',
                React.createElement('span', { style:{color:'#DC2626',fontWeight:700} }, f),
                ' ไม่ผ่าน'
              ),
              React.createElement(ProgressBar, { value: parseFloat(rate) || 0, target: 100 })
            );
          })
        )
      )
    ),

    /* ── Top Failed KPIs + Unit Rankings ── */
    React.createElement('div', { className: 'grid-2' },

      /* Failed KPIs table */
      React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, {
          title: 'KPI ที่ต้องเร่งรัด',
          sub: 'เรียงตามผลงานต่ำสุด ' + failedKPIs.length + ' รายการ'
        }),
        React.createElement('div', { className: 'table-wrap' },
          React.createElement('table', { className: 'data-table compact' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, '#'),
                React.createElement('th', null, 'ตัวชี้วัด'),
                React.createElement('th', { style:{textAlign:'right'} }, 'ผลงาน'),
                React.createElement('th', null, 'ระดับ')
              )
            ),
            React.createElement('tbody', null,
              failedKPIs.slice(0, 9).map(function(k, i) {
                return React.createElement('tr', { key: k.id },
                  React.createElement('td', { className: 'td-num' }, i + 1),
                  React.createElement('td', { className: 'td-name', style:{maxWidth:200} },
                    k.name.length > 42 ? k.name.substring(0, 42) + '…' : k.name
                  ),
                  React.createElement('td', { className: 'td-result red' },
                    typeof k.result === 'number' ? k.result.toFixed(1) + '%' : '—'
                  ),
                  React.createElement('td', null, React.createElement(RiskBadge, { risk: k.risk }))
                );
              })
            )
          )
        )
      ),

      /* Unit ranking table */
      React.createElement('div', { className: 'card' },
        React.createElement(SectionHeader, {
          title: 'อันดับหน่วยบริการ',
          sub: 'เรียงตามคะแนนเฉลี่ย ' + D2.units.length + ' หน่วย'
        }),
        React.createElement('div', { className: 'table-wrap' },
          React.createElement('table', { className: 'data-table compact' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, '#'),
                React.createElement('th', null, 'หน่วยบริการ'),
                React.createElement('th', { style:{textAlign:'right'} }, 'คะแนน'),
                React.createElement('th', { style:{minWidth:100} }, 'อัตราผ่าน')
              )
            ),
            React.createElement('tbody', null,
              unitRank.map(function(r, i) {
                var scoreColor = r.avgScore >= 80 ? '#059669' : r.avgScore >= 60 ? '#D97706' : '#DC2626';
                var medal = i === 0 ? '1' : i === 1 ? '2' : i === 2 ? '3' : String(i + 1);
                return React.createElement('tr', { key: r.unit.id },
                  React.createElement('td', { className: 'td-num' }, medal),
                  React.createElement('td', null, r.unit.short),
                  React.createElement('td', { className: 'td-result', style:{color:scoreColor} },
                    r.avgScore.toFixed(1) + '%'
                  ),
                  React.createElement('td', null,
                    React.createElement(ProgressBar, { value: parseFloat(r.passRate), target: 100, showLabel: true })
                  )
                );
              })
            )
          )
        )
      )
    ),

    /* ── Department Performance ── */
    React.createElement('div', { className: 'card' },
      React.createElement(SectionHeader, {
        title: 'ผลงานรายกลุ่มงาน (PM)',
        sub: 'อัตราผ่านเกณฑ์แยกตามกลุ่มงานที่รับผิดชอบ'
      }),
      React.createElement(HBarChart, {
        items: pmSummary.filter(function(p) { return p.total >= 2; }).map(function(p) {
          var rate = (p.passed + p.failed) > 0 ? (p.passed / (p.passed + p.failed)) * 100 : 0;
          return {
            label: p.name.length > 28 ? p.name.substring(0, 28) + '...' : p.name,
            value: Math.round(rate * 10) / 10,
            target: 80
          };
        }),
        maxVal: 100
      })
    )
  );
}

Object.assign(window, { DashboardPage });
