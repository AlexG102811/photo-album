import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface WipeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmWipeout: () => void;
  photoCount: number;
}

export const WipeoutModal: React.FC<WipeoutModalProps> = ({
  isOpen,
  onClose,
  onConfirmWipeout,
  photoCount,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wipeout-confirm-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-red-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-red-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">Complete Wipeout</h3>
            <p className="text-xs text-neutral-500">Reset and clear your food gallery</p>
            </div>
          </div>
          <button
            id="close-wipeout-modal-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-neutral-700 leading-relaxed">
            Are you sure you want to perform a <strong>complete wipeout</strong>?
          </p>

          <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-800 space-y-1">
            <p className="font-semibold">This action will:</p>
            <ul className="list-disc list-inside space-y-0.5 text-red-700">
              <li>Delete all <strong>{photoCount}</strong> photos currently in the library</li>
              <li>Clear saved gallery state in browser storage</li>
            </ul>
          </div>

          <p className="text-xs text-neutral-500">
            Note: You will be able to restore the original sample photos at any time using the &quot;Restore Demo Photos&quot; button.
          </p>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-2.5">
            <button
              id="cancel-wipeout-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              id="confirm-wipeout-btn"
              type="button"
              onClick={() => {
                onConfirmWipeout();
                onClose();
              }}
              className="px-5 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Wipe Out Everything
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
