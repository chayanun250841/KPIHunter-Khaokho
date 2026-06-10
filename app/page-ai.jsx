/* KPI HUNTER — AI Insight Center (no emoji) */

/* Insight icon paths */
var AI_ICONS = {
  summary: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  risk:    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  root:    'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  action:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
};

var QQ_ICONS = {
  summary: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  risk:    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  unit:    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  action:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
};

function AIInsightPage() {
  const D5 = window.KPIHUNTER;
  const summary    = useMemo(() => D5.getSummary(), []);
  const failed     = useMemo(() => D5.kpis.filter(k => k.passfail.indexOf('ไม่ผ่าน') >= 0).sort((a, b) => a.result - b.result), []);
  const critical   = useMemo(() => D5.kpis.filter(k => k.risk === 'critical' || k.risk === 'high'), []);
  const unitRank   = useMemo(() => D5.getUnitRankings(), []);
  const worstUnits = useMemo(() => unitRank.slice().sort((a, b) => a.avgScore - b.avgScore).slice(0, 3), []);
  const [activePanel, setActivePanel] = useState('summary');

  function InsightCard({ id, iconPath, title, accentColor, children }) {
    const isActive = activePanel === id;
    return React.createElement('div', {
      className: 'insight-card' + (isActive ? ' active' : ''),
      style: { borderLeftColor: accentColor || 'var(--color-herb-600)' }
    },
      React.createElement('div', { className: 'insight-header', onClick: () => setActivePanel(isActive ? '' : id) },
        React.createElement('div', { className: 'insight-icon', style: { color: accentColor || 'var(--color-herb-600)' } },
          React.createElement(Icon, { path: iconPath, size: 20 })
        ),
        React.createElement('span', { className: 'insight-title' }, title),
        React.createElement('span', { className: 'insight-toggle' },
          React.createElement(Icon, { path: isActive ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7', size: 14 })
        )
      ),
      isActive && React.createElement('div', { className: 'insight-body' }, children)
    );
  }

  const execSummaryText = [
    `จากการประเมินตัวชี้วัด ${summary.total} ตัว ของอำเภอเขาค้อ ปีงบประมาณ 2569 (ข้อมูล ณ เดือนมีนาคม) พบว่า ผ่านเกณฑ์ ${summary.passed} ตัว คิดเป็นอัตราผ่าน ${summary.passRate}% และไม่ผ่านเกณฑ์ ${summary.failed} ตัว`,
    `ตัวชี้วัดที่ผลงานต่ำที่สุด ได้แก่ ${failed.slice(0, 3).map(k => '"' + k.name.substring(0, 38) + '"').join(', ')}`,
    `หน่วยบริการที่ต้องเร่งรัดมากที่สุด ได้แก่ ${worstUnits.map(u => u.unit.short + ' (คะแนนเฉลี่ย ' + u.avgScore.toFixed(1) + '%)').join(', ')}`
  ];

  const actionItems = failed.slice(0, 8).map(k => {
    let action = k.result === 0
      ? 'ตรวจสอบการบันทึกข้อมูลในระบบ HDC และประสานหน่วยบริการที่เกี่ยวข้อง'
      : k.targetNum && k.result < k.targetNum * 0.3
        ? 'จัดประชุมเร่งรัดเฉพาะเรื่อง กำหนดแผนปฏิบัติการระยะ 30 วัน'
        : k.targetNum && k.result < k.targetNum * 0.7
          ? 'ติดตามผลรายสัปดาห์ ให้หน่วยบริการรายงานความก้าวหน้า'
          : 'เพิ่มความเข้มข้นดำเนินงาน ติดตามผลรายเดือน';
    return { kpi: k.name, num: k.num, result: k.result, target: k.target, action };
  });

  const quickQuestions = [
    { id: 'summary', iconPath: QQ_ICONS.summary, text: 'สรุปภาพรวม' },
    { id: 'risk',    iconPath: QQ_ICONS.risk,    text: 'KPI ที่เสี่ยง' },
    { id: 'root',    iconPath: QQ_ICONS.unit,    text: 'หน่วยน่ากังวล' },
    { id: 'action',  iconPath: QQ_ICONS.action,  text: 'Action Plan' },
  ];

  return React.createElement('div', { className: 'page-content' },
    React.createElement(SectionHeader, {
      title: 'AI Insight Center',
      sub: 'วิเคราะห์อัตโนมัติจากข้อมูล KPI อำเภอเขาค้อ'
    }),

    /* Disclaimer */
    React.createElement('div', { className: 'ai-disclaimer' },
      React.createElement(Icon, { path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', size: 16 }),
      React.createElement('span', null,
        'ผลวิเคราะห์จาก AI เป็นข้อเสนอเบื้องต้น ',
        React.createElement('strong', null, 'ควรตรวจสอบกับข้อมูลจริงและบริบทพื้นที่ก่อนนำไปใช้')
      )
    ),

    /* Quick questions */
    React.createElement('div', { className: 'quick-questions' },
      quickQuestions.map(q =>
        React.createElement('button', {
          key: q.id,
          className: 'qq-btn' + (activePanel === q.id ? ' active' : ''),
          onClick: () => setActivePanel(q.id)
        },
          React.createElement(Icon, { path: q.iconPath, size: 15 }),
          q.text
        )
      )
    ),

    /* 1 — Executive Summary */
    React.createElement(InsightCard, {
      id: 'summary', iconPath: AI_ICONS.summary,
      title: 'Executive Summary — สรุปภาพรวมผลงาน', accentColor: '#2D6A4F'
    },
      React.createElement('div', { className: 'insight-text' },
        execSummaryText.map((t, i) => React.createElement('p', { key: i }, t))
      ),
      React.createElement('div', { className: 'insight-stats' },
        React.createElement('div', { className: 'is-item green' },
          React.createElement('div', { className: 'is-num' }, summary.passed),
          React.createElement('div', { className: 'is-label' }, 'ผ่านเกณฑ์')
        ),
        React.createElement('div', { className: 'is-item red' },
          React.createElement('div', { className: 'is-num' }, summary.failed),
          React.createElement('div', { className: 'is-label' }, 'ไม่ผ่านเกณฑ์')
        ),
        React.createElement('div', { className: 'is-item amber' },
          React.createElement('div', { className: 'is-num' }, summary.critical + summary.highRisk),
          React.createElement('div', { className: 'is-label' }, 'เสี่ยงสูง')
        ),
        React.createElement('div', { className: 'is-item blue' },
          React.createElement('div', { className: 'is-num' }, summary.passRate + '%'),
          React.createElement('div', { className: 'is-label' }, 'อัตราผ่าน')
        )
      )
    ),

    /* 2 — Risk Alert */
    React.createElement(InsightCard, {
      id: 'risk', iconPath: AI_ICONS.risk,
      title: 'Risk Alert — ตัวชี้วัดที่มีความเสี่ยงสูง', accentColor: '#DC2626'
    },
      critical.length === 0
        ? React.createElement('p', { className: 'insight-text' }, 'ไม่พบตัวชี้วัดที่มีความเสี่ยงสูง')
        : React.createElement('div', { className: 'risk-list' },
            critical.slice(0, 8).map((k, i) =>
              React.createElement('div', { key: i, className: 'risk-item' },
                React.createElement('div', { className: 'risk-item-header' },
                  React.createElement(RiskBadge, { risk: k.risk }),
                  React.createElement('span', { className: 'risk-item-name' },
                    k.name.length > 55 ? k.name.substring(0, 55) + '…' : k.name
                  )
                ),
                React.createElement('div', { className: 'risk-item-detail' },
                  'ผลงาน: ',
                  React.createElement('strong', { style:{color:'#DC2626'} },
                    typeof k.result === 'number' ? k.result.toFixed(1) + '%' : '—'
                  ),
                  ' · เป้าหมาย: ' + (k.target || '—')
                ),
                React.createElement('div', { className: 'risk-item-reason' },
                  k.result === 0
                    ? 'ยังไม่มีผลงาน หรือข้อมูลยังไม่ได้บันทึกในระบบ'
                    : k.targetNum && k.result < k.targetNum * 0.5
                      ? 'ผลงานต่ำกว่าเป้าหมายมากกว่า 50% — ต้องเร่งรัดเร่งด่วน'
                      : 'ผลงานต่ำกว่าเป้าหมายอย่างมีนัยสำคัญ'
                )
              )
            )
          )
    ),

    /* 3 — Root Cause */
    React.createElement(InsightCard, {
      id: 'root', iconPath: AI_ICONS.root,
      title: 'Root Cause Hypothesis — สาเหตุที่เป็นไปได้', accentColor: '#D97706'
    },
      React.createElement('div', { className: 'insight-text' },
        React.createElement('p', null, React.createElement('strong', null, 'หน่วยบริการที่ต้องติดตามเร่งด่วน:')),
        React.createElement('ul', { className: 'insight-list' },
          worstUnits.map((u, i) =>
            React.createElement('li', { key: i },
              React.createElement('strong', null, u.unit.name),
              ' — คะแนนเฉลี่ย ', u.avgScore.toFixed(1), '% · ไม่ผ่าน ', u.failedKPIs, ' ตัวชี้วัด'
            )
          )
        ),
        React.createElement('p', null, React.createElement('strong', null, 'สาเหตุที่เป็นไปได้:')),
        React.createElement('ul', { className: 'insight-list' },
          React.createElement('li', null, 'การบันทึกข้อมูลใน HDC ไม่ครบถ้วน ทำให้ตัวเลขต่ำกว่าความเป็นจริง'),
          React.createElement('li', null, 'ตัวชี้วัดบางตัวเพิ่งเริ่มดำเนินการ ผลงานยังสะสมไม่มาก เช่น Smart Hospital, Telemedicine'),
          React.createElement('li', null, 'หน่วยบริการในพื้นที่ห่างไกลมีข้อจำกัดด้านบุคลากรและอุปกรณ์'),
          React.createElement('li', null, 'ตัวชี้วัดที่ต้องอาศัยความร่วมมือหลายหน่วยงาน เช่น D-RTI, ไซเบอร์')
        )
      )
    ),

    /* 4 — Action Plan */
    React.createElement(InsightCard, {
      id: 'action', iconPath: AI_ICONS.action,
      title: 'Recommended Action Plan — แผนปฏิบัติการแนะนำ', accentColor: '#2563EB'
    },
      React.createElement('div', { className: 'action-list' },
        actionItems.map((a, i) =>
          React.createElement('div', { key: i, className: 'action-item' },
            React.createElement('div', { className: 'action-num' }, i + 1),
            React.createElement('div', { className: 'action-body' },
              React.createElement('div', { className: 'action-kpi' },
                a.num + '. ' + (a.kpi.length > 58 ? a.kpi.substring(0, 58) + '…' : a.kpi)
              ),
              React.createElement('div', { className: 'action-detail' },
                'ผลงาน: ',
                React.createElement('strong', { style:{color:'#DC2626'} },
                  typeof a.result === 'number' ? a.result.toFixed(1) + '%' : '—'
                ),
                ' · เป้าหมาย: ' + (a.target || '—')
              ),
              React.createElement('div', { className: 'action-plan' }, a.action)
            )
          )
        )
      ),
      React.createElement('div', { className: 'meeting-summary' },
        React.createElement('h4', null, 'ข้อความสรุปสำหรับรายงานประชุม'),
        React.createElement('div', { className: 'meeting-text' },
          `ผลการประเมิน KPI อำเภอเขาค้อ ปีงบประมาณ 2569 (ณ เดือน มี.ค.) จากตัวชี้วัดทั้งหมด ${summary.total} ตัว ประเมินแล้ว ${summary.evaluated} ตัว ผ่านเกณฑ์ ${summary.passed} ตัว (${summary.passRate}%) ไม่ผ่านเกณฑ์ ${summary.failed} ตัว พบตัวชี้วัดเสี่ยงสูง ${summary.critical + summary.highRisk} ตัว ควรเร่งรัดดำเนินการ`
        ),
        React.createElement('button', {
          className: 'copy-btn',
          onClick: () => {
            const txt = `ผลการประเมิน KPI อำเภอเขาค้อ ปีงบ 2569 (มี.ค.)\nผ่าน ${summary.passed}/${summary.evaluated} ตัว (${summary.passRate}%)\nไม่ผ่าน ${summary.failed} ตัว · เสี่ยงสูง ${summary.critical + summary.highRisk} ตัว`;
            navigator.clipboard.writeText(txt).catch(() => {});
          }
        }, 'คัดลอกข้อความ')
      )
    )
  );
}

Object.assign(window, { AIInsightPage });
