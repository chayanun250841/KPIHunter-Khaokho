/* @ds-bundle: {"format":3,"namespace":"ThaiMEDDesignSystem_f64170","components":[{"name":"AlertWarning","sourcePath":"components/core/AlertWarning.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"PatientCard","sourcePath":"components/core/PatientCard.jsx"},{"name":"ServiceTag","sourcePath":"components/core/ServiceTag.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"}],"sourceHashes":{"components/core/AlertWarning.jsx":"88c2ea32ed63","components/core/Button.jsx":"5a70e06adb82","components/core/PatientCard.jsx":"6f44c382e286","components/core/ServiceTag.jsx":"ebcf0c8e2d38","components/core/StatusBadge.jsx":"d890551c8690","ui_kits/thaimed_app/App.jsx":"a68ecc978363","ui_kits/thaimed_app/Dashboard.jsx":"d603c21e7fdf","ui_kits/thaimed_app/PatientScreen.jsx":"ddcc7dc6ec46","ui_kits/thaimed_app/QueueScreen.jsx":"1c73710fd3f8","ui_kits/thaimed_app/ReportsScreen.jsx":"5f4ae11f3b9f","ui_kits/thaimed_app/ServiceScreen.jsx":"f48c26721838"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ThaiMEDDesignSystem_f64170 = window.ThaiMEDDesignSystem_f64170 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AlertWarning.jsx
try { (() => {
const LEVEL_CONFIG = {
  caution: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    iconBg: '#FEF3C7',
    titleColor: '#92400E',
    textColor: '#78350F',
    label: 'ข้อควรระวัง',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#D97706",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "9",
      x2: "12",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12.01",
      y2: "17"
    }))
  },
  warning: {
    bg: '#FFF7ED',
    border: '#FED7AA',
    iconBg: '#FFEDD5',
    titleColor: '#C2410C',
    textColor: '#9A3412',
    label: 'คำเตือน',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#EA580C",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "8",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "16",
      x2: "12.01",
      y2: "16"
    }))
  },
  danger: {
    bg: '#FFF1F2',
    border: '#FECDD3',
    iconBg: '#FFE4E6',
    titleColor: '#BE123C',
    textColor: '#9F1239',
    label: 'ข้อห้ามสำคัญ',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#F43F5E",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "9",
      x2: "9",
      y2: "15"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "9",
      x2: "15",
      y2: "15"
    }))
  }
};
function AlertWarning({
  level = 'warning',
  title,
  description,
  items,
  onTransfer,
  onDismiss
}) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.warning;
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '10px',
    backgroundColor: config.bg,
    border: `1.5px solid ${config.border}`,
    fontFamily: 'var(--font-sans)',
    width: '100%',
    boxSizing: 'border-box'
  };
  const headerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px'
  };
  const iconWrapStyle = {
    width: 36,
    height: 36,
    borderRadius: '8px',
    backgroundColor: config.iconBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1
  };
  const titleStyle = {
    fontWeight: 700,
    fontSize: '15px',
    color: config.titleColor,
    lineHeight: 1.4,
    marginBottom: description || items ? '3px' : 0
  };
  const descStyle = {
    fontSize: '14px',
    color: config.textColor,
    lineHeight: 1.65
  };
  const actionRowStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  };
  const transferBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '6px 14px',
    borderRadius: '6px',
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    lineHeight: 1
  };
  const dismissBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: config.textColor,
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    border: `1px solid ${config.border}`,
    cursor: 'pointer',
    lineHeight: 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: containerStyle,
    role: "alert"
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: iconWrapStyle
  }, config.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: titleStyle
  }, config.label, title ? ` — ${title}` : ''), description && /*#__PURE__*/React.createElement("div", {
    style: descStyle
  }, description), items && items.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '6px 0 0 0',
      padding: '0 0 0 18px',
      ...descStyle
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      marginBottom: 3
    }
  }, item))))), (onTransfer || onDismiss) && /*#__PURE__*/React.createElement("div", {
    style: actionRowStyle
  }, onTransfer && /*#__PURE__*/React.createElement("button", {
    style: transferBtnStyle,
    onClick: onTransfer
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })), "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D / \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C"), onDismiss && /*#__PURE__*/React.createElement("button", {
    style: dismissBtnStyle,
    onClick: onDismiss
  }, "\u0E23\u0E31\u0E1A\u0E17\u0E23\u0E32\u0E1A")));
}
Object.assign(__ds_scope, { AlertWarning });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AlertWarning.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const buttonBaseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  border: 'none',
  outline: 'none',
  borderRadius: 'var(--radius-button)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  lineHeight: 1,
  textDecoration: 'none',
  boxSizing: 'border-box',
  transition: 'opacity 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
  position: 'relative',
  userSelect: 'none'
};
const sizeMap = {
  sm: {
    padding: '0 12px',
    fontSize: '14px',
    height: '32px',
    gap: '4px'
  },
  md: {
    padding: '0 18px',
    fontSize: '16px',
    height: '40px',
    gap: '6px'
  },
  lg: {
    padding: '0 24px',
    fontSize: '18px',
    height: '48px',
    gap: '8px'
  },
  xl: {
    padding: '0 32px',
    fontSize: '20px',
    height: '56px',
    gap: '8px'
  }
};
const variantMap = {
  primary: {
    backgroundColor: 'var(--color-herb-600)',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: 'var(--shadow-sm)'
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-herb-600)',
    border: '1.5px solid var(--color-herb-600)',
    boxShadow: 'none'
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'none',
    boxShadow: 'none'
  },
  danger: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: 'var(--shadow-sm)'
  },
  'ghost-danger': {
    backgroundColor: 'transparent',
    color: '#DC2626',
    border: '1.5px solid #DC2626',
    boxShadow: 'none'
  },
  warning: {
    backgroundColor: '#F59E0B',
    color: '#111827',
    border: 'none',
    boxShadow: 'var(--shadow-sm)'
  },
  transfer: {
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: 'var(--shadow-sm)'
  },
  success: {
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: 'var(--shadow-sm)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon,
  trailingIcon,
  fullWidth = false,
  type = 'button'
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const vStyle = variantMap[variant] || variantMap.primary;
  const sStyle = sizeMap[size] || sizeMap.md;
  const style = {
    ...buttonBaseStyle,
    ...sStyle,
    backgroundColor: vStyle.backgroundColor,
    color: vStyle.color,
    border: vStyle.border || 'none',
    boxShadow: vStyle.boxShadow || 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.45 : hovered && !pressed ? 0.88 : 1,
    transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    style: style,
    disabled: disabled,
    onClick: !disabled ? onClick : undefined,
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => !disabled && setPressed(true),
    onMouseUp: () => setPressed(false)
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      width: size === 'sm' ? 14 : 16,
      height: size === 'sm' ? 14 : 16
    }
  }, icon), children, trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      width: 16,
      height: 16
    }
  }, trailingIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/PatientCard.jsx
