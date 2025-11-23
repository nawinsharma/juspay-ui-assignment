import React, { useState, useEffect } from 'react';
import { ToastContext } from './toastContext';

const Toast = ({ message, severity, onClose, duration }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const severityColors = {
    success: { bg: '#4caf50', text: '#ffffff' },
    error: { bg: '#f44336', text: '#ffffff' },
    warning: { bg: '#ff9800', text: '#ffffff' },
    info: { bg: '#2196f3', text: '#ffffff' },
  };

  const colors = severityColors[severity] || severityColors.success;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3000,
        minWidth: '300px',
        maxWidth: '90vw',
        backgroundColor: colors.bg,
        color: colors.text,
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: colors.text,
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.8,
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.8'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z"/>
        </svg>
      </button>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
    duration: 6000
  });

  const showToast = (message, severity = 'success', duration = 6000) => {
    setToast({
      open: true,
      message,
      severity,
      duration
    });
  };

  const handleClose = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const showSuccessToast = (message, duration = 6000) => {
    showToast(message, 'success', duration);
  };

  const showErrorToast = (message, duration = 6000) => {
    showToast(message, 'error', duration);
  };

  const showWarningToast = (message, duration = 6000) => {
    showToast(message, 'warning', duration);
  };

  const showInfoToast = (message, duration = 6000) => {
    showToast(message, 'info', duration);
  };

  const showRefreshToast = () => {
    showSuccessToast('Dashboard refreshed successfully!', 3000);
  };

  const showFavoriteAddedToast = () => {
    showSuccessToast('Successfully added to favorites!', 3000);
  };

  const showFavoriteRemovedToast = () => {
    showInfoToast('Removed from favorites!', 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
        showRefreshToast,
        showFavoriteAddedToast,
        showFavoriteRemovedToast
      }}
    >
      {children}
      {toast.open && (
        <Toast
          message={toast.message}
          severity={toast.severity}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};
