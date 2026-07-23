import React from "react";

const ProgressBar = ({ currentStep = 1, onStepClick }) => {
  const defaultSteps = [
    { num: 1, label: "Customer" },
    { num: 2, label: "Vehicle" },
    { num: 3, label: "Complaint" },
    { num: 4, label: "Photos" },
    { num: 5, label: "Review" },
  ];

  const displaySteps = defaultSteps;

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between relative max-w-4xl mx-auto px-10">
        {/* Connecting line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10"></div>
        
        {displaySteps.map((step) => {
          const isActive = step.num === currentStep;
          return (
          <div key={step.num} className="flex flex-col items-center bg-white px-4">
            <div
              onClick={() => onStepClick && onStepClick(step.num)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2 transition-colors cursor-pointer ${
                isActive
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 text-gray-500 border-2 border-white"
              }`}
            >
              {step.num}
            </div>
            <span
              className={`text-xs font-medium ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        )})}
      </div>
    </div>
  );
};

export default ProgressBar;