try { (() => {
const GENDER_LABEL = {
  male: 'ชาย',
  female: 'หญิง',
  other: 'อื่น ๆ'
};
function PatientCard({
  queueNumber,
  hn,
  name,
  age,
  gender,
  services = [],
  status = 'waiting',
  waitTime,
  onClick,
  onCallQueue,
  compact = false
}) {
  const [hovered, setHovered] = React.useState(false);
  const STATUS_DOT = {
    waiting: '#F59E0B',
    active: '#3B82F6',
    done: '#22C55E',
    followup: '#A855F7',
    referred: '#F97316',
    danger: '#F43F5E',
    cancelled: '#9CA3AF'
  };
  const STATUS_LABEL = {
    waiting: 'รอรับบริการ',
    active: 'กำลังให้บริการ',
    done: 'เสร็จสิ้น',
    followup: 'นัดติดตาม',
    referred: 'ส่งต่อ',
    danger: 'เร่งด่วน',
    cancelled: 'ยกเลิก'
  };
  const STATUS_BG = {
    waiting: '#FFFBEB',
    active: '#EFF6FF',
    done: '#F0FDF4',
    followup: '#FAF5FF',
    referred: '#FFF7ED',
    danger: '#FFF1F2',
    cancelled: '#F9FAFB'
  };
  const STATUS_TEXT = {
    waiting: '#92400E',
    active: '#1E40AF',
    done: '#166534',
    followup: '#6B21A8',
    referred: '#9A3412',
    danger: '#BE123C',
    cancelled: '#6B7280'
  };
  const SERVICE_COLORS = {
    exam: '#B91C1C',
    medicine: '#1E5631',
    massage: '#6D28D9',
    compress: '#92400E',
    steam: '#0E7490',
    soak: '#1D4ED8',
    poultice: '#7C2D12',
    postpartum: '#9D174D',
    community: '#065F46',
    advice: '#3730A3'
  };
  const SERVICE_LABELS = {
    exam: 'ตรวจ',
    medicine: 'ยา',
    massage: 'นวด',
    compress: 'ประคบ',
    steam: 'อบ',
    soak: 'แช่',
    poultice: 'พอก',
    postpartum: 'หลังคลอด',
    community: 'ชุมชน',
    advice: 'แนะนำ'
  };
  const cardStyle = {
    display: 'flex',
    alignItems: compact ? 'center' : 'flex-start',
    gap: '14px',
    padding: compact ? '12px 16px' : '16px 20px',
    backgroundColor: hovered ? '#FAFFF9' : '#FFFFFF',
    borderRadius: '10px',
    border: `1px solid ${status === 'danger' ? '#FECDD3' : 'var(--color-border-default)'}`,
    boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'box-shadow 0.15s ease, background-color 0.15s ease',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-sans)',
    position: 'relative'
  };
  const queueBadgeStyle = {
    minWidth: compact ? 36 : 44,
    height: compact ? 36 : 44,
    borderRadius: '8px',
    backgroundColor: status === 'danger' ? '#FFF1F2' : status === 'active' ? '#EFF6FF' : 'var(--color-herb-50)',
    color: status === 'danger' ? '#BE123C' : status === 'active' ? '#1E40AF' : 'var(--color-herb-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: compact ? '15px' : '18px',
    flexShrink: 0
  };
  const infoStyle = {
    flex: 1,
    minWidth: 0
  };
  const nameRowStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '4px'
  };
  const nameStyle = {
    fontWeight: 600,
    fontSize: compact ? '14px' : '16px',
    color: 'var(--color-text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  const metaStyle = {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
    flexShrink: 0
  };
  const subRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  };
  const agePillStyle = {
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-neutral-100)',
    padding: '1px 7px',
    borderRadius: '999px',
    flexShrink: 0
  };
  const statusBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    borderRadius: '9999px',
    backgroundColor: STATUS_BG[status] || STATUS_BG.waiting,
    color: STATUS_TEXT[status] || STATUS_TEXT.waiting,
    fontSize: '12px',
    fontWeight: 500
  };
  const serviceTagStyle = type => ({
    fontSize: '11px',
    fontWeight: 600,
    padding: '1px 6px',
    borderRadius: '3px',
    backgroundColor: `${SERVICE_COLORS[type] || '#6B7280'}15`,
    color: SERVICE_COLORS[type] || '#6B7280',
    border: `1px solid ${SERVICE_COLORS[type] || '#6B7280'}20`
  });
  const callBtnStyle = {
    padding: '7px 14px',
    borderRadius: '6px',
    backgroundColor: 'var(--color-herb-600)',
    color: '#FFFFFF',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    lineHeight: 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: cardStyle,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, queueNumber && /*#__PURE__*/React.createElement("div", {
    style: queueBadgeStyle
  }, String(queueNumber).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: infoStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: nameRowStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: nameStyle
  }, name), hn && /*#__PURE__*/React.createElement("span", {
    style: metaStyle
  }, "HN ", hn)), /*#__PURE__*/React.createElement("div", {
    style: subRowStyle
  }, (age || gender) && /*#__PURE__*/React.createElement("span", {
    style: agePillStyle
  }, age ? `${age} ปี` : '', age && gender ? ' · ' : '', gender ? GENDER_LABEL[gender] || gender : ''), /*#__PURE__*/React.createElement("span", {
    style: statusBadgeStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: STATUS_DOT[status],
      display: 'inline-block',
      flexShrink: 0
    }
  }), STATUS_LABEL[status] || status), waitTime && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: 'var(--color-text-muted)'
    }
  }, "\u0E23\u0E2D ", waitTime, " \u0E19\u0E32\u0E17\u0E35"), services.map((type, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: serviceTagStyle(type)
  }, SERVICE_LABELS[type] || type)))), onCallQueue && status === 'waiting' && /*#__PURE__*/React.createElement("button", {
    style: callBtnStyle,
    onClick: e => {
      e.stopPropagation();
      onCallQueue();
    }
  }, "\u0E40\u0E23\u0E35\u0E22\u0E01"));
}
Object.assign(__ds_scope, { PatientCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PatientCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ServiceTag.jsx
try { (() => {
const SERVICE_CONFIG = {
  exam: {
    label: 'ตรวจวินิจฉัย',
    color: '#B91C1C',
    bg: '#FFF1F2',
    border: 'rgba(185,28,28,0.15)'
  },
  medicine: {
    label: 'จ่ายยาสมุนไพร',
    color: '#1E5631',
    bg: '#F0F9F3',
    border: 'rgba(30,86,49,0.15)'
  },
  massage: {
    label: 'นวด',
    color: '#6D28D9',
    bg: '#FAF5FF',
    border: 'rgba(109,40,217,0.15)'
  },
  compress: {
    label: 'ประคบ',
    color: '#92400E',
    bg: '#FFFBEB',
    border: 'rgba(146,64,14,0.15)'
  },
  steam: {
    label: 'อบสมุนไพร',
    color: '#0E7490',
    bg: '#ECFEFF',
    border: 'rgba(14,116,144,0.15)'
  },
  soak: {
    label: 'แช่สมุนไพร',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    border: 'rgba(29,78,216,0.15)'
  },
  poultice: {
    label: 'พอกยา',
    color: '#7C2D12',
    bg: '#FFF7ED',
    border: 'rgba(124,45,18,0.15)'
  },
  postpartum: {
    label: 'หลังคลอด',
    color: '#9D174D',
    bg: '#FFF1F5',
    border: 'rgba(157,23,77,0.15)'
  },
  community: {
    label: 'บริการชุมชน',
    color: '#065F46',
    bg: '#ECFDF5',
    border: 'rgba(6,95,70,0.15)'
  },
  advice: {
    label: 'ให้คำแนะนำ',
    color: '#3730A3',
    bg: '#EEF2FF',
    border: 'rgba(55,48,163,0.15)'
  }
};
const SIZE_MAP = {
  sm: {
    padding: '2px 7px',
    fontSize: '11px',
    fontWeight: 500
  },
  md: {
    padding: '3px 10px',
    fontSize: '13px',
    fontWeight: 600
  },
  lg: {
    padding: '5px 14px',
    fontSize: '15px',
    fontWeight: 600
  }
};
function ServiceTag({
  type,
  size = 'md',
  onClick
}) {
  const config = SERVICE_CONFIG[type] || SERVICE_CONFIG.exam;
  const sz = SIZE_MAP[size] || SIZE_MAP.md;
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sz.padding,
    borderRadius: '4px',
    backgroundColor: config.bg,
    color: config.color,
    border: `1px solid ${config.border}`,
    fontFamily: 'var(--font-sans)',
    fontSize: sz.fontSize,
    fontWeight: sz.fontWeight,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    transition: 'opacity 0.12s ease'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: style,
    onClick: onClick,
    onMouseEnter: e => onClick && (e.currentTarget.style.opacity = '0.8'),
    onMouseLeave: e => onClick && (e.currentTarget.style.opacity = '1')
  }, config.label);
}
Object.assign(__ds_scope, { ServiceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ServiceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusBadge.jsx
try { (() => {
const STATUS_CONFIG = {
  waiting: {
    label: 'รอรับบริการ',
    bg: 'var(--color-status-waiting-bg)',
    text: 'var(--color-status-waiting-text)',
    dot: 'var(--color-status-waiting-dot)'
  },
  active: {
    label: 'กำลังให้บริการ',
    bg: 'var(--color-status-active-bg)',
    text: 'var(--color-status-active-text)',
    dot: 'var(--color-status-active-dot)'
  },
  done: {
    label: 'เสร็จสิ้น',
    bg: 'var(--color-status-done-bg)',
    text: 'var(--color-status-done-text)',
    dot: 'var(--color-status-done-dot)'
  },
  followup: {
    label: 'นัดติดตาม',
    bg: 'var(--color-status-followup-bg)',
    text: 'var(--color-status-followup-text)',
    dot: 'var(--color-status-followup-dot)'
  },
  referred: {
    label: 'ส่งต่อ',
    bg: 'var(--color-status-referred-bg)',
    text: 'var(--color-status-referred-text)',
    dot: 'var(--color-status-referred-dot)'
  },
  cancelled: {
    label: 'ยกเลิก',
    bg: '#F3F4F6',
    text: '#6B7280',
    dot: '#9CA3AF'
  },
  danger: {
    label: 'เร่งด่วน',
    bg: 'var(--color-status-danger-bg)',
    text: 'var(--color-status-danger-text)',
    dot: 'var(--color-status-danger-dot)'
  }
};
const SIZE_MAP = {
  sm: {
    padding: '2px 8px',
    fontSize: '12px',
    dotSize: 6
  },
  md: {
    padding: '3px 10px',
    fontSize: '13px',
    dotSize: 7
  },
  lg: {
    padding: '5px 14px',
    fontSize: '15px',
    dotSize: 8
  }
};
function StatusBadge({
  status,
  size = 'md',
  showDot = true,
  pulse = false
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.waiting;
  const sz = SIZE_MAP[size] || SIZE_MAP.md;
  const dotStyle = {
    width: sz.dotSize,
    height: sz.dotSize,
    borderRadius: '50%',
    backgroundColor: config.dot,
    flexShrink: 0,
    display: 'inline-block',
    animation: pulse && status === 'active' ? 'thaimed-pulse 1.8s ease-in-out infinite' : 'none'
  };
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: sz.padding,
    borderRadius: '9999px',
    backgroundColor: config.bg,
    color: config.text,
    fontFamily: 'var(--font-sans)',
    fontSize: sz.fontSize,
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        @keyframes thaimed-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `), /*#__PURE__*/React.createElement("span", {
    style: badgeStyle
  }, showDot && /*#__PURE__*/React.createElement("span", {
    style: dotStyle
  }), config.label));
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/App.jsx
try { (() => {
// ThaiMED App — Main Shell (Sidebar + TopBar + Routing)
// Exports window.ThaiMEDApp

const NAV_ITEMS = [{
  key: 'dashboard',
  label: 'หน้าหลัก',
  icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
}, {
  key: 'queue',
  label: 'คิวผู้รับบริการ',
  icon: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'
}, {
  key: 'patient',
  label: 'ผู้รับบริการ',
  icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
}, {
  key: 'service',
  label: 'บันทึกบริการ',
  icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
}, {
  key: 'reports',
  label: 'รายงาน',
  icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
}];
const BOTTOM_ITEMS = [{
  key: 'settings',
  label: 'ตั้งค่า',
  icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
}];
function NavItem({
  item,
  active,
  onClick
}) {
  const [hov, setHov] = React.useState(false);
  const isActive = active === item.key;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      padding: '10px 14px',
      borderRadius: 9,
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: isActive ? 600 : 400,
      background: isActive ? 'rgba(255,255,255,0.13)' : hov ? 'rgba(255,255,255,0.07)' : 'transparent',
      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
      transition: 'all 0.15s',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
    strokeWidth: isActive ? '2' : '1.75',
    strokeLinecap: "round",
    strokeLinejoin: "round",
    dangerouslySetInnerHTML: {
      __html: item.icon
    }
  }), item.label, item.key === 'queue' && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      background: '#F59E0B',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      borderRadius: '999px',
      padding: '1px 7px',
      lineHeight: 1.6
    }
  }, "8"));
}
function Sidebar({
  screen,
  navigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 230,
      minHeight: '100vh',
      background: '#1A3528',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 9,
      background: 'rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 36 44",
    width: "20",
    height: "24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 33 C8 27 6 18 10 10 C12 6 16 5 18 7 C14 12 11 22 11 33Z",
    fill: "rgba(255,255,255,0.4)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 33 C28 27 30 18 26 10 C24 6 20 5 18 7 C22 12 25 22 25 33Z",
    fill: "rgba(255,255,255,0.55)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 35 C13 27 12 17 16 8 C17 6 19 6 20 8 C24 17 23 27 18 35Z",
    fill: "#FFFFFF"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "33",
    x2: "18",
    y2: "39",
    stroke: "rgba(255,255,255,0.7)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: 0.3,
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "Thai"), "MED"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(255,255,255,0.45)',
      fontSize: 10,
      lineHeight: 1
    }
  }, "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 \u0E23\u0E1E.\u0E2A\u0E15.")))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: '12px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.3)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '6px 6px 4px'
    }
  }, "\u0E40\u0E21\u0E19\u0E39\u0E2B\u0E25\u0E31\u0E01"), NAV_ITEMS.map(item => /*#__PURE__*/React.createElement(NavItem, {
    key: item.key,
    item: item,
    active: screen,
    onClick: () => navigate(item.key)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 10px 16px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }
  }, BOTTOM_ITEMS.map(item => /*#__PURE__*/React.createElement(NavItem, {
    key: item.key,
    item: item,
    active: screen,
    onClick: () => navigate(item.key)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
      padding: '10px 10px',
      borderRadius: 9,
      background: 'rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#2D6A4F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: 13,
      fontWeight: 700,
      color: '#fff'
    }
  }, "\u0E2A"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 13,
      fontWeight: 600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "\u0E19\u0E1E\u0E17. \u0E2A\u0E21\u0E28\u0E23\u0E35 \u0E43\u0E08\u0E14\u0E35"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'rgba(255,255,255,0.4)',
      fontSize: 11
    }
  }, "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22")))));
}
function TopBar({
  screen,
  navigate
}) {
  const SCREEN_NAMES = {
    dashboard: 'หน้าหลัก',
    queue: 'คิวผู้รับบริการ',
    patient: 'ผู้รับบริการ',
    service: 'บันทึกบริการ',
    reports: 'รายงาน',
    settings: 'ตั้งค่า'
  };
  const [notif, setNotif] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#9CA3AF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6B7280'
    }
  }, "\u0E23\u0E1E.\u0E2A\u0E15. \u0E1A\u0E49\u0E32\u0E19\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px'
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#111827',
      fontWeight: 600
    }
  }, SCREEN_NAMES[screen] || screen)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })), "\u0E08. 9 \u0E21\u0E34.\u0E22. 2568 \xB7 10:24"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotif(false),
    style: {
      position: 'relative',
      width: 36,
      height: 36,
      borderRadius: 8,
      border: '1px solid #E5E7EB',
      background: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#6B7280",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.73 21a2 2 0 0 1-3.46 0"
  })), notif && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#F43F5E',
      border: '2px solid #fff'
    }
  }))));
}
function SettingsScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h2)',
      margin: '0 0 24px',
      color: '#111827'
    }
  }, "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      color: '#9CA3AF',
      fontSize: 14
    }
  }, "\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E35\u0E49\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07 \u0E41\u0E25\u0E30\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E48\u0E32\u0E07 \u0E46 \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E31\u0E12\u0E19\u0E32"));
}
function ThaiMEDApp() {
  const [screen, setScreen] = React.useState('dashboard');
  const navigate = s => setScreen(s);
  const {
    DashboardScreen,
    QueueScreen,
    PatientScreen,
    ServiceScreen,
    ReportsScreen
  } = window;
  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return /*#__PURE__*/React.createElement(DashboardScreen, {
          navigate: navigate
        });
      case 'queue':
        return /*#__PURE__*/React.createElement(QueueScreen, {
          navigate: navigate
        });
      case 'patient':
        return /*#__PURE__*/React.createElement(PatientScreen, {
          navigate: navigate
        });
      case 'service':
        return /*#__PURE__*/React.createElement(ServiceScreen, {
          navigate: navigate
        });
      case 'reports':
        return /*#__PURE__*/React.createElement(ReportsScreen, {
          navigate: navigate
        });
      default:
        return /*#__PURE__*/React.createElement(SettingsScreen, null);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      background: 'var(--color-bg-base)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    screen: screen,
    navigate: navigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    screen: screen,
    navigate: navigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, renderScreen())));
}
window.ThaiMEDApp = ThaiMEDApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/Dashboard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ThaiMED App — Dashboard Screen
// Exports window.DashboardScreen

const DS = window.ThaiMEDDesignSystem_f64170;
const {
  StatusBadge
} = DS;
const MOCK_STATS = [{
  label: 'ผู้รับบริการวันนี้',
  value: 24,
  unit: 'ราย',
  color: '#2D6A4F',
  sub: '+3 จากเมื่อวาน'
}, {
  label: 'รอรับบริการ',
  value: 8,
  unit: 'คน',
  color: '#B45309',
  sub: 'รอเฉลี่ย 18 นาที'
}, {
  label: 'ให้บริการแล้ว',
  value: 15,
  unit: 'ราย',
  color: '#166534',
  sub: '62.5% ของวันนี้'
}, {
  label: 'นัดพรุ่งนี้',
  value: 12,
  unit: 'ราย',
  color: '#6B21A8',
  sub: 'เช้า 7 · บ่าย 5'
}];
const MOCK_SERVICES = [{
  label: 'นวด',
  count: 68,
  color: '#6D28D9'
}, {
  label: 'จ่ายยาสมุนไพร',
  count: 54,
  color: '#1E5631'
}, {
  label: 'ประคบ',
  count: 42,
  color: '#92400E'
}, {
  label: 'ตรวจวินิจฉัย',
  count: 38,
  color: '#B91C1C'
}, {
  label: 'อบสมุนไพร',
  count: 29,
  color: '#0E7490'
}, {
  label: 'ให้คำแนะนำ',
  count: 18,
  color: '#3730A3'
}, {
  label: 'หลังคลอด',
  count: 12,
  color: '#9D174D'
}];
const MAX_SVC = 68;
const MOCK_RECENT = [{
  q: 16,
  name: 'นางสมใจ รักสุขภาพ',
  hn: 'XX6789',
  svc: 'นวด',
  status: 'active',
  time: '09:45'
}, {
  q: 17,
  name: 'นายประสิทธิ์ มีสุข',
  hn: 'XX6790',
  svc: 'จ่ายยาสมุนไพร',
  status: 'done',
  time: '09:30'
}, {
  q: 18,
  name: 'นางสาวดวงใจ ห่วงใย',
  hn: 'XX6791',
  svc: 'ตรวจวินิจฉัย',
  status: 'waiting',
  time: '10:00'
}, {
  q: 19,
  name: 'นายวิชัย สุขสบาย',
  hn: 'XX6792',
  svc: 'อบสมุนไพร',
  status: 'waiting',
  time: '10:15'
}, {
  q: 20,
  name: 'นางวิมล แข็งแรง',
  hn: 'XX6793',
  svc: 'ประคบ',
  status: 'done',
  time: '09:15'
}];
function StatCard({
  label,
  value,
  unit,
  color,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      padding: '20px 22px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: '#9CA3AF'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34,
      fontWeight: 700,
      color,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280',
      fontWeight: 400
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#9CA3AF'
    }
  }, sub));
}
function ServiceBar({
  label,
  count,
  color
}) {
  const pct = Math.round(count / MAX_SVC * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#374151'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#111827'
    }
  }, count, " \u0E04\u0E23\u0E31\u0E49\u0E07")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      background: '#F3F4F6',
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      backgroundColor: color,
      borderRadius: 4
    }
  })));
}
function RecentRow({
  item,
  navigate
}) {
  const STATUS_BG = {
    active: '#EFF6FF',
    done: '#F0FDF4',
    waiting: '#FFFBEB'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid #F3F4F6',
      cursor: 'pointer'
    },
    onClick: () => navigate('patient')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 8,
      background: STATUS_BG[item.status] || '#F0F9F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 14,
      color: '#2D6A4F',
      flexShrink: 0
    }
  }, item.q), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#9CA3AF'
    }
  }, "HN ", item.hn, " \xB7 ", item.svc, " \xB7 ", item.time)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: item.status,
    size: "sm"
  }));
}
function DashboardScreen({
  navigate
}) {
  const pageStyle = {
    padding: '28px 32px',
    minHeight: '100%',
    boxSizing: 'border-box'
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24
  };
  const cardStyle = {
    background: '#fff',
    borderRadius: 12,
    padding: '20px 22px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyle
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h2)',
      color: '#111827',
      margin: 0
    }
  }, "\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 3
    }
  }, "\u0E27\u0E31\u0E19\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C\u0E17\u0E35\u0E48 9 \u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19 2568 \xB7 \u0E23\u0E1E.\u0E2A\u0E15. \u0E1A\u0E49\u0E32\u0E19\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('queue'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '9px 18px',
      background: '#2D6A4F',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "18",
    x2: "21",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "3.01",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "3.01",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "3.01",
    y2: "18"
  })), "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E04\u0E34\u0E27")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 22
    }
  }, MOCK_STATS.map(s => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: s.label
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      marginBottom: 16
    }
  }, "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 (\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19 2568)"), MOCK_SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceBar, _extends({
    key: s.label
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827'
    }
  }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('queue'),
    style: {
      fontSize: 12,
      color: '#2D6A4F',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600
    }
  }, "\u0E14\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u2192")), MOCK_RECENT.map(p => /*#__PURE__*/React.createElement(RecentRow, {
    key: p.hn,
    item: p,
    navigate: navigate
  })))));
}
window.DashboardScreen = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/PatientScreen.jsx
try { (() => {
// ThaiMED App — Patient Profile + Screening Screen
// Exports window.PatientScreen

const DS_P = window.ThaiMEDDesignSystem_f64170;
const {
  AlertWarning: AW,
  StatusBadge: SBP,
  ServiceTag: ST
} = DS_P;
const MOCK_PATIENT = {
  hn: 'XX6789',
  name: 'นางสมใจ รักสุขภาพ',
  dob: '15 มกราคม 2510',
  age: 58,
  gender: 'female',
  phone: '08X-XXX-XXXX',
  address: '45 ม.3 ต.ตัวอย่าง อ.เมือง จ.ตัวอย่าง',
  rights: 'บัตรทอง (30 บาท)',
  blood: 'A+',
  conditions: ['ความดันโลหิตสูง', 'เบาหวาน ระยะ 2'],
  allergies: ['ยาแอสไพริน'],
  herbAllergies: []
};
const MOCK_HISTORY = [{
  date: '12 พ.ค. 2568',
  services: ['massage', 'compress'],
  provider: 'นพท. สมศรี ใจดี',
  note: 'ปวดไหล่ขวา ดีขึ้น 70%'
}, {
  date: '28 เม.ย. 2568',
  services: ['medicine'],
  provider: 'นพท. สมศรี ใจดี',
  note: 'จ่ายยาฟ้าทะลายโจร 1 ซอง'
}, {
  date: '5 เม.ย. 2568',
  services: ['steam', 'soak'],
  provider: 'ผช.นพท. วรรณา ดีใจ',
  note: 'ปวดเมื่อยทั่วตัว อบ 20 นาที'
}];
const MOCK_APPTS = [{
  date: 'พรุ่งนี้ 10 มิ.ย. 2568',
  time: '09:30',
  services: ['massage'],
  note: 'นัดติดตามอาการไหล่',
  status: 'confirmed'
}, {
  date: '24 มิ.ย. 2568',
  time: '10:00',
  services: ['exam'],
  note: 'ตรวจประจำไตรมาส',
  status: 'confirmed'
}];
const SVC_LABEL_P = {
  exam: 'ตรวจวินิจฉัย',
  medicine: 'ยาสมุนไพร',
  massage: 'นวด',
  compress: 'ประคบ',
  steam: 'อบ',
  soak: 'แช่',
  poultice: 'พอก',
  postpartum: 'หลังคลอด',
  community: 'ชุมชน',
  advice: 'คำแนะนำ'
};
function VitalRow({
  label,
  value,
  unit,
  alert
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '7px 0',
      borderBottom: '1px solid #F3F4F6'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: alert ? '#DC2626' : '#111827'
    }
  }, value, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: '#9CA3AF',
      fontSize: 12
    }
  }, unit)));
}
function ScreeningItem({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 12px',
      borderRadius: 8,
      background: checked ? '#FFF1F2' : '#FAFAFA',
      border: `1px solid ${checked ? '#FECDD3' : '#F3F4F6'}`,
      cursor: 'pointer',
      transition: 'all 0.15s'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      width: 16,
      height: 16,
      accentColor: '#DC2626',
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: checked ? '#BE123C' : '#374151',
      fontWeight: checked ? 600 : 400
    }
  }, label));
}
function PatientScreen({
  navigate
}) {
  const [tab, setTab] = React.useState('info');
  const [screening, setScreening] = React.useState({
    pregnant: false,
    fever: false,
    openWound: false,
    highBP: true,
    recentSurgery: false,
    pacemaker: false,
    allergy: false
  });
  const hasWarning = screening.highBP;
  const hasDanger = screening.pregnant || screening.fever;
  const tabBtn = (key, label) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab(key),
    style: {
      padding: '8px 18px',
      borderRadius: 8,
      border: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      background: tab === key ? '#2D6A4F' : 'transparent',
      color: tab === key ? '#fff' : '#6B7280',
      transition: 'all 0.15s'
    }
  }, label);
  const cardS = {
    background: '#fff',
    borderRadius: 12,
    padding: '20px 22px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    marginBottom: 14
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      boxSizing: 'border-box',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardS,
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 12,
      background: '#E9F5EE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#2D6A4F",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h3)',
      margin: 0,
      color: '#111827'
    }
  }, MOCK_PATIENT.name), /*#__PURE__*/React.createElement(SBP, {
    status: "active",
    pulse: true,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      fontFamily: 'var(--font-mono)'
    }
  }, "HN ", MOCK_PATIENT.hn), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280'
    }
  }, MOCK_PATIENT.age, " \u0E1B\u0E35 \xB7 \u0E2B\u0E0D\u0E34\u0E07"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280'
    }
  }, "\u0E40\u0E25\u0E37\u0E2D\u0E14 ", MOCK_PATIENT.blood), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280'
    }
  }, MOCK_PATIENT.rights)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('service'),
    style: {
      padding: '8px 18px',
      background: '#2D6A4F',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '8px 14px',
      background: 'transparent',
      color: '#6B7280',
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E41\u0E01\u0E49\u0E44\u0E02"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: '#F3F4F6',
      padding: 4,
      borderRadius: 10,
      marginBottom: 16,
      width: 'fit-content'
    }
  }, tabBtn('info', 'ข้อมูลผู้รับบริการ'), tabBtn('screening', 'ซักประวัติ / คัดกรอง'), tabBtn('history', 'ประวัติการรับบริการ'), tabBtn('appointments', 'นัดหมาย')), tab === 'info' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: '#9CA3AF',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 12
    }
  }, "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E31\u0E27"), [['วันเกิด', MOCK_PATIENT.dob], ['เบอร์โทร', MOCK_PATIENT.phone], ['ที่อยู่', MOCK_PATIENT.address], ['สิทธิ์การรักษา', MOCK_PATIENT.rights]].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      gap: 12,
      padding: '7px 0',
      borderBottom: '1px solid #F3F4F6'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      width: 120,
      flexShrink: 0
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#111827',
      flex: 1
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: '#9CA3AF',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 12
    }
  }, "\u0E42\u0E23\u0E04\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27 / \u0E01\u0E32\u0E23\u0E41\u0E1E\u0E49"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, MOCK_PATIENT.conditions.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      display: 'inline-flex',
      margin: '0 4px 6px 0',
      padding: '3px 10px',
      borderRadius: 6,
      background: '#FFF7ED',
      color: '#92400E',
      fontSize: 13,
      fontWeight: 500,
      border: '1px solid #FED7AA'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: '#9CA3AF',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      margin: '12px 0 8px'
    }
  }, "\u0E41\u0E1E\u0E49\u0E22\u0E32"), MOCK_PATIENT.allergies.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    style: {
      display: 'inline-flex',
      margin: '0 4px 6px 0',
      padding: '3px 10px',
      borderRadius: 6,
      background: '#FFF1F2',
      color: '#BE123C',
      fontSize: 13,
      fontWeight: 500,
      border: '1px solid #FECDD3'
    }
  }, a)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 4
    }
  }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E41\u0E1E\u0E49\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(VitalRow, {
    label: "\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E42\u0E25\u0E2B\u0E34\u0E15",
    value: "148/92",
    unit: "mmHg",
    alert: true
  }), /*#__PURE__*/React.createElement(VitalRow, {
    label: "\u0E0A\u0E35\u0E1E\u0E08\u0E23",
    value: "78",
    unit: "\u0E04\u0E23\u0E31\u0E49\u0E07/\u0E19\u0E32\u0E17\u0E35"
  }), /*#__PURE__*/React.createElement(VitalRow, {
    label: "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 / \u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07",
    value: "62 kg / 158 cm",
    unit: ""
  }), /*#__PURE__*/React.createElement(VitalRow, {
    label: "BMI",
    value: "24.8",
    unit: "kg/m\xB2"
  })))), tab === 'screening' && /*#__PURE__*/React.createElement("div", null, hasDanger && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(AW, {
    level: "danger",
    title: "\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E2B\u0E49\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D",
    items: ['ห้ามนวดบริเวณท้องและเท้า', 'ห้ามอบสมุนไพร', 'ห้ามประคบร้อน'],
    onTransfer: () => alert('ส่งต่อแพทย์')
  })), hasWarning && !hasDanger && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(AW, {
    level: "caution",
    title: "\u0E21\u0E35\u0E42\u0E23\u0E04\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E42\u0E25\u0E2B\u0E34\u0E15\u0E2A\u0E39\u0E07",
    description: "\u0E15\u0E23\u0E27\u0E08\u0E27\u0E31\u0E14\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u0E41\u0E25\u0E30\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E04\u0E1A\u0E23\u0E49\u0E2D\u0E19\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E2B\u0E31\u0E27 \u0E04\u0E2D",
    onDismiss: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      marginBottom: 16
    }
  }, [['pregnant', 'ตั้งครรภ์'], ['fever', 'มีไข้ อุณหภูมิ > 37.5°C'], ['openWound', 'มีแผลเปิด / ติดเชื้อ'], ['highBP', 'ความดันโลหิตสูง > 140/90'], ['recentSurgery', 'ผ่าตัดภายใน 3 เดือน'], ['pacemaker', 'มีเครื่องกระตุ้นหัวใจ'], ['allergy', 'แพ้สมุนไพรที่ใช้']].map(([k, l]) => /*#__PURE__*/React.createElement(ScreeningItem, {
    key: k,
    label: l,
    checked: screening[k],
    onChange: () => setScreening(s => ({
      ...s,
      [k]: !s[k]
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 8,
      color: '#374151'
    }
  }, "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E17\u0E35\u0E48\u0E21\u0E32\u0E1E\u0E1A"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D \u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23\u0E40\u0E01\u0E34\u0E14 \u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32 \u0E04\u0E27\u0E32\u0E21\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07...",
    rows: 3,
    style: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      resize: 'vertical',
      outline: 'none',
      boxSizing: 'border-box',
      lineHeight: 1.7
    },
    defaultValue: "\u0E1B\u0E27\u0E14\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E22\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E1A\u0E48\u0E32 \u0E44\u0E2B\u0E25\u0E48\u0E02\u0E27\u0E32 \u0E40\u0E1B\u0E47\u0E19\u0E21\u0E32 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u0E2D\u0E32\u0E01\u0E32\u0E23\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E19\u0E27\u0E14\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19"
  }))), tab === 'history' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, MOCK_HISTORY.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      marginBottom: 4
    }
  }, h.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF'
    }
  }, h.provider)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, h.services.map(s => /*#__PURE__*/React.createElement(ST, {
    key: s,
    type: s,
    size: "sm"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#6B7280',
      background: '#F9FAFB',
      padding: '8px 12px',
      borderRadius: 7
    }
  }, h.note)))), tab === 'appointments' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, MOCK_APPTS.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...cardS,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: '#F0F9F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#2D6A4F",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827'
    }
  }, a.date, " \xB7 ", a.time), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 3
    }
  }, a.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      marginTop: 6
    }
  }, a.services.map(s => /*#__PURE__*/React.createElement(ST, {
    key: s,
    type: s,
    size: "sm"
  }))))), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 10px',
      borderRadius: '999px',
      background: '#F0FDF4',
      color: '#166534',
      fontSize: 12,
      fontWeight: 500
    }
  }, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E41\u0E25\u0E49\u0E27"))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '12px',
      border: '2px dashed #D1D5DB',
      borderRadius: 12,
      background: 'transparent',
      color: '#9CA3AF',
      fontSize: 14,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "+ \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E43\u0E2B\u0E21\u0E48")));
}
window.PatientScreen = PatientScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/PatientScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/QueueScreen.jsx
try { (() => {
// ThaiMED App — Queue Management Screen
// Exports window.QueueScreen

const DS_Q = window.ThaiMEDDesignSystem_f64170;
const {
  StatusBadge: SB_Q
} = DS_Q;
const ALL_QUEUE = [{
  q: 1,
  name: 'นางสาวดวงใจ ห่วงใย',
  hn: 'XX6791',
  age: 32,
  gender: 'female',
  svcs: ['exam'],
  status: 'danger',
  wait: 5
}, {
  q: 3,
  name: 'นางสมใจ รักสุขภาพ',
  hn: 'XX6789',
  age: 58,
  gender: 'female',
  svcs: ['massage', 'compress'],
  status: 'active',
  wait: 0
}, {
  q: 5,
  name: 'นายสมชาย ใจดี',
  hn: 'XX6794',
  age: 71,
  gender: 'male',
  svcs: ['medicine'],
  status: 'waiting',
  wait: 22
}, {
  q: 7,
  name: 'นายประสิทธิ์ มีสุข',
  hn: 'XX6790',
  age: 45,
  gender: 'male',
  svcs: ['medicine'],
  status: 'done',
  wait: 0
}, {
  q: 8,
  name: 'นายวิชัย สุขสบาย',
  hn: 'XX6792',
  age: 67,
  gender: 'male',
  svcs: ['steam', 'soak'],
  status: 'waiting',
  wait: 31
}, {
  q: 9,
  name: 'นางวิมล แข็งแรง',
  hn: 'XX6793',
  age: 44,
  gender: 'female',
  svcs: ['compress'],
  status: 'done',
  wait: 0
}, {
  q: 11,
  name: 'นางสาวรัตนา สมบูรณ์',
  hn: 'XX6795',
  age: 29,
  gender: 'female',
  svcs: ['postpartum'],
  status: 'waiting',
  wait: 18
}, {
  q: 12,
  name: 'นายบุญมี ทำดี',
  hn: 'XX6796',
  age: 53,
  gender: 'male',
  svcs: ['advice'],
  status: 'waiting',
  wait: 26
}, {
  q: 14,
  name: 'นางกมลวรรณ สุขใจ',
  hn: 'XX6797',
  age: 62,
  gender: 'female',
  svcs: ['poultice'],
  status: 'done',
  wait: 0
}];
const STATUS_ORDER = {
  danger: 0,
  active: 1,
  waiting: 2,
  done: 3,
  followup: 4,
  referred: 5,
  cancelled: 6
};
const SVC_LABEL = {
  exam: 'ตรวจ',
  medicine: 'ยา',
  massage: 'นวด',
  compress: 'ประคบ',
  steam: 'อบ',
  soak: 'แช่',
  poultice: 'พอก',
  postpartum: 'หลังคลอด',
  community: 'ชุมชน',
  advice: 'แนะนำ'
};
const SVC_COLOR = {
  exam: '#B91C1C',
  medicine: '#1E5631',
  massage: '#6D28D9',
  compress: '#92400E',
  steam: '#0E7490',
  soak: '#1D4ED8',
  poultice: '#7C2D12',
  postpartum: '#9D174D',
  community: '#065F46',
  advice: '#3730A3'
};
function QueueRow({
  item,
  onCall,
  onRecord
}) {
  const [hov, setHov] = React.useState(false);
  const isDanger = item.status === 'danger';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '13px 16px',
      background: hov ? '#FAFFF9' : '#fff',
      borderRadius: 10,
      border: `1px solid ${isDanger ? '#FECDD3' : '#E5E7EB'}`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: 'all 0.15s'
    },
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 8,
      background: isDanger ? '#FFF1F2' : item.status === 'active' ? '#EFF6FF' : '#F0F9F3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 16,
      color: isDanger ? '#BE123C' : item.status === 'active' ? '#1E40AF' : '#2D6A4F',
      flexShrink: 0
    }
  }, String(item.q).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 3,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#9CA3AF',
      fontFamily: 'var(--font-mono)'
    }
  }, "HN ", item.hn), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#6B7280',
      background: '#F3F4F6',
      borderRadius: '999px',
      padding: '1px 7px'
    }
  }, item.age, " \u0E1B\u0E35 ", item.gender === 'female' ? 'หญิง' : 'ชาย'), item.svcs.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      fontSize: 11,
      fontWeight: 600,
      padding: '1px 6px',
      borderRadius: 3,
      background: `${SVC_COLOR[s]}18`,
      color: SVC_COLOR[s],
      border: `1px solid ${SVC_COLOR[s]}22`
    }
  }, SVC_LABEL[s])), item.status === 'waiting' && item.wait > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#9CA3AF'
    }
  }, "\u0E23\u0E2D ", item.wait, " \u0E19\u0E32\u0E17\u0E35"))), /*#__PURE__*/React.createElement(SB_Q, {
    status: item.status,
    size: "sm",
    pulse: item.status === 'active'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexShrink: 0
    }
  }, item.status === 'waiting' && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onCall(item.q);
    },
    style: {
      padding: '7px 14px',
      background: '#2D6A4F',
      color: '#fff',
      border: 'none',
      borderRadius: 7,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E40\u0E23\u0E35\u0E22\u0E01"), (item.status === 'active' || item.status === 'waiting') && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRecord();
    },
    style: {
      padding: '7px 14px',
      background: 'transparent',
      color: '#2D6A4F',
      border: '1.5px solid #2D6A4F',
      borderRadius: 7,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01")));
}
function QueueScreen({
  navigate
}) {
  const [filter, setFilter] = React.useState('all');
  const [queue, setQueue] = React.useState(ALL_QUEUE);
  const [search, setSearch] = React.useState('');
  const counts = {
    all: queue.length,
    waiting: queue.filter(p => p.status === 'waiting' || p.status === 'danger').length,
    active: queue.filter(p => p.status === 'active').length,
    done: queue.filter(p => p.status === 'done').length
  };
  const filtered = queue.filter(p => {
    if (filter === 'waiting') return p.status === 'waiting' || p.status === 'danger';
    if (filter === 'active') return p.status === 'active';
    if (filter === 'done') return p.status === 'done';
    return true;
  }).filter(p => !search || p.name.includes(search) || p.hn.includes(search)).sort((a, b) => (STATUS_ORDER[a.status] || 9) - (STATUS_ORDER[b.status] || 9));
  const handleCall = qNum => {
    setQueue(q => q.map(p => p.q === qNum ? {
      ...p,
      status: 'active'
    } : p));
  };
  const nextWaiting = queue.find(p => p.status === 'waiting');
  const tabStyle = active => ({
    padding: '7px 16px',
    borderRadius: 8,
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
    background: active ? '#2D6A4F' : 'transparent',
    color: active ? '#fff' : '#6B7280'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      minHeight: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h2)',
      margin: 0,
      color: '#111827'
    }
  }, "\u0E04\u0E34\u0E27\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 3
    }
  }, "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ", counts.all, " \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E2D ", counts.waiting, " \xB7 \u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 ", counts.active, " \xB7 \u0E40\u0E2A\u0E23\u0E47\u0E08 ", counts.done)), /*#__PURE__*/React.createElement("button", {
    onClick: () => nextWaiting && handleCall(nextWaiting.q),
    disabled: !nextWaiting,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      padding: '10px 20px',
      background: nextWaiting ? '#2D6A4F' : '#D1D5DB',
      color: '#fff',
      border: 'none',
      borderRadius: 9,
      fontSize: 14,
      fontWeight: 700,
      cursor: nextWaiting ? 'pointer' : 'not-allowed',
      fontFamily: 'var(--font-sans)',
      boxShadow: '0 2px 8px rgba(45,106,79,0.25)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14"
  })), "\u0E40\u0E23\u0E35\u0E22\u0E01\u0E04\u0E34\u0E27\u0E16\u0E31\u0E14\u0E44\u0E1B ", nextWaiting ? `(คิว ${String(nextWaiting.q).padStart(2, '0')})` : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: '#F3F4F6',
      padding: 4,
      borderRadius: 10
    }
  }, [['all', 'ทั้งหมด'], ['waiting', 'รอรับบริการ'], ['active', 'กำลังให้บริการ'], ['done', 'เสร็จสิ้น']].map(([v, l]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    style: tabStyle(filter === v),
    onClick: () => setFilter(v)
  }, l, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4,
      fontSize: 12,
      opacity: 0.75
    }
  }, "(", counts[v], ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      left: 11,
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9CA3AF'
    },
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E23\u0E37\u0E2D HN",
    style: {
      padding: '8px 14px 8px 34px',
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      background: '#fff',
      width: 220,
      outline: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 0',
      color: '#9CA3AF',
      fontSize: 15
    }
  }, "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19") : filtered.map(item => /*#__PURE__*/React.createElement(QueueRow, {
    key: item.hn,
    item: item,
    onCall: handleCall,
    onRecord: () => navigate('service')
  }))));
}
window.QueueScreen = QueueScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/QueueScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/ReportsScreen.jsx
try { (() => {
// ThaiMED App — Reports Screen
// Exports window.ReportsScreen

const REPORT_STATS = [{
  label: 'ผู้รับบริการเดือนนี้',
  value: 142,
  unit: 'ราย',
  color: '#2D6A4F',
  delta: '↑ 12% จากเดือนก่อน'
}, {
  label: 'บริการทั้งหมด',
  value: 287,
  unit: 'ครั้ง',
  color: '#1D4ED8',
  delta: 'เฉลี่ย 2.0 ครั้ง/ราย'
}, {
  label: 'นัดหมาย',
  value: 68,
  unit: 'ราย',
  color: '#6D28D9',
  delta: '↑ 8 จากเดือนก่อน'
}, {
  label: 'ผิดนัด',
  value: 9,
  unit: 'ราย',
  color: '#DC2626',
  delta: '6.3% อัตราผิดนัด'
}];
const MONTHLY_SVCS = [{
  label: 'นวด',
  count: 68,
  color: '#6D28D9'
}, {
  label: 'จ่ายยาสมุนไพร',
  count: 54,
  color: '#1E5631'
}, {
  label: 'ประคบ',
  count: 42,
  color: '#92400E'
}, {
  label: 'ตรวจวินิจฉัย',
  count: 38,
  color: '#B91C1C'
}, {
  label: 'อบสมุนไพร',
  count: 29,
  color: '#0E7490'
}, {
  label: 'ให้คำแนะนำ',
  count: 18,
  color: '#3730A3'
}, {
  label: 'แช่สมุนไพร',
  count: 15,
  color: '#1D4ED8'
}, {
  label: 'หลังคลอด',
  count: 12,
  color: '#9D174D'
}, {
  label: 'พอกยา',
  count: 7,
  color: '#7C2D12'
}, {
  label: 'บริการชุมชน',
  count: 4,
  color: '#065F46'
}];
const MAX_RPT = 68;
const TOP_COMPLAINTS = [{
  complaint: 'ปวดเมื่อยกล้ามเนื้อ',
  count: 48,
  pct: 33.8
}, {
  complaint: 'ปวดหลัง ปวดเอว',
  count: 36,
  pct: 25.4
}, {
  complaint: 'นอนไม่หลับ / เครียด',
  count: 21,
  pct: 14.8
}, {
  complaint: 'ชาปลายมือปลายเท้า',
  count: 18,
  pct: 12.7
}, {
  complaint: 'อาการหลังคลอด',
  count: 12,
  pct: 8.5
}, {
  complaint: 'ปวดข้อเข่า',
  count: 7,
  pct: 4.9
}];
const MONTHLY_TREND = [{
  m: 'ม.ค.',
  v: 98
}, {
  m: 'ก.พ.',
  v: 112
}, {
  m: 'มี.ค.',
  v: 124
}, {
  m: 'เม.ย.',
  v: 108
}, {
  m: 'พ.ค.',
  v: 131
}, {
  m: 'มิ.ย.',
  v: 142
}];
const MAX_TREND = 142;
function ReportsScreen({
  navigate
}) {
  const [month, setMonth] = React.useState('มิถุนายน 2568');
  const cardStyle = {
    background: '#fff',
    borderRadius: 12,
    padding: '20px 22px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      boxSizing: 'border-box',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h2)',
      margin: 0,
      color: '#111827'
    }
  }, "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E25\u0E07\u0E32\u0E19"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 3
    }
  }, "\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: month,
    onChange: e => setMonth(e.target.value),
    style: {
      padding: '8px 14px',
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      background: '#fff',
      cursor: 'pointer',
      outline: 'none'
    }
  }, ['มิถุนายน 2568', 'พฤษภาคม 2568', 'เมษายน 2568', 'มีนาคม 2568'].map(m => /*#__PURE__*/React.createElement("option", {
    key: m
  }, m))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 16px',
      background: '#F3F4F6',
      color: '#374151',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })), "\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 20
    }
  }, REPORT_STATS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#9CA3AF',
      marginBottom: 8
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      color: s.color,
      lineHeight: 1
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7280'
    }
  }, s.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#9CA3AF',
      marginTop: 5
    }
  }, s.delta)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      marginBottom: 16
    }
  }, "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"), MONTHLY_SVCS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#374151'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, s.count, " \u0E04\u0E23\u0E31\u0E49\u0E07")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: '#F3F4F6',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${s.count / MAX_RPT * 100}%`,
      backgroundColor: s.color,
      borderRadius: 3
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      marginBottom: 16
    }
  }, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 6 \u0E40\u0E14\u0E37\u0E2D\u0E19"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 80
    }
  }, MONTHLY_TREND.map(({
    m,
    v
  }) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: m === 'มิ.ย.' ? '#2D6A4F' : '#9CA3AF'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      backgroundColor: m === 'มิ.ย.' ? '#2D6A4F' : '#B5DFC5',
      borderRadius: '4px 4px 0 0',
      height: `${v / MAX_TREND * 64}px`,
      transition: 'height 0.3s'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#9CA3AF'
    }
  }, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: '#111827',
      marginBottom: 12
    }
  }, "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22"), TOP_COMPLAINTS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.complaint,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '6px 0',
      borderBottom: i < TOP_COMPLAINTS.length - 1 ? '1px solid #F3F4F6' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#374151'
    }
  }, i + 1, ". ", c.complaint), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#2D6A4F'
    }
  }, c.count, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: '#9CA3AF',
      fontSize: 12
    }
  }, "(", c.pct, "%)"))))))));
}
window.ReportsScreen = ReportsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/ReportsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/thaimed_app/ServiceScreen.jsx
try { (() => {
// ThaiMED App — Service Recording Screen
// Exports window.ServiceScreen

const DS_S = window.ThaiMEDDesignSystem_f64170;
const {
  AlertWarning: AW_S
} = DS_S;
const SERVICE_TYPES = [{
  key: 'exam',
  label: 'ตรวจวินิจฉัย',
  color: '#B91C1C',
  bg: '#FFF1F2'
}, {
  key: 'medicine',
  label: 'จ่ายยาสมุนไพร',
  color: '#1E5631',
  bg: '#F0F9F3'
}, {
  key: 'massage',
  label: 'นวด',
  color: '#6D28D9',
  bg: '#FAF5FF'
}, {
  key: 'compress',
  label: 'ประคบสมุนไพร',
  color: '#92400E',
  bg: '#FFFBEB'
}, {
  key: 'steam',
  label: 'อบสมุนไพร',
  color: '#0E7490',
  bg: '#ECFEFF'
}, {
  key: 'soak',
  label: 'แช่สมุนไพร',
  color: '#1D4ED8',
  bg: '#EFF6FF'
}, {
  key: 'poultice',
  label: 'พอกยา',
  color: '#7C2D12',
  bg: '#FFF7ED'
}, {
  key: 'postpartum',
  label: 'ดูแลหลังคลอด',
  color: '#9D174D',
  bg: '#FFF1F5'
}, {
  key: 'community',
  label: 'บริการชุมชน',
  color: '#065F46',
  bg: '#ECFDF5'
}, {
  key: 'advice',
  label: 'ให้คำแนะนำ',
  color: '#3730A3',
  bg: '#EEF2FF'
}];
const HERBS = ['ฟ้าทะลายโจร', 'ขิง', 'ไพล', 'กระเพรา', 'มะขามเปียก', 'ใบมะนาว', 'ตะไคร้', 'ขมิ้น', 'โหระพา'];
const PROVIDERS = ['นพท. สมศรี ใจดี', 'นพท. วิภา รักงาน', 'ผช.นพท. วรรณา ดีใจ', 'ผช.นพท. สุชาติ มานะ'];
function ServiceTypeBtn({
  svc,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '14px 8px',
      borderRadius: 10,
      border: `2px solid ${selected ? svc.color : '#E5E7EB'}`,
      background: selected ? svc.bg : '#FAFAFA',
      cursor: 'pointer',
      transition: 'all 0.15s',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: selected ? `${svc.color}20` : '#F3F4F6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: selected ? svc.color : '#9CA3AF',
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: selected ? 700 : 500,
      color: selected ? svc.color : '#6B7280',
      textAlign: 'center',
      lineHeight: 1.3
    }
  }, svc.label));
}
function ServiceScreen({
  navigate
}) {
  const [selected, setSelected] = React.useState(['massage']);
  const [provider, setProvider] = React.useState(PROVIDERS[0]);
  const [duration, setDuration] = React.useState('30');
  const [herbs, setHerbs] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [advice, setAdvice] = React.useState('');
  const [apptDate, setApptDate] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const toggleService = key => {
    setSelected(s => s.includes(key) ? s.filter(k => k !== key) : [...s, key]);
  };
  const toggleHerb = h => {
    setHerbs(hs => hs.includes(h) ? hs.filter(x => x !== h) : [...hs, h]);
  };
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate('queue');
    }, 1800);
  };
  const labelS = {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 7,
    display: 'block'
  };
  const inputS = {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#fff'
  };
  const cardS = {
    background: '#fff',
    borderRadius: 12,
    padding: '18px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    marginBottom: 14
  };
  if (saved) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: 16,
      padding: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: '#F0FDF4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#22C55E",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: '#111827'
    }
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: '#9CA3AF'
    }
  }, "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E04\u0E34\u0E27..."));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px',
      boxSizing: 'border-box',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('patient'),
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      border: '1px solid #E5E7EB',
      background: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#374151",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-h2)',
      margin: 0,
      color: '#111827'
    }
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#9CA3AF',
      marginTop: 2
    }
  }, "\u0E19\u0E32\u0E07\u0E2A\u0E21\u0E43\u0E08 \u0E23\u0E31\u0E01\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E \xB7 HN XX6789 \xB7 \u0E04\u0E34\u0E27 03"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(AW_S, {
    level: "caution",
    title: "\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E42\u0E25\u0E2B\u0E34\u0E15\u0E2A\u0E39\u0E07 (148/92)",
    description: "\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E04\u0E1A\u0E2B\u0E23\u0E37\u0E2D\u0E2D\u0E1A\u0E23\u0E49\u0E2D\u0E19\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E2B\u0E31\u0E27\u0E41\u0E25\u0E30\u0E04\u0E2D"
  })), /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 14,
      color: '#111827'
    }
  }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#9CA3AF',
      fontWeight: 400
    }
  }, "(\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E14\u0E49\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 1 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 8
    }
  }, SERVICE_TYPES.map(svc => /*#__PURE__*/React.createElement(ServiceTypeBtn, {
    key: svc.key,
    svc: svc,
    selected: selected.includes(svc.key),
    onClick: () => toggleService(svc.key)
  })))), /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelS
  }, "\u0E1C\u0E39\u0E49\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("select", {
    value: provider,
    onChange: e => setProvider(e.target.value),
    style: inputS
  }, PROVIDERS.map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelS
  }, "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32 (\u0E19\u0E32\u0E17\u0E35)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: duration,
    onChange: e => setDuration(e.target.value),
    min: "5",
    max: "120",
    step: "5",
    style: inputS
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: labelS
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 / \u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15\u0E01\u0E32\u0E23\u0E13\u0E4C"), /*#__PURE__*/React.createElement("textarea", {
    value: notes,
    onChange: e => setNotes(e.target.value),
    rows: 3,
    placeholder: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E2D\u0E32\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1C\u0E25\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32...",
    style: {
      ...inputS,
      resize: 'vertical',
      lineHeight: 1.7
    }
  }))), (selected.includes('medicine') || selected.includes('compress') || selected.includes('steam')) && /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 12,
      color: '#111827'
    }
  }, "\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23/\u0E22\u0E32\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, HERBS.map(h => /*#__PURE__*/React.createElement("button", {
    key: h,
    onClick: () => toggleHerb(h),
    style: {
      padding: '5px 12px',
      borderRadius: '999px',
      border: `1.5px solid ${herbs.includes(h) ? '#2D6A4F' : '#E5E7EB'}`,
      background: herbs.includes(h) ? '#F0F9F3' : '#fff',
      color: herbs.includes(h) ? '#1E5631' : '#6B7280',
      fontSize: 13,
      fontWeight: herbs.includes(h) ? 600 : 400,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      transition: 'all 0.12s'
    }
  }, h))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("label", {
    style: labelS
  }, "\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E2B\u0E25\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("textarea", {
    value: advice,
    onChange: e => setAdvice(e.target.value),
    rows: 4,
    placeholder: "\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E14\u0E49\u0E32\u0E19\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E \u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E15\u0E31\u0E27 \u0E2D\u0E32\u0E2B\u0E32\u0E23 \u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E01\u0E32\u0E22...",
    style: {
      ...inputS,
      resize: 'vertical',
      lineHeight: 1.7
    },
    defaultValue: "\u0E14\u0E37\u0E48\u0E21\u0E19\u0E49\u0E33\u0E2D\u0E38\u0E48\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 1.5\u20132 \u0E25\u0E34\u0E15\u0E23/\u0E27\u0E31\u0E19 \u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07\u0E01\u0E32\u0E23\u0E19\u0E31\u0E48\u0E07\u0E19\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19 1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 \u0E22\u0E37\u0E14\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E04\u0E2D\u0E41\u0E25\u0E30\u0E44\u0E2B\u0E25\u0E48\u0E17\u0E38\u0E01 30 \u0E19\u0E32\u0E17\u0E35"
  })), /*#__PURE__*/React.createElement("div", {
    style: cardS
  }, /*#__PURE__*/React.createElement("label", {
    style: labelS
  }, "\u0E19\u0E31\u0E14\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 (\u0E16\u0E49\u0E32\u0E21\u0E35)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: apptDate,
    onChange: e => setApptDate(e.target.value),
    style: {
      ...inputS,
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    placeholder: "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E19\u0E31\u0E14\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E31\u0E14\u0E44\u0E1B...",
    style: {
      ...inputS,
      resize: 'none',
      lineHeight: 1.7
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    style: {
      width: '100%',
      padding: '13px',
      background: '#2D6A4F',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      boxShadow: '0 2px 10px rgba(45,106,79,0.25)'
    }
  }, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('patient'),
    style: {
      width: '100%',
      padding: '11px',
      background: 'transparent',
      color: '#6B7280',
      border: '1px solid #E5E7EB',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      padding: '11px',
      background: '#FFF7ED',
      color: '#C2410C',
      border: '1px solid #FED7AA',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D / \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C")))));
}
window.ServiceScreen = ServiceScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/thaimed_app/ServiceScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AlertWarning = __ds_scope.AlertWarning;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.PatientCard = __ds_scope.PatientCard;

__ds_ns.ServiceTag = __ds_scope.ServiceTag;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

})();
