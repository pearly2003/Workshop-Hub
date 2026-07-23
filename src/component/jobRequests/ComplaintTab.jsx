import React, { useState } from "react";
import { 
  Settings, Clock, Wrench, Zap, Paintbrush, 
  MessageSquare, Camera, CheckCircle2, 
  AlertTriangle, Info, Receipt, MoreVertical,
  AlertCircle
} from "lucide-react";

const ComplaintTab = () => {
  const [selectedService, setSelectedService] = useState("periodic");
  const [priority, setPriority] = useState("normal");

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left Column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Service Type Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="text-blue-600" size={20} />
            <h2 className="text-[18px] font-bold text-gray-800">
              Service Type Selection
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1 */}
            <div 
              onClick={() => setSelectedService("periodic")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === "periodic" 
                  ? "border-blue-600 bg-white" 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`text-blue-600`}>
                  <Clock size={22} strokeWidth={2.5} />
                </div>
                <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
                  selectedService === "periodic" ? "border-blue-600" : "border-gray-300"
                }`}>
                  {selectedService === "periodic" && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Periodic Maintenance</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">Oil changes, filters, and scheduled checks.</p>
            </div>

            {/* Option 2 */}
            <div 
              onClick={() => setSelectedService("mechanical")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === "mechanical" 
                  ? "border-blue-600 bg-white" 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`text-blue-600`}>
                  <Wrench size={22} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Mechanical Repair</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">Engine, transmission, and suspension work.</p>
            </div>

            {/* Option 3 */}
            <div 
              onClick={() => setSelectedService("electrical")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === "electrical" 
                  ? "border-blue-600 bg-white" 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`text-blue-600`}>
                  <Zap size={22} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Electrical</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">Battery, wiring, and sensor diagnostics.</p>
            </div>

            {/* Option 4 */}
            <div 
              onClick={() => setSelectedService("body")}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === "body" 
                  ? "border-blue-600 bg-white" 
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`text-blue-600`}>
                  <Paintbrush size={22} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Body & Paint</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">Dent repair, polishing, and full repaints.</p>
            </div>
          </div>
        </div>

        {/* Customer Complaint */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-blue-600" size={20} />
            <h2 className="text-[18px] font-bold text-gray-800">
              Customer Complaint
            </h2>
          </div>
          <p className="text-gray-500 text-[14px] mb-4 pl-1 font-medium">
            Describe the issues reported by the customer in detail.
          </p>
          
          <textarea
            className="w-full flex-1 min-h-[160px] p-4 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none mb-6 placeholder:text-gray-400 font-medium"
            placeholder="E.g. Strange knocking sound from front-left wheel when braking, AC blowing warm air..."
          ></textarea>

          <div className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-4 pl-2">
              <div className="text-blue-600">
                <Camera size={24} strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-bold text-[14px] text-gray-900 mb-0.5">Attach Media</h4>
                <p className="text-[12px] text-gray-600 font-medium">Add photos or audio clips of the complaint.</p>
              </div>
            </div>
            <button className="px-6 py-2.5 text-blue-600 font-bold text-[13px] border border-blue-200 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
              Upload
            </button>
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Set Priority */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="text-blue-600" size={20} strokeWidth={2.5} />
            <h2 className="text-[18px] font-bold text-gray-800">
              Set Priority
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
              onClick={() => setPriority("normal")}
              className={`flex flex-col items-center justify-center py-5 px-4 rounded-xl border-2 cursor-pointer transition-all ${
                priority === "normal"
                  ? "border-blue-600 bg-white text-blue-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}
            >
              <CheckCircle2 size={24} strokeWidth={2} className="mb-2" />
              <span className="font-bold text-[14px]">Normal</span>
            </div>
            
            <div 
              onClick={() => setPriority("urgent")}
              className={`flex flex-col items-center justify-center py-5 px-4 rounded-xl border-2 cursor-pointer transition-all ${
                priority === "urgent"
                  ? "border-gray-300 bg-white text-gray-600"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}
            >
              <AlertTriangle size={24} strokeWidth={2} className="mb-2" />
              <span className="font-bold text-[14px]">Urgent</span>
            </div>
          </div>

          <div className="bg-[#eef2ff] rounded-xl p-4 flex gap-3">
            <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-[12px] text-blue-900/80 leading-relaxed font-bold">
              Urgent requests are flagged for immediate allocation to the next available technician. Standard SLA for normal requests is 4 hours.
            </p>
          </div>
        </div>

        {/* IN PROGRESS JOB Card */}
        <div className="bg-[#0052cc] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <div className="text-[180px] leading-none font-bold -mr-8 -mb-16"></div>
          </div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded">
              IN PROGRESS JOB
            </span>
            <button className="text-white/80 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="relative z-10 mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Toyota Land Cruiser</h3>
            <p className="text-blue-100 text-sm font-medium">V8-2023 <span className="opacity-50 mx-1">|</span> Plate: ABC-1234</p>
          </div>

          <div className="relative z-10 flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-[13px] border-b border-white/10 pb-3">
              <span className="text-blue-100 font-medium">Owner</span>
              <span className="font-bold text-white text-[14px]">Ahmed Al-Sayed</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-blue-100 font-medium">Mileage</span>
              <span className="font-bold text-white text-[14px]">42,500 KM</span>
            </div>
          </div>
        </div>

        {/* Estimate Available Card */}
        <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600 flex-shrink-0">
            <Receipt size={24} />
          </div>
          <div>
            <h4 className="font-bold text-blue-700 text-[14px] mb-0.5">Estimate Available</h4>
            <p className="text-[12px] text-gray-600 font-medium leading-relaxed">
              Based on periodic maintenance, estimated cost: <br/><span className="font-bold text-gray-900">$150 - $220</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintTab;
