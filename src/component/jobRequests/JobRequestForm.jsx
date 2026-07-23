import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";
import CustomerTab from "./CustomerTab";
import VehicleTab from "./VehicleTab";
import ComplaintTab from "./ComplaintTab";
import PhotosTab from "./PhotosTab";
import ReviewTab from "./ReviewTab";
import { useData } from "../../context/DataProvider";

const JobRequestForm = ({ onCancel }) => {
  const { t } = useData();
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="flex flex-col h-full relative pb-28 md:pb-0">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentStep === 4 ? t('jobRequestForm.step4Title') : (currentStep === 5 ? t('jobRequestForm.step5Title') : t('jobRequestForm.step1Title'))}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {currentStep === 4
            ? t('jobRequestForm.step4Desc')
            : (currentStep === 5 ? t('jobRequestForm.step5Desc') : t('jobRequestForm.step1Desc'))}
        </p>
      </div>

      {/* Stepper */}
      <ProgressBar currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Main Content Area */}
      {currentStep === 1 && <CustomerTab />}
      {currentStep === 2 && <VehicleTab />}
      {currentStep === 3 && <ComplaintTab />}
      {currentStep === 4 && <PhotosTab />}
      {currentStep === 5 && <ReviewTab />}

      {/* Footer Actions (Floating on Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.15)] z-50 md:relative md:bg-transparent md:p-0 md:shadow-none border-t border-gray-200/60 md:mt-auto md:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {currentStep === 5 ? (
          <>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 sm:py-2.5 text-sm font-bold text-gray-600 bg-gray-100 sm:bg-transparent hover:bg-gray-200 sm:hover:bg-transparent hover:text-gray-900 rounded-xl transition-colors order-2 sm:order-1"
            >
              <ArrowLeft size={18} strokeWidth={2.5} /> {t('jobRequestForm.backToInspection')}
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button onClick={onCancel} className="w-full sm:w-auto px-6 py-3 sm:py-2.5 text-sm font-bold text-red-500 border border-red-200 hover:bg-red-50 rounded-xl transition-colors active:scale-95">
                {t('jobRequestForm.discardRequest')}
              </button>
              <button className="w-full sm:w-auto px-6 py-3 sm:py-2.5 text-sm font-bold text-white bg-[#4F5B73] hover:bg-[#3f495e] rounded-xl transition-colors active:scale-95 shadow-sm">
                {t('jobRequestForm.saveAsDraft')}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:block"></div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
                <button onClick={onCancel} className="flex-1 sm:flex-none px-4 py-3 sm:py-2.5 text-sm font-semibold text-gray-500 bg-gray-100 sm:bg-transparent hover:bg-gray-200 sm:hover:bg-gray-100 rounded-xl transition-colors active:scale-95">
                  {t('jobRequestForm.cancel')}
                </button>
                <button className="flex-1 sm:flex-none px-4 py-3 sm:py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 sm:bg-transparent hover:bg-gray-200 sm:hover:bg-gray-100 rounded-xl transition-colors active:scale-95 whitespace-nowrap">
                  {t('jobRequestForm.saveDraft')}
                </button>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                    className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-3 sm:py-2.5 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    <ArrowLeft size={16} /> {t('jobRequestForm.previous')}
                  </button>
                )}
                {currentStep < 5 ? (
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(prev + 1, 5))}
                    className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-8 py-3 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {t('jobRequestForm.next')} <ArrowRight size={16} />
                  </button>
                ) : (
                  <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-8 py-3 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-green-500/20 transition-all active:scale-95">
                    {t('jobRequestForm.submit')}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobRequestForm;
