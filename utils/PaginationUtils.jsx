import React from "react";
import Pagination from "rc-pagination";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export const CustomPagination = ({
  total,
  current,
  pageSize,
  onChange,
  showSummary = true,
  showPageSizeSelector = false,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);
  const summaryText = `Showing ${start} - ${end} of ${total} results`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {showSummary && (
        <div className="text-sm font-medium text-slate-500">{summaryText}</div>
      )}

      <div className="flex w-full justify-center sm:w-auto sm:justify-end">
        <div className="flex flex-wrap gap-3 items-center justify-center py-1 rounded-full">
          {/* <div className="bg-white border border-slate-200 flex flex-wrap gap-3 items-center justify-center py-1 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.08)]"> */}
          <Pagination
            className="[&_.rc-pagination]:flex flex [&_.rc-pagination]:list-none [&_.rc-pagination]:items-center [&_.rc-pagination]:gap-[0.35rem] [&_.rc-pagination]:m-0 [&_.rc-pagination]:p-0
              [&_.rc-pagination-item]:min-w-[2.25rem] [&_.rc-pagination-item]:h-9 [&_.rc-pagination-item]:m-0 [&_.rc-pagination-item]:border-0 [&_.rc-pagination-item]:bg-transparent [&_.rc-pagination-item]:rounded-full [&_.rc-pagination-item]:flex [&_.rc-pagination-item]:items-center [&_.rc-pagination-item]:justify-center [&_.rc-pagination-item]:text-gray-800 [&_.rc-pagination-item]:text-[0.95rem] [&_.rc-pagination-item]:font-semibold [&_.rc-pagination-item]:transition-all [&_.rc-pagination-item]:duration-[0.18s] [&_.rc-pagination-item]:ease-in-out
              [&_.rc-pagination-prev]:min-w-[2.25rem] [&_.rc-pagination-prev]:h-9 [&_.rc-pagination-prev]:m-0 [&_.rc-pagination-prev]:border-0 [&_.rc-pagination-prev]:bg-transparent [&_.rc-pagination-prev]:rounded-full [&_.rc-pagination-prev]:flex [&_.rc-pagination-prev]:items-center [&_.rc-pagination-prev]:justify-center [&_.rc-pagination-prev]:text-gray-800 [&_.rc-pagination-prev]:text-[0.95rem] [&_.rc-pagination-prev]:font-semibold [&_.rc-pagination-prev]:transition-all [&_.rc-pagination-prev]:duration-[0.18s] [&_.rc-pagination-prev]:ease-in-out
              [&_.rc-pagination-next]:min-w-[2.25rem] [&_.rc-pagination-next]:h-9 [&_.rc-pagination-next]:m-0 [&_.rc-pagination-next]:border-0 [&_.rc-pagination-next]:bg-transparent [&_.rc-pagination-next]:rounded-full [&_.rc-pagination-next]:flex [&_.rc-pagination-next]:items-center [&_.rc-pagination-next]:justify-center [&_.rc-pagination-next]:text-gray-800 [&_.rc-pagination-next]:text-[0.95rem] [&_.rc-pagination-next]:font-semibold [&_.rc-pagination-next]:transition-all [&_.rc-pagination-next]:duration-[0.18s] [&_.rc-pagination-next]:ease-in-out
              [&_.rc-pagination-jump-prev]:min-w-[2.25rem] [&_.rc-pagination-jump-prev]:h-9 [&_.rc-pagination-jump-prev]:m-0 [&_.rc-pagination-jump-prev]:border-0 [&_.rc-pagination-jump-prev]:bg-transparent [&_.rc-pagination-jump-prev]:rounded-full [&_.rc-pagination-jump-prev]:flex [&_.rc-pagination-jump-prev]:items-center [&_.rc-pagination-jump-prev]:justify-center [&_.rc-pagination-jump-prev]:text-gray-800 [&_.rc-pagination-jump-prev]:text-[0.95rem] [&_.rc-pagination-jump-prev]:font-semibold [&_.rc-pagination-jump-prev]:transition-all [&_.rc-pagination-jump-prev]:duration-[0.18s] [&_.rc-pagination-jump-prev]:ease-in-out [&_.rc-pagination-jump-prev]:tracking-[0.18em]
              [&_.rc-pagination-jump-next]:min-w-[2.25rem] [&_.rc-pagination-jump-next]:h-9 [&_.rc-pagination-jump-next]:m-0 [&_.rc-pagination-jump-next]:border-0 [&_.rc-pagination-jump-next]:bg-transparent [&_.rc-pagination-jump-next]:rounded-full [&_.rc-pagination-jump-next]:flex [&_.rc-pagination-jump-next]:items-center [&_.rc-pagination-jump-next]:justify-center [&_.rc-pagination-jump-next]:text-gray-800 [&_.rc-pagination-jump-next]:text-[0.95rem] [&_.rc-pagination-jump-next]:font-semibold [&_.rc-pagination-jump-next]:transition-all [&_.rc-pagination-jump-next]:duration-[0.18s] [&_.rc-pagination-jump-next]:ease-in-out [&_.rc-pagination-jump-next]:tracking-[0.18em]
              [&_.rc-pagination-item_a]:text-inherit
              [&_.rc-pagination-prev_button]:text-inherit
              [&_.rc-pagination-next_button]:text-inherit
              [&_.rc-pagination-jump-prev_button]:text-inherit
              [&_.rc-pagination-jump-next_button]:text-inherit
              [&_.rc-pagination-item:hover]:bg-slate-50 [&_.rc-pagination-item:hover]:text-gray-900
              [&_.rc-pagination-prev:hover]:bg-slate-50 [&_.rc-pagination-prev:hover]:text-gray-900
              [&_.rc-pagination-next:hover]:bg-slate-50 [&_.rc-pagination-next:hover]:text-gray-900
              [&_.rc-pagination-jump-prev:hover]:bg-slate-50 [&_.rc-pagination-jump-prev:hover]:text-gray-900
              [&_.rc-pagination-jump-next:hover]:bg-slate-50 [&_.rc-pagination-jump-next:hover]:text-gray-900
              [&_.rc-pagination-item-active]:bg-Black [&_.rc-pagination-item-active]:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.45)] [&_.rc-pagination-item-active]:text-indigo-700
              [&_.rc-pagination-disabled]:opacity-[0.42] [&_.rc-pagination-disabled]:pointer-events-none"
            onChange={onChange}
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
          />

          {showPageSizeSelector && (
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="appearance-none rounded-full border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all hover:border-slate-300 focus:border-slate-300"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / page
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PaginationChange = (page, setCurrent) => {
  setCurrent(page);
};

export const getData = (current, pageSize, filteredBus) => {
  return filteredBus.slice((current - 1) * pageSize, current * pageSize);
};

export const PrevNextArrow = (page, type, originalElement) => {
  if (type === "prev") {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-50"
        title="Previous"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
    );
  }

  if (type === "next") {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-50"
        title="Next"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    );
  }

  if (type === "jump-prev" || type === "jump-next") {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-50"
        aria-label={type === "jump-prev" ? "Jump backward" : "Jump forward"}
      >
        ...
      </button>
    );
  }

  return originalElement;
};
