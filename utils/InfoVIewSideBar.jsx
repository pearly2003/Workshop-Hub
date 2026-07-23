import React from 'react';
import { X } from 'lucide-react';

const InfoVIewSideBar = ({ isOpen, onClose, title, infoData }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99]"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 md:w-[450px] bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-800">{title || "Information"}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {infoData && infoData.map((item, index) => (
              <div key={index} className="flex flex-col border-b border-gray-50 pb-2">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="text-[13px] text-gray-800 font-medium">
                  {item.value || "-"}
                </span>
              </div>
            ))}
            {(!infoData || infoData.length === 0) && (
              <div className="col-span-2 text-center text-gray-400 text-sm py-4">
                No information available.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoVIewSideBar;
