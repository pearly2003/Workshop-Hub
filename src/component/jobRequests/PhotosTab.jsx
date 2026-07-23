import React from "react";
import { Camera, CheckCircle2, Plus, CloudUpload, CarFront, Lightbulb } from "lucide-react";

const PhotosTab = () => {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left Column */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Required Walkaround */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-gray-800">
              Required Walkaround
            </h2>
            <span className="px-4 py-1.5 bg-[#eef2ff] text-blue-700 text-[11px] font-bold rounded-full">
              5 Photos Required
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {/* Box 1: Front (Completed) */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] group border border-gray-200">
              <div className="absolute inset-0 bg-gray-200">
                {/* Simulating image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                   <img src="/car-front.jpg" alt="Front" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
              
              <div className="absolute top-2 right-2 bg-blue-600 rounded-full text-white p-0.5 shadow-sm border-2 border-white">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
              
              <div className="absolute bottom-3 left-3">
                <span className="text-white font-bold text-[11px] tracking-wider uppercase drop-shadow-md">FRONT</span>
              </div>
            </div>

            {/* Box 2: Rear */}
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-[#f8fafc] flex flex-col items-center justify-center aspect-[4/3] cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Camera size={26} strokeWidth={1.5} className="text-gray-400 mb-3" />
              <span className="text-gray-500 font-bold text-[11px] tracking-wider uppercase">REAR</span>
            </div>

            {/* Box 3: Left Side */}
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-[#f8fafc] flex flex-col items-center justify-center aspect-[4/3] cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Camera size={26} strokeWidth={1.5} className="text-gray-400 mb-3" />
              <span className="text-gray-500 font-bold text-[11px] tracking-wider uppercase">LEFT SIDE</span>
            </div>

            {/* Box 4: Right Side */}
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-[#f8fafc] flex flex-col items-center justify-center aspect-[4/3] cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Camera size={26} strokeWidth={1.5} className="text-gray-400 mb-3" />
              <span className="text-gray-500 font-bold text-[11px] tracking-wider uppercase">RIGHT SIDE</span>
            </div>

            {/* Box 5: Dashboard (Completed) */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] group border border-gray-200">
              <div className="absolute inset-0 bg-gray-200">
                {/* Simulating image */}
                <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center">
                   <img src="/car-dash.jpg" alt="Dashboard" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
              
              <div className="absolute top-2 right-2 bg-blue-600 rounded-full text-white p-0.5 shadow-sm border-2 border-white">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
              
              <div className="absolute bottom-3 left-3">
                <span className="text-white font-bold text-[11px] tracking-wider uppercase drop-shadow-md">DASHBOARD</span>
              </div>
            </div>

            {/* Box 6: Add More */}
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-[#f8fafc] flex flex-col items-center justify-center aspect-[4/3] cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Plus size={26} className="text-gray-400 mb-3" />
              <span className="text-gray-500 font-bold text-[11px] tracking-wider uppercase">ADD MORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Upload Progress */}
        <div className="bg-[#0b5cff] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="text-[18px] font-bold text-white mb-1.5">Upload Progress</h3>
              <p className="text-blue-100 text-[13px] font-medium opacity-90">2 of 5 mandatory photos</p>
            </div>
            <CloudUpload size={28} className="text-blue-300 opacity-80" strokeWidth={1.5} />
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex justify-between text-[12px] font-bold mb-3">
              <span className="text-white">Overall Completion</span>
              <span className="text-white">40%</span>
            </div>
            <div className="w-full bg-blue-800/60 rounded-full h-1.5">
              <div className="bg-white h-1.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        {/* Current Vehicle */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
          <div className="flex justify-between items-start mb-5">
            <span className="text-gray-500 text-[11px] font-bold tracking-widest uppercase">
              CURRENT VEHICLE
            </span>
            <CarFront size={18} className="text-blue-600" />
          </div>
          
          <div className="mb-6">
            <h3 className="text-[18px] font-bold text-gray-900 mb-1">Toyota Land Cruiser</h3>
            <p className="text-gray-500 text-[12px] font-medium">VIN: 1234567890ABCDEF</p>
          </div>

          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <span className="text-gray-500 text-[12px] font-medium">Plate Number</span>
            <div className="px-3 py-1 bg-[#f8fafc] rounded-lg text-[13px] font-bold text-gray-900 border border-gray-200 shadow-sm">
              KSA 1234
            </div>
          </div>
        </div>

        {/* Capture Tips */}
        <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="text-blue-600" size={18} strokeWidth={2.5} />
            <h3 className="text-[15px] font-bold text-gray-900">Capture Tips</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-gray-600 font-medium leading-relaxed">Ensure vehicle is in a well-lit area.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-gray-600 font-medium leading-relaxed">Photos must be clear and not blurry.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <span className="text-[13px] text-gray-600 font-medium leading-relaxed">Capture full body parts, don't crop.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PhotosTab;
