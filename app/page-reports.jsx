/* KPI HUNTER — Report Builder (no emoji) */

var RPT_ICONS = {
  exec:   'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  failed: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  unit:   'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  action: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  trend:  'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
};

function ReportBuilderPage() {
  const D6 = window.KPIHUNTER;
  const summary  = useMemo(() => D6.getSummary(), []);
  const failed   = useMemo(() => D6.kpis.filter(k => k.passfail.indexOf('ไม่ผ่าน') >= 0).sort((a, b) => a.result - b.result), []);
  const [selectedReport, setSelectedReport] = useState(null);

  const reportTypes = [
    { id:'exec',   iconPath:RPT_ICONS.exec,   color:'#2D6A4F', title:'รายงานภาพรวมผู้บริหาร',     desc:'สรุป KPI ผ่าน/ไม่ผ่าน อัตราผ่าน ตัวชี้วัดเสี่ยง' },
    { id:'failed', iconPath:RPT_ICONS.failed, color:'#DC2626', title:'รายงาน KPI ไม่ผ่านเกณฑ์',  desc:'รายละเอียดทุกตัวที่ไม่ผ่าน พร้อมข้อเสนอแนะ' },
    { id:'unit',   iconPath:RPT_ICONS.unit,   color:'#2563EB', title:'รายงานรายหน่วยบริการ',      desc:'ผลงานแต่ละหน่วย อันดับ จุดแข็ง จุดอ่อน' },
    { id:'action', iconPath:RPT_ICONS.action, color:'#D97706', title:'รายงาน Action Plan',         desc:'แผนปฏิบัติการเร่งรัดรายตัวชี้วัด' },
    { id:'trend',  iconPath:RPT_ICONS.trend,  color:'#7C3AED', title:'รายงานเปรียบเทียบรายเดือน', desc:'แนวโน้ม 6 เดือน แยกรายตัวชี้วัด' },
  ];

  function renderReport(type) {
    if (type === 'exec') {
      return React.createElement('div', null,
        React.createElement('div', { className:'report-header' },
          React.createElement('h2', null, 'รายงานภาพรวม KPI — อำเภอเขาค้อ'),
          React.createElement('p', null, 'ปีงบประมาณ 2569 · ข้อมูล ณ เดือนมีนาคม · ข้อมูลตัวอย่าง (Mock Data)')
        ),
        React.createElement('div', { className:'report-stats' },
          [
            { n:summary.total,    l:'KPI ทั้งหมด',    cls:'' },
            { n:summary.passed,   l:'ผ่านเกณฑ์',      cls:'green' },
            { n:summary.failed,   l:'ไม่ผ่านเกณฑ์',  cls:'red' },
            { n:summary.passRate+'%', l:'อัตราผ่าน', cls:'' }
          ].map(s => React.createElement('div', { key:s.l },
            React.createElement('div', { className:'rs-num ' + s.cls }, s.n),
            React.createElement('div', { className:'rs-label' }, s.l)
          ))
        ),
        React.createElement('div', { className:'report-section-title' }, 'ตัวชี้วัดที่ไม่ผ่านเกณฑ์ (เรียงตามผลงานต่ำสุด)'),
        React.createElement('table', { className:'data-table compact' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, '#'),
              React.createElement('th', null, 'ตัวชี้วัด'),
              React.createElement('th', null, 'เป้าหมาย'),
              React.createElement('th', { style:{textAlign:'right'} }, 'ผลงาน'),
              React.createElement('th', null, 'ความเสี่ยง')
            )
          ),
          React.createElement('tbody', null,
            failed.slice(0, 15).map((k, i) =>
              React.createElement('tr', { key:k.id },
                React.createElement('td', { className:'td-num' }, i + 1),
                React.createElement('td', null, k.name.length > 50 ? k.name.substring(0,50)+'…' : k.name),
                React.createElement('td', { className:'td-target' }, k.target || '—'),
                React.createElement('td', { className:'td-result red' }, typeof k.result==='number' ? k.result.toFixed(1)+'%' : '—'),
                React.createElement('td', null, React.createElement(RiskBadge, { risk:k.risk }))
              )
            )
          )
        )
      );
    }

    if (type === 'unit') {
      const rankings = D6.getUnitRankings();
      return React.createElement('div', null,
        React.createElement('div', { className:'report-header' },
          React.createElement('h2', null, 'รายงานผลงานรายหน่วยบริการ'),
          React.createElement('p', null, 'อำเภอเขาค้อ · ปีงบประมาณ 2569 · ข้อมูลตัวอย่าง (Mock Data)')
        ),
        React.createElement('table', { className:'data-table' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, '#'),
              React.createElement('th', null, 'หน่วยบริการ'),
              React.createElement('th', { style:{textAlign:'right'} }, 'คะแนนเฉลี่ย'),
              React.createElement('th', { style:{textAlign:'right'} }, 'ผ่าน'),
              React.createElement('th', { style:{textAlign:'right'} }, 'ไม่ผ่าน'),
              React.createElement('th', null, 'อัตราผ่าน')
            )
          ),
          React.createElement('tbody', null,
            rankings.map((r, i) =>
              React.createElement('tr', { key:r.unit.id },
                React.createElement('td', { className:'td-num' }, i + 1),
                React.createElement('td', null, r.unit.name),
                React.createElement('td', { style:{textAlign:'right',fontWeight:700} }, r.avgScore.toFixed(1) + '%'),
                React.createElement('td', { style:{textAlign:'right',color:'#059669',fontWeight:700} }, r.passedKPIs),
                React.createElement('td', { style:{textAlign:'right',color:'#DC2626',fontWeight:700} }, r.failedKPIs),
                React.createElement('td', null,
                  React.createElement(ProgressBar, { value: parseFloat(r.passRate), target:100, showLabel:true })
                )
              )
            )
          )
        )
      );
    }

    if (type === 'action') {
      return React.createElement('div', null,
        React.createElement('div', { className:'report-header' },
          React.createElement('h2', null, 'Action Plan — แผนเร่งรัด KPI ไม่ผ่านเกณฑ์'),
          React.createElement('p', null, 'ปีงบประมาณ 2569 · ' + failed.length + ' ตัวชี้วัด · ข้อมูลตัวอย่าง (Mock Data)')
        ),
        failed.slice(0, 12).map((k, i) => {
          const action = k.result === 0
            ? 'ตรวจสอบการบันทึกข้อมูลในระบบ HDC'
            : k.targetNum && k.result < k.targetNum * 0.5
              ? 'จัดประชุมเร่งรัดเฉพาะเรื่อง 30 วัน'
              : 'เพิ่มความเข้มข้น ติดตามรายสัปดาห์';
          return React.createElement('div', { key:k.id, className:'action-report-item' },
            React.createElement('div', { className:'ari-num' }, i + 1),
            React.createElement('div', null,
              React.createElement('div', { className:'ari-name' }, k.num + '. ' + k.name),
              React.createElement('div', { className:'ari-meta' },
                'ผลงาน: ', React.createElement('strong', { style:{color:'#DC2626'} }, typeof k.result==='number' ? k.result.toFixed(1)+'%' : '—'),
                ' · เป้าหมาย: ' + (k.target || '—')
              ),
              React.createElement('div', { className:'ari-action' }, action)
            )
          );
        })
      );
    }

    if (type === 'failed') {
      return React.createElement('div', null,
        React.createElement('div', { className:'report-header' },
          React.createElement('h2', null, 'รายงาน KPI ไม่ผ่านเกณฑ์ทั้งหมด'),
          React.createElement('p', null, 'อำเภอเขาค้อ · ปีงบ 2569 · ' + failed.length + ' รายการ · ข้อมูลตัวอย่าง')
        ),
        React.createElement('table', { className:'data-table compact' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, '#'),
              React.createElement('th', null, 'ตัวชี้วัด'),
              React.createElement('th', null, 'กลุ่มงาน'),
              React.createElement('th', { style:{textAlign:'right'} }, 'ผลงาน'),
              React.createElement('th', null, 'เป้าหมาย'),
              React.createElement('th', null, 'ความเสี่ยง')
            )
          ),
          React.createElement('tbody', null,
            failed.map((k, i) =>
              React.createElement('tr', { key:k.id },
                React.createElement('td', { className:'td-num' }, i + 1),
                React.createElement('td', { style:{maxWidth:200} }, k.name.length>48 ? k.name.substring(0,48)+'…' : k.name),
                React.createElement('td', { className:'td-target' }, k.pm || '—'),
                React.createElement('td', { className:'td-result red' }, typeof k.result==='number' ? k.result.toFixed(1)+'%' : '—'),
                React.createElement('td', { className:'td-target' }, k.target || '—'),
                React.createElement('td', null, React.createElement(RiskBadge, { risk:k.risk }))
              )
            )
          )
        )
      );
    }

    return React.createElement('div', { className:'report-header' },
      React.createElement('h2', null, 'รายงานเปรียบเทียบรายเดือน'),
      React.createElement('p', null, 'ฟีเจอร์นี้จะพร้อมใช้งานเมื่อมีข้อมูลหลายเดือน')
    );
  }

  return React.createElement('div', { className:'page-content' },
    React.createElement(SectionHeader, {
      title: 'Report Builder',
      sub: 'สร้างรายงานสำหรับประชุมและติดตามงาน'
    }),
    React.createElement('div', { className:'report-layout' },

      /* Report type list */
      React.createElement('div', { className:'report-types' },
        reportTypes.map(rt =>
          React.createElement('div', {
            key: rt.id,
            className: 'report-type-card' + (selectedReport === rt.id ? ' active' : ''),
            onClick: () => setSelectedReport(rt.id)
          },
            React.createElement('div', { className:'rtc-icon', style:{color: rt.color} },
              React.createElement(Icon, { path:rt.iconPath, size:20 })
            ),
            React.createElement('div', null,
              React.createElement('div', { className:'rtc-title' }, rt.title),
              React.createElement('div', { className:'rtc-desc' }, rt.desc)
            )
          )
        )
      ),

      /* Preview pane */
      React.createElement('div', { className:'report-preview card' },
        selectedReport
          ? React.createElement('div', null,
              React.createElement('div', { className:'report-toolbar' },
                React.createElement('span', { className:'report-toolbar-title' },
                  reportTypes.find(r => r.id === selectedReport)?.title || 'รายงาน'
                ),
                React.createElement('button', {
                  className:'btn-secondary btn-sm',
                  onClick: () => window.print()
                },
                  React.createElement(Icon, { path:'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z', size:14 }),
                  'พิมพ์'
                ),
                React.createElement('button', {
                  className:'btn-secondary btn-sm',
                  onClick: () => {
                    const el = document.querySelector('.report-preview');
                    if (el) navigator.clipboard.writeText(el.innerText).catch(() => {});
                  }
                },
                  React.createElement(Icon, { path:'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z', size:14 }),
                  'คัดลอก'
                )
              ),
              renderReport(selectedReport)
            )
          : React.createElement(EmptyState, {
              title: 'เลือกประเภทรายงาน',
              sub: 'คลิกรายงานทางซ้ายเพื่อดูตัวอย่างและส่งออก'
            })
      )
    )
  );
}

Object.assign(window, { ReportBuilderPage });
