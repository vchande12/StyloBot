import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] bg-white rounded-lg shadow-2xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageUrl} 
          alt="Full view result" 
          className="object-contain"
          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        />
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-colors shadow-lg"
          aria-label="Close full view"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;