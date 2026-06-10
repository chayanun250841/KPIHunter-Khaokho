/* KPI HUNTER — Admin Page with Login */

const ADMIN_CREDS = { user: 'chayanun250841', pass: 'chayanun250841' };
const SESSION_KEY = 'kpihunter_admin_auth';

function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [activeTab, setActiveTab] = useState('system');
  const D = window.KPIHUNTER;

  /* ── Settings state (local mock) ── */
  const [year, setYear] = useState(D.meta.year.toString());
  const [month, setMonth] = useState(D.meta.month);
  const [district, setDistrict] = useState('เขาค้อ');
  const [province, setProvince] = useState('เพชรบูรณ์');
  const [passThreshold, setPassThreshold] = useState('80');
  const [warnThreshold, setWarnThreshold] = useState('60');
  const [units, setUnits] = useState(D.units.map(u => ({ ...u })));
  const [editUnit, setEditUnit] = useState(null);
  const [saveMsg, setSaveMsg] = useState('');
  const [colMapping, setColMapping] = useState({
    num: 'คอลัมน์ A (ลำดับ)',
    name: 'คอลัมน์ B (ตัวชี้วัด)',
    target: 'คอลัมน์ C (เป้าหมาย)',
    pm: 'คอลัมน์ D (กลุ่มงาน PM)',
    result: 'คอลัมน์ O (ผลงานเขาค้อ)',
    status: 'คอลัมน์ AW (สถานะประเมิน)',
  });

  /* ── Login handler ── */
  function handleLogin(e) {
    e.preventDefault();
    if (username === ADMIN_CREDS.user && password === ADMIN_CREDS.pass) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
      setLoginError('');
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setUsername('');
    setPassword('');
  }

  function showSaved() {
    setSaveMsg('บันทึกสำเร็จ');
    setTimeout(() => setSaveMsg(''), 2500);
  }

  /* ── SVG Icon helper ── */
  function Icon({ d, size }) {
    return React.createElement('svg', { width: size||16, height: size||16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round' },
      React.createElement('path', { d })
    );
  }

  /* ══ LOGIN SCREEN ══ */
  if (!authed) {
    return React.createElement('div', { className:'admin-login-wrap' },
      React.createElement('div', { className:'admin-login-card' },
        /* Logo */
        React.createElement('div', { className:'alc-logo' },
          React.createElement('div', { className:'alc-mark' }, 'K'),
          React.createElement('div', null,
            React.createElement('div', { className:'alc-title' }, 'KPI HUNTER'),
            React.createElement('div', { className:'alc-sub' }, 'Admin Panel')
          )
        ),

        React.createElement('h2', { className:'alc-heading' }, 'เข้าสู่ระบบผู้ดูแล'),
        React.createElement('p', { className:'alc-desc' }, 'สำหรับเจ้าหน้าที่ที่ได้รับสิทธิ์เท่านั้น'),

        React.createElement('form', { className:'alc-form', onSubmit: handleLogin },
          React.createElement('div', { className:'alc-field' },
            React.createElement('label', null, 'ชื่อผู้ใช้'),
            React.createElement('div', { className:'alc-input-wrap' },
              React.createElement('span', { className:'alc-input-icon' },
                React.createElement(Icon, { d:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
              ),
              React.createElement('input', {
                type:'text', className:'alc-input', placeholder:'ชื่อผู้ใช้',
                value: username, onChange: e => setUsername(e.target.value),
                autoComplete:'username', autoFocus: true
              })
            )
          ),
          React.createElement('div', { className:'alc-field' },
            React.createElement('label', null, 'รหัสผ่าน'),
            React.createElement('div', { className:'alc-input-wrap' },
              React.createElement('span', { className:'alc-input-icon' },
                React.createElement(Icon, { d:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
              ),
              React.createElement('input', {
                type: showPass ? 'text' : 'password',
                className:'alc-input', placeholder:'รหัสผ่าน',
                value: password, onChange: e => setPassword(e.target.value),
                autoComplete:'current-password'
              }),
              React.createElement('button', {
                type:'button', className:'alc-eye-btn',
                onClick: () => setShowPass(!showPass), tabIndex:-1
              },
                React.createElement(Icon, { d: showPass
                  ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                  : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                })
              )
            )
          ),
          loginError && React.createElement('div', { className:'alc-error' },
            React.createElement(Icon, { d:'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }),
            loginError
          ),
          React.createElement('button', { type:'submit', className:'alc-submit' }, 'เข้าสู่ระบบ')
        )
      )
    );
  }

  /* ══ ADMIN PANEL ══ */
  const tabs = [
    { id:'system',   label:'ตั้งค่าระบบ',     d:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id:'units',    label:'หน่วยบริการ',       d:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id:'threshold',label:'เกณฑ์ผ่าน/ไม่ผ่าน',  d:'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
    { id:'mapping',  label:'Column Mapping',     d:'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id:'users',    label:'ผู้ใช้งาน',           d:'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  return React.createElement('div', { className:'admin-shell' },

    /* ── Admin Header ── */
    React.createElement('div', { className:'admin-header' },
      React.createElement('div', { className:'admin-header-left' },
        React.createElement('div', { className:'admin-badge' },
          React.createElement(Icon, { d:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', size:16 }),
          'Admin Panel'
        ),
        React.createElement('span', { className:'admin-header-title' }, 'การตั้งค่าและจัดการระบบ')
      ),
      React.createElement('div', { className:'admin-header-right' },
        React.createElement('div', { className:'admin-user-chip' },
          React.createElement('div', { className:'auc-avatar' }, 'C'),
          React.createElement('div', null,
            React.createElement('div', { className:'auc-name' }, username || ADMIN_CREDS.user),
            React.createElement('div', { className:'auc-role' }, 'ผู้ดูแลระบบ')
          )
        ),
        React.createElement('button', { className:'admin-logout-btn', onClick: handleLogout },
          React.createElement(Icon, { d:'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' }),
          'ออกจากระบบ'
        )
      )
    ),

    /* ── Tab Bar ── */
    React.createElement('div', { className:'admin-tabs' },
      tabs.map(t =>
        React.createElement('button', {
          key: t.id,
          className: 'admin-tab' + (activeTab === t.id ? ' active' : ''),
          onClick: () => setActiveTab(t.id)
        },
          React.createElement(Icon, { d: t.d }),
          t.label
        )
      )
    ),

    /* ── Tab Content ── */
    React.createElement('div', { className:'admin-body' },

      /* ─ System Settings ─ */
      activeTab === 'system' && React.createElement('div', { className:'admin-section' },
        React.createElement('h3', { className:'admin-section-title' }, 'ข้อมูลพื้นที่และปีงบประมาณ'),
        React.createElement('div', { className:'admin-form-grid' },
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'ปีงบประมาณ'),
            React.createElement('select', { className:'admin-select', value: year, onChange: e => setYear(e.target.value) },
              ['2567','2568','2569','2570'].map(y => React.createElement('option', { key:y, value:y }, y))
            )
          ),
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'เดือนรายงานปัจจุบัน'),
            React.createElement('select', { className:'admin-select', value: month, onChange: e => setMonth(e.target.value) },
              ['ตุลาคม','พฤศจิกายน','ธันวาคม','มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน'].map(m =>
                React.createElement('option', { key:m, value:m }, m)
              )
            )
          ),
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'อำเภอ'),
            React.createElement('input', { className:'admin-input', value: district, onChange: e => setDistrict(e.target.value) })
          ),
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'จังหวัด'),
            React.createElement('input', { className:'admin-input', value: province, onChange: e => setProvince(e.target.value) })
          )
        ),

        React.createElement('h3', { className:'admin-section-title', style:{marginTop:'var(--space-6)'} }, 'ข้อมูลระบบ'),
        React.createElement('div', { className:'admin-info-grid' },
          [
            { label:'เวอร์ชัน', value:'1.0.0' },
            { label:'ผู้พัฒนา', value:'KPI HUNTER Team' },
            { label:'ข้อมูลล่าสุด', value:'10 มิ.ย. 2569' },
            { label:'จำนวน KPI', value: D.kpis.length + ' ตัวชี้วัด' },
            { label:'จำนวนหน่วยบริการ', value: D.units.length + ' หน่วย' },
            { label:'สถานะระบบ', value:'ปกติ' },
          ].map(item =>
            React.createElement('div', { key:item.label, className:'admin-info-item' },
              React.createElement('div', { className:'aii-label' }, item.label),
              React.createElement('div', { className:'aii-value' }, item.value)
            )
          )
        ),

        React.createElement('h3', { className:'admin-section-title', style:{marginTop:'var(--space-6)', color:'#DC2626'} }, 'โซนอันตราย'),
        React.createElement('div', { style:{background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8, padding:16, marginBottom:16} },
          React.createElement('div', { style:{fontWeight:600, marginBottom:4, color:'#991B1B'} }, 'ล้างข้อมูลผลงาน KPI ทั้งหมด'),
          React.createElement('div', { style:{fontSize:'var(--text-sm)', color:'#7F1D1D', marginBottom:12} },
            'ลบข้อมูลผลงานที่บันทึกไว้ทั้งหมดออกจากเบราว์เซอร์ รวมถึงข้อมูล CSV ที่ import ไว้ — ไม่สามารถกู้คืนได้'
          ),
          React.createElement('button', {
            className:'admin-save-btn',
            style:{background:'#DC2626', borderColor:'#DC2626'},
            onClick: function() {
              if (window.confirm('ยืนยันการล้างข้อมูลทั้งหมด? ไม่สามารถกู้คืนได้')) {
                D.clearAllData();
                D.kpis.forEach(function(k) { k.result = 0; k.passfail = ''; k.risk = 'none'; });
                D.unitPerformance = {};
                D.unitQuarterlyData = {};
                window.dispatchEvent(new CustomEvent('kpihunter-data-changed'));
                setSaveMsg('ล้างข้อมูลเรียบร้อยแล้ว');
              }
            }
          },
            React.createElement(Icon, { d:'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', size:14 }),
            'ล้างข้อมูลทั้งหมด'
          )
        ),

        React.createElement('div', { className:'admin-action-row' },
          saveMsg && React.createElement('span', { className:'admin-save-msg' },
            React.createElement(Icon, { d:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }), saveMsg
          ),
          React.createElement('button', { className:'admin-save-btn', onClick: showSaved }, 'บันทึกการตั้งค่า')
        )
      ),

      /* ─ Units Management ─ */
      activeTab === 'units' && React.createElement('div', { className:'admin-section' },
        React.createElement('div', { className:'admin-section-header' },
          React.createElement('h3', { className:'admin-section-title' }, 'หน่วยบริการในอำเภอเขาค้อ (' + units.length + ' หน่วย)'),
          React.createElement('button', { className:'admin-add-btn', onClick: () => setEditUnit({ id:'', name:'', code:'', short:'', isNew:true }) },
            React.createElement(Icon, { d:'M12 4v16m8-8H4' }), 'เพิ่มหน่วยบริการ'
          )
        ),

        /* Edit form */
        editUnit && React.createElement('div', { className:'admin-edit-card' },
          React.createElement('h4', { className:'aec-title' }, editUnit.isNew ? 'เพิ่มหน่วยบริการใหม่' : 'แก้ไข: ' + editUnit.name),
          React.createElement('div', { className:'admin-form-grid' },
            React.createElement('div', { className:'admin-field' },
              React.createElement('label', { className:'admin-label' }, 'ชื่อเต็ม'),
              React.createElement('input', { className:'admin-input', placeholder:'เช่น รพ.สต.เสลียงแห้ง', value: editUnit.name, onChange: e => setEditUnit({...editUnit, name:e.target.value}) })
            ),
            React.createElement('div', { className:'admin-field' },
              React.createElement('label', { className:'admin-label' }, 'รหัสหน่วย'),
              React.createElement('input', { className:'admin-input', placeholder:'เช่น 07851', value: editUnit.code, onChange: e => setEditUnit({...editUnit, code:e.target.value}) })
            ),
            React.createElement('div', { className:'admin-field' },
              React.createElement('label', { className:'admin-label' }, 'ชื่อย่อ'),
              React.createElement('input', { className:'admin-input', placeholder:'เช่น เสลียงแห้ง', value: editUnit.short, onChange: e => setEditUnit({...editUnit, short:e.target.value}) })
            )
          ),
          React.createElement('div', { className:'aec-actions' },
            React.createElement('button', { className:'admin-cancel-btn', onClick: () => setEditUnit(null) }, 'ยกเลิก'),
            React.createElement('button', { className:'admin-save-btn', onClick: () => {
              if (editUnit.isNew) {
                setUnits([...units, { id:'U'+(units.length+1), name:editUnit.name, code:editUnit.code, short:editUnit.short }]);
              } else {
                setUnits(units.map(u => u.id === editUnit.id ? { ...u, name:editUnit.name, code:editUnit.code, short:editUnit.short } : u));
              }
              setEditUnit(null); showSaved();
            } }, 'บันทึก')
          )
        ),

        React.createElement('div', { className:'admin-table-wrap' },
          React.createElement('table', { className:'admin-table' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, '#'),
                React.createElement('th', null, 'รหัส'),
                React.createElement('th', null, 'ชื่อหน่วยบริการ'),
                React.createElement('th', null, 'ชื่อย่อ'),
                React.createElement('th', null, 'จัดการ')
              )
            ),
            React.createElement('tbody', null,
              units.map((u, i) =>
                React.createElement('tr', { key: u.id },
                  React.createElement('td', { className:'td-muted' }, i + 1),
                  React.createElement('td', null, React.createElement('code', { className:'code-tag' }, u.code)),
                  React.createElement('td', { style:{fontWeight:500} }, u.name),
                  React.createElement('td', null, u.short),
                  React.createElement('td', null,
                    React.createElement('div', { className:'td-actions' },
                      React.createElement('button', { className:'icon-btn edit', onClick: () => setEditUnit({...u, isNew:false}), title:'แก้ไข' },
                        React.createElement(Icon, { d:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
                      ),
                      React.createElement('button', { className:'icon-btn delete', onClick: () => { if(window.confirm('ลบ "'+u.name+'" ออกจากระบบ?')) { setUnits(units.filter(x => x.id !== u.id)); showSaved(); } }, title:'ลบ' },
                        React.createElement(Icon, { d:'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' })
                      )
                    )
                  )
                )
              )
            )
          )
        )
      ),

      /* ─ Thresholds ─ */
      activeTab === 'threshold' && React.createElement('div', { className:'admin-section' },
        React.createElement('h3', { className:'admin-section-title' }, 'เกณฑ์การประเมินผล'),
        React.createElement('div', { className:'admin-form-grid' },
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'เกณฑ์ผ่าน (สีเขียว) — ร้อยละ ≥'),
            React.createElement('div', { className:'admin-input-with-unit' },
              React.createElement('input', { className:'admin-input', type:'number', min:0, max:100, value: passThreshold, onChange: e => setPassThreshold(e.target.value) }),
              React.createElement('span', { className:'input-unit' }, '%')
            )
          ),
          React.createElement('div', { className:'admin-field' },
            React.createElement('label', { className:'admin-label' }, 'เกณฑ์เสี่ยง (สีเหลือง) — ร้อยละ ≥'),
            React.createElement('div', { className:'admin-input-with-unit' },
              React.createElement('input', { className:'admin-input', type:'number', min:0, max:100, value: warnThreshold, onChange: e => setWarnThreshold(e.target.value) }),
              React.createElement('span', { className:'input-unit' }, '%')
            )
          )
        ),

        React.createElement('h3', { className:'admin-section-title', style:{marginTop:'var(--space-6)'} }, 'ตัวอย่างการแสดงสถานะ'),
        React.createElement('div', { className:'threshold-preview' },
          [
            { label:'ผ่านเกณฑ์', range:'≥ ' + passThreshold + '%', bg:'#ECFDF5', text:'#065F46', border:'#A7F3D0', example:'93.5%' },
            { label:'เสี่ยง / ควรเฝ้าระวัง', range: warnThreshold + '–' + (parseInt(passThreshold)-1) + '%', bg:'#FFFBEB', text:'#92400E', border:'#FDE68A', example:'74.2%' },
            { label:'ไม่ผ่านเกณฑ์', range:'< ' + warnThreshold + '%', bg:'#FEF2F2', text:'#991B1B', border:'#FECACA', example:'38.1%' },
          ].map(s =>
            React.createElement('div', { key:s.label, className:'tp-item', style:{ background:s.bg, border:'1px solid '+s.border } },
              React.createElement('div', { className:'tp-example', style:{color:s.text} }, s.example),
              React.createElement('div', { className:'tp-label', style:{color:s.text} }, s.label),
              React.createElement('div', { className:'tp-range' }, s.range)
            )
          )
        ),

        React.createElement('h3', { className:'admin-section-title', style:{marginTop:'var(--space-6)'} }, 'ระดับความเสี่ยง KPI'),
        React.createElement('div', { className:'admin-table-wrap' },
          React.createElement('table', { className:'admin-table' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, 'ระดับ'),
                React.createElement('th', null, 'เงื่อนไข'),
                React.createElement('th', null, 'สี'),
                React.createElement('th', null, 'การดำเนินการ')
              )
            ),
            React.createElement('tbody', null,
              [
                { level:'วิกฤต', cond:'ผลงาน < 50% ของเป้าหมาย', color:'#EF4444', action:'เร่งรัดทันที' },
                { level:'เสี่ยงสูง', cond:'ผลงาน 50–79% ของเป้าหมาย', color:'#F97316', action:'ติดตามรายสัปดาห์' },
                { level:'เสี่ยง', cond:'ผลงาน 80–' + (parseInt(passThreshold)-1) + '% ของเป้าหมาย', color:'#EAB308', action:'ติดตามรายเดือน' },
                { level:'ผ่าน', cond:'ผลงาน ≥ ' + passThreshold + '% ของเป้าหมาย', color:'#10B981', action:'รายงานผลปกติ' },
              ].map(r =>
                React.createElement('tr', { key:r.level },
                  React.createElement('td', null, React.createElement('span', { className:'badge', style:{ background:r.color+'1A', color:r.color, border:'1px solid '+r.color+'40', fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:4, display:'inline-block' } }, r.level)),
                  React.createElement('td', null, r.cond),
                  React.createElement('td', null, React.createElement('span', { style:{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'var(--text-sm)' } }, React.createElement('span', { style:{ width:12, height:12, borderRadius:'50%', background:r.color, display:'inline-block' } }), r.color)),
                  React.createElement('td', null, r.action)
                )
              )
            )
          )
        ),

        React.createElement('div', { className:'admin-action-row' },
          saveMsg && React.createElement('span', { className:'admin-save-msg' },
            React.createElement(Icon, { d:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }), saveMsg
          ),
          React.createElement('button', { className:'admin-save-btn', onClick: showSaved }, 'บันทึกเกณฑ์')
        )
      ),

      /* ─ Column Mapping ─ */
      activeTab === 'mapping' && React.createElement('div', { className:'admin-section' },
        React.createElement('h3', { className:'admin-section-title' }, 'การ Mapping คอลัมน์จากไฟล์ Excel'),
        React.createElement('p', { className:'admin-desc' }, 'กำหนดว่าคอลัมน์ใดในไฟล์ Excel ตรงกับข้อมูลใดในระบบ'),
        React.createElement('div', { className:'admin-form-grid' },
          Object.entries({
            num:    { label:'ลำดับ / รหัส KPI',       hint:'ตัวเลขหน้าตัวชี้วัด เช่น 1, 2.1, 3' },
            name:   { label:'ชื่อตัวชี้วัด',          hint:'ข้อความอธิบาย KPI' },
            target: { label:'เป้าหมาย',               hint:'ร้อยละหรือตัวเลขที่ต้องผ่าน' },
            pm:     { label:'กลุ่มงาน PM สสจ.',        hint:'ชื่อกลุ่มงานที่รับผิดชอบ' },
            result: { label:'ผลงาน (เขาค้อ)',          hint:'ตัวเลขผลงานของอำเภอเขาค้อ' },
            status: { label:'สถานะประเมิน',            hint:'ผ่าน / ไม่ผ่าน' },
          }).map(([key, info]) =>
            React.createElement('div', { key, className:'admin-field' },
              React.createElement('label', { className:'admin-label' }, info.label),
              React.createElement('input', { className:'admin-input', value: colMapping[key] || '', onChange: e => setColMapping({...colMapping, [key]:e.target.value}), placeholder: info.hint }),
              React.createElement('span', { className:'field-hint' }, info.hint)
            )
          )
        ),
        React.createElement('div', { className:'admin-mapping-tip' },
          React.createElement(Icon, { d:'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }),
          'ระบบจะใช้ข้อมูล Mapping นี้เมื่อประมวลผลไฟล์ Excel ที่อัปโหลดครั้งต่อไป'
        ),
        React.createElement('div', { className:'admin-action-row' },
          saveMsg && React.createElement('span', { className:'admin-save-msg' },
            React.createElement(Icon, { d:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }), saveMsg
          ),
          React.createElement('button', { className:'admin-save-btn', onClick: showSaved }, 'บันทึก Mapping')
        )
      ),

      /* ─ Users ─ */
      activeTab === 'users' && React.createElement('div', { className:'admin-section' },
        React.createElement('h3', { className:'admin-section-title' }, 'ผู้ใช้งานระบบ'),
        React.createElement('div', { className:'admin-table-wrap' },
          React.createElement('table', { className:'admin-table' },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', null, '#'),
                React.createElement('th', null, 'ชื่อผู้ใช้'),
                React.createElement('th', null, 'ชื่อ-นามสกุล'),
                React.createElement('th', null, 'บทบาท'),
                React.createElement('th', null, 'สถานะ'),
                React.createElement('th', null, 'เข้าสู่ระบบล่าสุด')
              )
            ),
            React.createElement('tbody', null,
              [
                { user:'chayanun250841', name:'ชญานันท์', role:'ผู้ดูแลระบบ', active:true, last:'10 มิ.ย. 2569 09:30' },
                { user:'sso_khaokho', name:'เจ้าหน้าที่ สสอ.', role:'ผู้ใช้งาน', active:true, last:'09 มิ.ย. 2569 14:22' },
                { user:'report_viewer', name:'ผู้บริหาร', role:'ดูรายงาน', active:false, last:'01 มิ.ย. 2569 08:10' },
              ].map((u, i) =>
                React.createElement('tr', { key: u.user },
                  React.createElement('td', { className:'td-muted' }, i + 1),
                  React.createElement('td', null, React.createElement('code', { className:'code-tag' }, u.user)),
                  React.createElement('td', { style:{fontWeight:500} }, u.name),
                  React.createElement('td', null, React.createElement('span', { className:'role-badge' }, u.role)),
                  React.createElement('td', null,
                    React.createElement('span', { className:'status-dot-row' },
                      React.createElement('span', { className:'status-dot', style:{background: u.active ? '#10B981' : '#9CA3AF'} }),
                      u.active ? 'ใช้งาน' : 'ระงับ'
                    )
                  ),
                  React.createElement('td', { className:'td-muted' }, u.last)
                )
              )
            )
          )
        ),
        React.createElement('div', { className:'admin-note' },
          React.createElement(Icon, { d:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }),
          'การจัดการรหัสผ่านและสิทธิ์ผู้ใช้งานเพิ่มเติมต้องดำเนินการผ่านผู้ดูแลระบบ IT'
        )
      )
    )
  );
}

Object.assign(window, { AdminPage });
