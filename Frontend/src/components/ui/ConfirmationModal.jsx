import Button from './Button';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.', confirmText = 'Delete', variant = 'danger' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-danger-50 flex items-center justify-center">
          <AlertTriangle size={24} className="text-danger-500" />
        </div>
        <p className="text-gray-600">{message}</p>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant={variant} onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
}
