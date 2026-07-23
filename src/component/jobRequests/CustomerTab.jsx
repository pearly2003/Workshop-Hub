import React from "react";
import { Search, UserCheck, ChevronDown, Info } from "lucide-react";

const CustomerTab = () => {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Left Column (Form) */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-8">
          <UserCheck className="text-blue-500" size={24} strokeWidth={2} />
          <h2 className="text-[18px] font-bold text-gray-800">
            Customer Identification
          </h2>
        </div>

        <div className="space-y-8">
          {/* Search Section */}
          <div>
            <label className="flex items-center text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
              SEARCH EXISTING CUSTOMER
              <div className="relative group ml-2 flex items-center">
                <Info className="text-gray-400 group-hover:text-blue-500 transition-colors cursor-help" size={14} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-gray-900 text-white text-xs leading-relaxed rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center shadow-xl pointer-events-none normal-case tracking-normal font-medium">
                  Enter at least 3 characters of the name, phone number, or exact ID to search.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </label>
            <div className="relative group/search">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Phone Number, Name, or ID..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-white px-2">
              OR CREATE NEW
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                FULL NAME <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                MOBILE NUMBER <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                placeholder="+971 -- --- ----"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">
                PREFERRED LANGUAGE
              </label>
              <div className="relative group/select">
                <select className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white hover:bg-gray-50 transition-all appearance-none cursor-pointer shadow-sm">
                  <option>English</option>
                  <option>Arabic</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/select:text-blue-500 transition-colors pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        {/* Loyalty Check Card */}
        <div className="bg-blue-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          {/* Decorative background shape */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white/20"></div>
          <div className="absolute top-2 right-4 w-1 h-6 bg-white/20 transform rotate-45"></div>

          <h3 className="text-lg font-bold mb-3 relative z-10">Loyalty Check</h3>
          <p className="text-blue-50 text-[14px] leading-relaxed relative z-10 opacity-90">
            Enter a phone number to automatically check for active service contracts
            or warranty extensions.
          </p>
        </div>

        {/* Quick Tip Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
          <div className="h-44 w-full bg-gray-200 relative">
            <img
              src="/reception.png"
              alt="Reception"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 flex-1">
            <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-500 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
              QUICK TIP
            </span>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ensure the mobile number is correct to send automated SMS status
              updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTab;
