import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Plus, ArrowRight, CarFront } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="">
      {/* Header */}
      <header className="bg-white rounded-md mb-6">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
            </div>
            <p className="text-sm font-medium text-gray-500 mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Total Job Requests Metric Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            {/* Background decoration hover effect */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full transition-transform group-hover:scale-[2] duration-500 ease-out z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100/50 flex items-center justify-center text-blue-600 shadow-inner">
                  <ClipboardList size={26} strokeWidth={2.5} />
                </div>
                <span className="px-3 py-1.5 bg-green-100/80 text-green-700 text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm">
                  +12%
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-gray-500 text-[12px] font-bold tracking-wider uppercase mb-2">Total Job Requests</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">1,248</span>
                </div>
              </div>
              
              <div className="mt-auto flex gap-3">
                <button 
                  onClick={() => navigate('/JobRequests', { state: { view: 'form' } })}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95 group/btn"
                >
                  <Plus size={18} strokeWidth={3} className="transition-transform group-hover/btn:rotate-90 duration-300" /> 
                  Add New
                </button>
                <button 
                  onClick={() => navigate('/JobRequests')}
                  className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-100 transition-colors active:scale-95 flex-shrink-0"
                  title="View All"
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Handover Metric Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
            {/* Background decoration hover effect */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-violet-50 rounded-full transition-transform group-hover:scale-[2] duration-500 ease-out z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-100/50 flex items-center justify-center text-violet-600 shadow-inner">
                  <CarFront size={26} strokeWidth={2.5} />
                </div>
                <span className="px-3 py-1.5 bg-green-100/80 text-green-700 text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm">
                  +5%
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-gray-500 text-[12px] font-bold tracking-wider uppercase mb-2">Vehicle Handover</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">854</span>
                </div>
              </div>
              
              <div className="mt-auto flex gap-3">
                <button 
                  onClick={() => navigate('/VehicleHandover', { state: { view: 'form' } })}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-violet-500/20 active:scale-95 group/btn"
                >
                  <Plus size={18} strokeWidth={3} className="transition-transform group-hover/btn:rotate-90 duration-300" /> 
                  Add New
                </button>
                <button 
                  onClick={() => navigate('/VehicleHandover')}
                  className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-100 transition-colors active:scale-95 flex-shrink-0"
                  title="View All"
                >
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
