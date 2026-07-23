import React from "react";
import { QrCode, ChevronDown, Gauge } from "lucide-react";

const VehicleTab = () => {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left Column */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* VIN Identification Card */}
        <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl p-7 shadow-md border-2 border-blue-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-2xl"></div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-bold text-blue-950 flex items-center gap-2">
              VIN Identification
            </h2>
            <span className="inline-block px-3 py-1 bg-blue-100/80 text-blue-600 text-[10px] font-bold tracking-widest uppercase rounded-full">
              Primary Input
            </span>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1 group/input">
              <QrCode
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within/input:text-blue-600 transition-colors"
                size={20}
                strokeWidth={2.5}
              />
              <input
                type="text"
                placeholder="SCAN OR ENTER 17-DIGIT VIN"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-blue-200/60 rounded-xl text-[14px] uppercase focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all placeholder:text-gray-400 font-bold text-gray-800 shadow-sm"
              />
            </div>
            <button className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95">
              Lookup
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 pl-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            <p className="text-gray-600 text-[12px] font-medium">
              Scanning the VIN automatically populates make, model, and year.
            </p>
          </div>
        </div>

        {/* License Plate Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-[18px] font-bold text-gray-800 mb-6">
            License Plate
          </h2>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-12 text-3xl font-bold mb-2">
                <span>١٢٣٤</span>
                <div className="flex gap-8">
                  <span>ل</span>
                  <span>ك</span>
                  <span>ح</span>
                </div>
              </div>
              <div className="flex items-center text-xl text-gray-500 font-bold w-full justify-between">
                <span>1234</span>
                <div className="flex gap-7 pr-2">
                   <span>H</span><span>K</span><span>L</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start pt-2 w-16">
                <div className="w-6 h-6 rounded-full border-[3px] border-green-600 flex items-center justify-center mb-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full border border-white"></div>
                </div>
                <span className="text-[10px] font-bold text-gray-900 leading-none mb-1">KSA</span>
                <span className="text-[9px] font-bold text-gray-900 leading-none">السعودية</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                Plate Numbers
              </label>
              <input
                type="text"
                defaultValue="1234"
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wider">
                Plate Letters
              </label>
              <input
                type="text"
                defaultValue="HKL"
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 uppercase focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Vehicle Specification Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-[18px] font-bold text-gray-800 mb-6">
            Vehicle Specification
          </h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Make
                </label>
                <div className="relative group/select">
                  <select className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all appearance-none cursor-pointer shadow-sm">
                    <option>Lexus</option>
                    <option>Toyota</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/select:text-blue-500 transition-colors pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Model
                </label>
                <div className="relative group/select">
                  <select className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all appearance-none cursor-pointer shadow-sm">
                    <option>LX 570</option>
                    <option>Land Cruiser</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/select:text-blue-500 transition-colors pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Year
                </label>
                <div className="relative group/select">
                  <select className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all appearance-none cursor-pointer shadow-sm">
                    <option>2022</option>
                    <option>2023</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/select:text-blue-500 transition-colors pointer-events-none" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Color
                </label>
                <div className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 rounded-xl cursor-pointer shadow-sm transition-colors">
                  <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-200 bg-white flex-shrink-0 shadow-inner"></div>
                  <span className="text-[14px] font-medium text-gray-800">Pearl White</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                Odometer (KM)
              </label>
              <div className="relative group/input">
                <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-blue-500 transition-colors" size={18} strokeWidth={2.5} />
                <input
                  type="text"
                  defaultValue="42500"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Identified Vehicle Card */}
        <div className="bg-gray-900 rounded-2xl shadow-xl relative overflow-hidden flex flex-col h-full min-h-[200px] border border-gray-800">
          {/* Abstract glowing shapes for premium feel */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900/80 z-10"></div>
          
          <div className="relative z-20 p-7 flex flex-col h-full">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                Identified Vehicle
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1.5 drop-shadow-md">Lexus LX 570</h3>
            <p className="text-gray-400 text-sm font-medium mb-auto tracking-wide flex items-center gap-2">
              <QrCode size={14} className="text-gray-500" />
              JTJHY7AX3M4XXXXXX
            </p>
            
            <div className="flex gap-4 mt-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3.5 border border-white/10 flex-1 max-w-[130px] hover:bg-white/10 transition-colors cursor-default">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Last Service</p>
                <p className="text-[14px] text-white font-bold">12 Oct 2023</p>
              </div>
              <div className="bg-green-500/10 backdrop-blur-xl rounded-xl p-3.5 border border-green-500/20 flex-1 max-w-[130px] hover:bg-green-500/20 transition-colors cursor-default">
                <p className="text-[10px] text-green-200/70 uppercase tracking-widest font-semibold mb-1">Risk Level</p>
                <p className="text-[14px] text-green-400 font-bold flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div> Low
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VehicleTab;
