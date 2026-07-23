import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const CommonPopup = ({ title, content, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const detailsToShow = content && content.detailsToShow;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // unmount after animation
    }, 250); // match animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 
      bg-black/50 backdrop-blur-sm transition-opacity duration-200 
      ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "popupOut 0.25s ease forwards"
            : "popupIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <style>{`
          @keyframes popupIn {
            from { opacity: 0; transform: scale(0.92) translateY(16px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }

          @keyframes popupOut {
            from { opacity: 1; transform: scale(1) translateY(0); }
            to   { opacity: 0; transform: scale(0.92) translateY(16px); }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-500">
          <h2 className="text-white font-medium text-base truncate">
            {title}
          </h2>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[58vh] overflow-y-auto">
          {detailsToShow?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {detailsToShow.map((detail, index) => (
                <div key={index} className="rounded-xl border px-4 py-3">
                  <p className="text-xs text-gray-400">{detail.label}</p>
                  <p className="text-sm text-gray-800">{detail.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 py-4">
              No details available.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-3 border-t">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-violet-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonPopup;