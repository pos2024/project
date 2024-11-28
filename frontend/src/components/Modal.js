import React, { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative  rounded-lg w-auto max-w-4xl overflow-auto"
        style={{ minWidth: '300px', maxWidth: '100%' }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        {/* Modal content */}
        <div className="p-4">
          {modalContent}
        </div>
      </div>
    </div>
  );
};

export default Modal;
