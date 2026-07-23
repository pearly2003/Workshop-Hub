import React, { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

const JobRequestTable = ({ onCreateNew }) => {
  const [search, setSearch] = useState("");

  const data = [
    { id: "JR-2024-001", customer: "Ahmed Khan", phone: "+971 50 123 4567", vehicle: "Toyota Land Cruiser", date: "Oct 24, 2024", status: "Pending" },
    { id: "JR-2024-002", customer: "Sarah Smith", phone: "+971 55 987 6543", vehicle: "BMW X5", date: "Oct 23, 2024", status: "Approved" },
    { id: "JR-2024-003", customer: "Mohammed Ali", phone: "+971 52 456 7890", vehicle: "Nissan Patrol", date: "Oct 22, 2024", status: "In Progress" },
    { id: "JR-2024-004", customer: "John Doe", phone: "+971 54 321 0987", vehicle: "Mercedes Benz E-Class", date: "Oct 21, 2024", status: "Completed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "Approved":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "In Progress":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Completed":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Job Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all vehicle service requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
          </button>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Request</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Job ID</th>
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="pb-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-gray-900">{row.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{row.customer}</span>
                    <span className="text-xs text-gray-500">{row.phone}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{row.vehicle}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{row.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>Showing 1 to 4 of 4 entries</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-blue-50 text-blue-600 font-medium rounded-lg">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default JobRequestTable;
