import React, { useEffect, useState } from "react";

const Modal = ({ message, onClose, isSuccess }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show modal with fade-in animation
    setIsVisible(true);

    // Automatically close the modal after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <p className={`text-lg ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Modal;