import React from 'react';
import { Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'bookmark';
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <div style={{ color: '#FF6600', display: 'flex', alignItems: 'center' }}>
            <Sparkles size={18} />
          </div>
          <span style={{ flex: 1 }}>{toast.text}</span>
          <button 
            onClick={() => onRemove(toast.id)}
            style={{ color: '#94A3B8', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
