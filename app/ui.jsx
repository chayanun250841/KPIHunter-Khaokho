/* KPI HUNTER — Shared UI Components (no emoji, SVG icons only) */
const { useState, useEffect, useRef, useMemo } = React;
const D = window.KPIHUNTER;

/* ─── SVG Icon helper ─── */
function Icon({ path, path2, size, color, strokeWidth }) {
  return React.createElement('svg', {
    width: size || 16, height: size || 16, viewBox: '0 0 24 24',
    fill: 'none', stroke: color || 'currentColor',
    strokeWidth: strokeWidth || 1.5, strokeLinecap: 'round', strokeLinejoin: 'round'
  },
    React.createElement('path', { d: path }),
    path2 && React.createElement('path', { d: path2 })
  );
}
function IconCircle({ size }) {
  return React.createElement('svg', { width: size||16, height: size||16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.5 },
    React.createElement('circle', { cx:12, cy:12, r:10 }),
    React.createElement('path', { d:'M12 16v-4M12 8h.01' })
  );
}

/* ─── Status helpers ─── */
function riskColor(risk) {
  var map = {
    critical: { bg:'#FEF2F2', text:'#991B1B', border:'#FECACA', label:'วิกฤต' },
    high:     { bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA', label:'เสี่ยงสูง' },
    medium:   { bg:'#FFFBEB', text:'#92400E', border:'#FDE68A', label:'เสี่ยง' },
    low:      { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', label:'เฝ้าระวัง' },
    pass:     { bg:'#ECFDF5', text:'#065F46', border:'#A7F3D0', label:'ผ่าน' },
    none:     { bg:'#F9FAFB', text:'#9CA3AF', border:'#E5E7EB', label:'ไม่มีข้อมูล' }
  };
  return map[risk] || map.none;
}
function typeLabel(type) {
  if (type === 'sso')  return { text:'สสอ./รพ.สต.', bg:'#DBEAFE', color:'#1E40AF' };
  if (type === 'both') return { text:'ร่วมกัน',      bg:'#D1FAE5', color:'#065F46' };
  return                      { text:'โรงพยาบาล',    bg:'#FEE2E2', color:'#991B1B' };
}

/* ─── Summary Card (SVG icon paths passed in) ─── */
function SummaryCard({ iconPath, label, value, sub, color, onClick }) {
  return React.createElement('div', {
    className: 'summary-card', onClick: onClick,
    style: { cursor: onClick ? 'pointer' : 'default', borderTopColor: color || 'var(--color-herb-600)' }
  },
    React.createElement('div', { className: 'sc-header' },
      React.createElement('div', { className: 'sc-icon', style: { background: color || 'var(--color-herb-600)' } },
        React.createElement(Icon, { path: iconPath || 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', size: 18, color: '#fff', strokeWidth: 2 })
      ),
      React.createElement('span', { className: 'sc-label' }, label)
    ),
    React.createElement('div', { className: 'sc-value', style: { color: color || 'var(--color-text-primary)' } }, value),
    sub && React.createElement('div', { className: 'sc-sub' }, sub)
  );
}

/* ─── Status Badge ─── */
function KPIBadge({ passfail }) {
  if (!passfail) return React.createElement('span', { className: 'badge badge-neutral' }, '—');
  if (passfail === 'ผ่าน') return React.createElement('span', { className: 'badge badge-pass' }, 'ผ่าน');
  return React.createElement('span', { className: 'badge badge-fail' }, 'ไม่ผ่าน');
}

/* ─── Risk Badge ─── */
function RiskBadge({ risk }) {
  var rc = riskColor(risk);
  return React.createElement('span', {
    className: 'badge',
    style: { background: rc.bg, color: rc.text, border: '1px solid ' + rc.border }
  }, rc.label);
}

/* ─── Type Badge ─── */
function TypeBadge({ type }) {
  var tl = typeLabel(type);
  return React.createElement('span', {
    className: 'badge', style: { background: tl.bg, color: tl.color }
  }, tl.text);
}

/* ─── Mini Donut (SVG) ─── */
function MiniDonut({ value, max, color, size }) {
  var sz = size || 60;
  var r = sz * 0.38;
  var c = sz / 2;
  var circ = 2 * Math.PI * r;
  var pct = Math.min(parseFloat(value) || 0, max || 100) / (max || 100);
  var fill = circ * pct;
  return React.createElement('svg', { width: sz, height: sz, viewBox: '0 0 ' + sz + ' ' + sz },
    React.createElement('circle', { cx: c, cy: c, r: r, fill: 'none', stroke: '#E5E7EB', strokeWidth: sz * 0.12 }),
    React.createElement('circle', { cx: c, cy: c, r: r, fill: 'none', stroke: color || '#2D6A4F',
      strokeWidth: sz * 0.12, strokeDasharray: fill + ' ' + (circ - fill),
      strokeLinecap: 'round', transform: 'rotate(-90 ' + c + ' ' + c + ')'
    })
  );
}

/* ─── Sparkline ─── */
function Sparkline({ data, color, width, height }) {
  var w = width || 100, h = height || 28;
  if (!data || data.length < 2) return null;
  var max = Math.max.apply(null, data), min = Math.min.apply(null, data);
  var range = (max - min) || 1;
  var pts = data.map(function(v, i) {
    return (i / (data.length - 1) * (w - 8) + 4) + ',' +
           (h - 4 - (v - min) / range * (h - 8));
  }).join(' ');
  var lastX = (data.length - 1) / (data.length - 1) * (w - 8) + 4;
  var lastY = h - 4 - (data[data.length - 1] - min) / range * (h - 8);
  return React.createElement('svg', { width: w, height: h, style: { display: 'block' } },
    React.createElement('polyline', { points: pts, fill: 'none', stroke: color || '#2D6A4F', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    React.createElement('circle', { cx: lastX, cy: lastY, r: 2.5, fill: color || '#2D6A4F' })
  );
}

/* ─── Progress Bar ─── */
function ProgressBar({ value, target, showLabel }) {
  var pct = target ? Math.min(100, (value / target) * 100) : Math.min(100, value);
  var barColor = pct >= 100 ? '#10B981' : pct >= 80 ? '#F59E0B' : '#EF4444';
  return React.createElement('div', { className: 'progress-wrap' },
    React.createElement('div', { className: 'progress-bar' },
      React.createElement('div', { className: 'progress-fill', style: { width: pct + '%', background: barColor } })
    ),
    showLabel && React.createElement('span', { className: 'progress-label', style: { color: barColor } }, pct.toFixed(0) + '%')
  );
}

/* ─── Horizontal Bar Chart ─── */
function HBarChart({ items, maxVal }) {
  var mx = maxVal || Math.max.apply(null, items.map(function(i) { return i.value || 0; })) || 100;
  return React.createElement('div', { className: 'hbar-chart' },
    items.map(function(item, idx) {
      var pct = (item.value / mx) * 100;
      var tgt = item.target || 80;
      var barColor = item.value >= tgt ? '#10B981' : item.value >= tgt * 0.8 ? '#F59E0B' : '#EF4444';
      if (item.color) barColor = item.color;
      return React.createElement('div', { key: idx, className: 'hbar-row' },
        React.createElement('div', { className: 'hbar-label', title: item.label }, item.label),
        React.createElement('div', { className: 'hbar-track' },
          React.createElement('div', { className: 'hbar-fill', style: { width: Math.min(100, pct) + '%', background: barColor } })
        ),
        React.createElement('div', { className: 'hbar-value', style: { color: barColor } },
          typeof item.value === 'number' ? item.value.toFixed(1) + '%' : item.value
        )
      );
    })
  );
}

/* ─── Search Input ─── */
function SearchInput({ value, onChange, placeholder }) {
  return React.createElement('div', { className: 'search-wrap' },
    React.createElement(Icon, { path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', size: 15 }),
    React.createElement('input', {
      type: 'text', value: value,
      onChange: function(e) { onChange(e.target.value); },
      placeholder: placeholder || 'ค้นหา...', className: 'search-input'
    }),
    value && React.createElement('button', {
      style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: 0 },
      onClick: function() { onChange(''); }
    }, React.createElement(Icon, { path: 'M6 18L18 6M6 6l12 12', size: 14 }))
  );
}

/* ─── Filter Pills ─── */
function FilterPills({ options, value, onChange, multi }) {
  return React.createElement('div', { className: 'filter-pills' },
    options.map(function(opt) {
      var isActive = multi ? (value || []).indexOf(opt.value) >= 0 : value === opt.value;
      return React.createElement('button', {
        key: opt.value,
        className: 'pill' + (isActive ? ' pill-active' : ''),
        onClick: function() {
          if (multi) {
            var arr = (value || []).slice();
            var idx = arr.indexOf(opt.value);
            if (idx >= 0) arr.splice(idx, 1); else arr.push(opt.value);
            onChange(arr);
          } else { onChange(isActive ? '' : opt.value); }
        }
      }, opt.label + (opt.count !== undefined ? ' (' + opt.count + ')' : ''));
    })
  );
}

/* ─── Empty State ─── */
function EmptyState({ title, sub }) {
  return React.createElement('div', { className: 'empty-state' },
    React.createElement('div', { className: 'empty-icon' },
      React.createElement(Icon, { path: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', size: 48 })
    ),
    React.createElement('div', { className: 'empty-title' }, title || 'ไม่พบข้อมูล'),
    sub && React.createElement('div', { className: 'empty-sub' }, sub)
  );
}

/* ─── Section Header ─── */
function SectionHeader({ title, sub, action }) {
  return React.createElement('div', { className: 'section-header' },
    React.createElement('div', null,
      React.createElement('h2', { className: 'section-title' }, title),
      sub && React.createElement('p', { className: 'section-sub' }, sub)
    ),
    action
  );
}

Object.assign(window, {
  Icon, IconCircle, riskColor, typeLabel,
  SummaryCard, KPIBadge, RiskBadge, TypeBadge,
  MiniDonut, Sparkline, ProgressBar, HBarChart,
  SearchInput, FilterPills, EmptyState, SectionHeader
});
