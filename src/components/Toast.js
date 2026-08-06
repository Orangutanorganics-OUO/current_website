import React, { useEffect } from 'react';
import './Toast.css';

const W = {
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  CREAM:           '#F8F3EB',
  MEADOW_GOLD:     '#B5882D',
  SUCCESS:         '#3F7A3B',
  BURGUNDY:        '#95373A',
  SEAL_TERRACOTTA: '#D76427',
};

const TYPE_TONES = {
  success: { bg: W.SUCCESS,        icon: '✓' },
  error:   { bg: W.BURGUNDY,       icon: '✕' },
  warning: { bg: W.SEAL_TERRACOTTA, icon: '⚠' },
  info:    { bg: W.DEEP_FOREST_DK, icon: 'ℹ' },
};

const scopedStyles = `
  @keyframes tst-slide-in {
    from { opacity: 0; transform: translate3d(0, 24px, 0) scale(0.96); }
    to   { opacity: 1; transform: translate3d(0, 0, 0)  scale(1); }
  }
  .tst {
    position: fixed;
    right: 20px; bottom: 20px;
    z-index: 10000;
    max-width: 380px; min-width: 280px;
    background: ${W.FOREST_SHADOW};
    color: ${W.CREAM};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    border-left: 4px solid ${W.MEADOW_GOLD};
    box-shadow: 0 16px 40px rgba(1,53,50,0.28);
    animation: tst-slide-in 320ms cubic-bezier(0.22, 0.7, 0.2, 1) both;
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 16px 14px 14px;
  }
  .tst__icon {
    width: 28px; height: 28px;
    flex: 0 0 auto;
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(248,243,235,0.14);
    color: ${W.CREAM};
    border-radius: 50%;
    font-size: 14px; font-weight: 800;
    line-height: 1;
  }
  .tst__body {
    flex: 1; min-width: 0;
    font-size: 14px; line-height: 1.5;
    color: ${W.CREAM};
    white-space: pre-line;
    padding-top: 4px;
  }
  .tst__close {
    background: transparent; border: none; cursor: pointer;
    color: ${W.CREAM}; opacity: 0.7;
    font-size: 20px; line-height: 1;
    padding: 4px 6px;
    margin: -4px -6px 0 0;
    transition: opacity 150ms ease;
  }
  .tst__close:hover { opacity: 1; }

  @media (max-width: 560px) {
    .tst {
      left: 12px; right: 12px; bottom: 12px;
      max-width: none; min-width: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tst { animation: none; }
  }
`;

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const tone = TYPE_TONES[type] || TYPE_TONES.info;

  return (
    <div
      className="tst"
      style={{ borderLeftColor: tone.bg }}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <style>{scopedStyles}</style>
      <div className="tst__icon" style={{ background: tone.bg }}>
        {tone.icon}
      </div>
      <div className="tst__body">{message}</div>
      <button
        type="button"
        className="tst__close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
