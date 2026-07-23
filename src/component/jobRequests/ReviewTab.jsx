import React from "react";
import { Pen, Image as ImageIcon, AlertCircle, FileText } from "lucide-react";

const ReviewTab = () => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col relative">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-[18px] font-bold text-gray-900">Customer Info</h3>
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
              <Pen size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">FULL NAME</p>
              <p className="text-[14px] text-gray-800 font-medium">Khalid Al-Mansour</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">MOBILE NUMBER</p>
              <p className="text-[14px] text-gray-800 font-medium">+966 50 123 4567</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">EMAIL</p>
              <p className="text-[14px] text-gray-800 font-medium">khalid.m@example.sa</p>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between relative">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-[18px] font-bold text-gray-900">Vehicle Details</h3>
              <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors sm:hidden">
                <Pen size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">MAKE & MODEL</p>
                <p className="text-[14px] text-gray-800 font-medium">2023 Toyota Camry</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">PLATE NUMBER</p>
                <p className="text-[14px] text-gray-800 font-medium">ABC 1234</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">VIN NUMBER</p>
                <p className="text-[14px] text-gray-800 font-medium">JTMBA30E401234567</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">CURRENT MILEAGE</p>
                <p className="text-[14px] text-gray-800 font-medium">12,450 km</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0 sm:ml-6 flex flex-col items-end">
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors hidden sm:block mb-4">
              <Pen size={18} strokeWidth={2.5} />
            </button>
            <div className="w-full sm:w-[240px] aspect-[16/9] bg-[#f8fafc] rounded-xl overflow-hidden border border-gray-200 p-2 flex items-center justify-center shadow-sm">
              <img src="/camry.jpg" alt="Toyota Camry" className="w-full h-full object-cover rounded-lg" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Service Complaint */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[18px] font-bold text-gray-900">Service Complaint</h3>
            <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
              <Pen size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-6 mb-8 text-[14px] text-gray-700 font-medium leading-relaxed">
            "Unusual squeaking noise coming from the front brakes when coming to a slow stop. Also, requested a 15k km periodic maintenance check early."
          </div>
          
          <div className="flex items-center gap-8 mt-auto">
            <div className="flex items-center gap-3 text-gray-600">
              <ImageIcon size={18} strokeWidth={2} />
              <span className="text-[12px] font-bold tracking-wider uppercase">8 PHOTOS ATTACHED</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <AlertCircle size={18} strokeWidth={2.5} className="text-gray-900" />
              <span className="text-[12px] font-bold tracking-wider uppercase">PRIORITY: NORMAL</span>
            </div>
          </div>
        </div>

        {/* Submission Summary */}
        <div className="bg-[#005cd9] rounded-2xl p-7 text-white shadow-lg shadow-blue-500/20 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 p-4 -mr-4 -mt-4">
            <FileText size={120} />
          </div>
          
          <h3 className="text-[20px] font-bold text-white mb-10 relative z-10">Submission Summary</h3>
          
          <div className="flex justify-between items-center mb-7 relative z-10 border-b border-white/10 pb-7">
            <span className="text-blue-100 text-[14px] font-medium">Estimated Cost</span>
            <span className="text-[18px] font-bold text-white">SAR 450.00</span>
          </div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <span className="text-blue-100 text-[14px] font-medium leading-relaxed">Expected<br/>Delivery</span>
            <span className="text-[16px] font-bold text-white text-right leading-relaxed">Today, 5:00<br/>PM</span>
          </div>
          
          <div className="mt-auto relative z-10">
            <label className="flex items-start gap-3.5 cursor-pointer mb-6 group">
              <div className="relative flex items-center justify-center mt-1">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 rounded border-[2px] border-blue-300 bg-transparent peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center shadow-sm">
                  <svg className="w-3.5 h-3.5 text-blue-600 opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-[11px] text-blue-100 leading-relaxed font-medium">
                I agree to the <span className="text-white font-bold underline cursor-pointer">Terms & Conditions</span> as per Saudi Arabian Commercial Law and authorize Workshop Hub to perform diagnostics.
              </span>
            </label>
            
            <button className="w-full bg-white text-[#005cd9] py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-md active:scale-95">
              <FileText size={18} strokeWidth={2.5} /> Generate Job Card
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewTab;
