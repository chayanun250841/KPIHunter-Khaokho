/* KPI HUNTER — Main App Shell */

function App() {
  const [page,        setPage]        = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dataVersion, setDataVersion] = useState(0);
  const [appReady,    setAppReady]    = useState(false);
  const [dbStatus,    setDbStatus]    = useState(''); // '' | 'supabase' | 'local'
  const D7 = window.KPIHUNTER;

  /* ── ฟัง event เมื่อข้อมูลเปลี่ยน ── */
  useEffect(function() {
    function onChanged() { setDataVersion(function(v) { return v + 1; }); }
    window.addEventListener('kpihunter-data-changed', onChanged);
    return function() { window.removeEventListener('kpihunter-data-changed', onChanged); };
  }, []);

  /* ── โหลดข้อมูลตอน startup: Supabase → localStorage → default ── */
  useEffect(function() {
    var db = window.KPIHUNTER_DB;
    if (db) {
      db.loadResults()
        .then(function(rows) {
          if (rows && rows.length > 0) {
            /* apply Supabase data */
            rows.forEach(function(r) {
              var k = D7.kpis.find(function(x) { return x.id === r.kpi_id; });
              if (!k) return;
              if (r.result !== null && r.result !== undefined) k.result = parseFloat(r.result);
              if (r.passfail !== undefined) k.passfail = r.passfail || '';
              k.risk = window._kpiRiskLevel ? window._kpiRiskLevel(k.result, k.targetNum, k.passfail) : k.risk;
              if (D7.trends[k.id]) D7.trends[k.id][5] = k.result;
            });
            D7.saveResults(); /* sync กลับ localStorage */
            setDbStatus('supabase');
          } else {
            /* ไม่มีข้อมูลใน Supabase → ใช้ localStorage */
            D7.loadSavedResults();
            setDbStatus('local');
          }
        })
        .catch(function() {
          /* Supabase error → fallback localStorage */
          D7.loadSavedResults();
          setDbStatus('local');
        })
        .finally(function() {
          setDataVersion(function(v) { return v + 1; });
          setAppReady(true);
        });
    } else {
      /* ไม่มี Supabase → localStorage */
      setDbStatus('local');
      setAppReady(true);
    }
  }, []);

  const summary = useMemo(() => D7.getSummary(), [dataVersion]);

  const navItems = [
    { id:'dashboard', label:'Dashboard',    d:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
    { id:'explorer',  label:'KPI Explorer', d:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id:'units',     label:'หน่วยบริการ',  d:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id:'ai',        label:'AI Insight',   d:'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id:'reports',   label:'รายงาน',       d:'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id:'upload',    label:'อัปโหลด',      d:'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
    { id:'admin',     label:'Admin',         d:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  function NavIcon({ d }) {
    return React.createElement('svg', {
      width:20, height:20, viewBox:'0 0 24 24', fill:'none',
      stroke:'currentColor', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round',
      style:{ flexShrink:0 }
    }, React.createElement('path', { d }));
  }

  function renderPage() {
    switch (page) {
      case 'dashboard': return React.createElement(DashboardPage, null);
      case 'explorer':  return React.createElement(ExplorerPage,  { onNavigate: setPage });
      case 'units':     return React.createElement(UnitPerformancePage, null);
      case 'ai':        return React.createElement(AIInsightPage, null);
      case 'reports':   return React.createElement(ReportBuilderPage, null);
      case 'upload':    return React.createElement(UploadPage, { onComplete: setPage });
      case 'admin':     return React.createElement(AdminPage, null);
      default:          return React.createElement(DashboardPage, null);
    }
  }

  const currentNav = navItems.find(n => n.id === page);

  /* ── Loading screen ── */
  if (!appReady) {
    return React.createElement('div', {
      style: {
        height:'100vh', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        background:'var(--color-bg-base)', gap:16
      }
    },
      React.createElement('div', {
        style: {
          width:48, height:48,
          border:'4px solid var(--color-herb-100)',
          borderTopColor:'var(--color-herb-600)',
          borderRadius:'50%', animation:'spin 0.9s linear infinite'
        }
      }),
      React.createElement('div', { style:{fontWeight:700, fontSize:'var(--text-base)', color:'var(--color-herb-700)'} }, 'KPI HUNTER'),
      React.createElement('div', { style:{fontSize:'var(--text-sm)', color:'var(--color-text-muted)'} },
        window.KPIHUNTER_DB ? 'กำลังโหลดข้อมูลจาก Supabase...' : 'กำลังเตรียมระบบ...'
      )
    );
  }

  return React.createElement('div', { className:'app-shell' },

    /* ── Sidebar ── */
    React.createElement('aside', { className:'sidebar' + (sidebarOpen ? '' : ' collapsed') },

      React.createElement('div', { className:'sidebar-header' },
        React.createElement('div', { className:'sidebar-logo' },
          React.createElement('div', { className:'logo-mark' }, 'K'),
          sidebarOpen && React.createElement('div', { className:'logo-text' },
            React.createElement('div', { className:'logo-title' }, 'KPI HUNTER'),
            React.createElement('div', { className:'logo-sub' }, 'Command Center')
          )
        )
      ),

      React.createElement('nav', { className:'sidebar-nav' },
        navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            className: 'nav-item' + (page === item.id ? ' active' : ''),
            onClick: () => setPage(item.id),
            title: item.label
          },
            React.createElement(NavIcon, { d: item.d }),
            sidebarOpen && React.createElement('span', null, item.label)
          )
        )
      ),

      React.createElement('div', { className:'sidebar-footer' },
        sidebarOpen && React.createElement('div', null,
          React.createElement('div', { className:'sf-district' }, 'สสอ.เขาค้อ'),
          React.createElement('div', { className:'sf-year' }, 'ปีงบประมาณ ' + D7.meta.year)
        )
      )
    ),

    /* ── Main Area ── */
    React.createElement('div', { className:'main-area' },

      /* Top Bar */
      React.createElement('header', { className:'topbar' },
        React.createElement('div', { className:'topbar-left' },
          React.createElement('button', {
            className:'menu-btn',
            onClick: () => setSidebarOpen(!sidebarOpen),
            title: 'เปิด/ปิดเมนู'
          },
            React.createElement('svg', { width:20, height:20, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round' },
              React.createElement('path', { d:'M4 6h16M4 12h16M4 18h16' })
            )
          ),
          React.createElement('div', { className:'topbar-title' },
            React.createElement('h1', null, currentNav ? currentNav.label : 'Dashboard'),
            React.createElement('div', { style:{display:'flex', alignItems:'center', gap:8, marginTop:2} },
              React.createElement('span', { className:'topbar-breadcrumb' },
                'เขาค้อ · ปีงบ ' + D7.meta.year + ' · ' + D7.meta.month
              ),
              dbStatus === 'supabase' && React.createElement('span', {
                style:{
                  fontSize:10, fontWeight:700, padding:'1px 7px',
                  borderRadius:999, background:'#ECFDF5', color:'#059669',
                  border:'1px solid #A7F3D0', letterSpacing:'0.03em'
                }
              }, '● Supabase'),
              dbStatus === 'local' && React.createElement('span', {
                style:{
                  fontSize:10, fontWeight:700, padding:'1px 7px',
                  borderRadius:999, background:'#F9FAFB', color:'#9CA3AF',
                  border:'1px solid #E5E7EB', letterSpacing:'0.03em'
                }
              }, '○ Local')
            )
          )
        ),

        React.createElement('div', { className:'topbar-right' },
          React.createElement('div', { className:'topbar-kpi-stat' },
            React.createElement('span', { className:'ts-label' }, 'อัตราผ่าน'),
            React.createElement('span', { className:'ts-value', style:{color:'#059669'} }, summary.passRate + '%')
          ),
          React.createElement('div', { className:'topbar-kpi-stat' },
            React.createElement('span', { className:'ts-label' }, 'ไม่ผ่าน'),
            React.createElement('span', { className:'ts-value', style:{color:'#DC2626'} }, summary.failed)
          ),
          React.createElement('div', { className:'topbar-divider' }),
          React.createElement('button', {
            className:'btn-topbar',
            onClick: () => setPage('upload')
          },
            React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round' },
              React.createElement('path', { d:'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' })
            ),
            'อัปโหลด'
          ),
          React.createElement('button', {
            className:'btn-topbar ai-btn',
            onClick: () => setPage('ai')
          },
            React.createElement('svg', { width:14, height:14, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:2, strokeLinecap:'round' },
              React.createElement('path', { d:'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' })
            ),
            'AI วิเคราะห์'
          )
        )
      ),

      /* Page */
      React.createElement('main', { className:'main-content' },
        React.createElement(React.Fragment, { key: dataVersion },
          renderPage()
        )
      )
    )
  );
}

const appRoot = ReactDOM.createRoot(document.getElementById('root'));
appRoot.render(React.createElement(App));
