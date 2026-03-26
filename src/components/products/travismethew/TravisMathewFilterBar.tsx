import React from 'react';
import { Search, SlidersHorizontal, ArrowDownUp, ChevronsUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest updated" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "stock-desc", label: "Stock high to low" },
];

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export interface TravisMathewFilterBarProps {
  query: string;
  setQuery: (val: string) => void;
  activeFilterCount: number;
  onToggleFilters: () => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  pageSize: number;
  setPageSize: (val: number) => void;
}

export function TravisMathewFilterBar({
  query,
  setQuery,
  activeFilterCount,
  onToggleFilters,
  sortBy,
  setSortBy,
  pageSize,
  setPageSize,
}: TravisMathewFilterBarProps) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_auto_auto_auto]">
      <label className="flex items-center gap-3 rounded-[22px] border border-border/30 bg-background/50 px-4 py-3 focus-within:border-border/70 focus-within:bg-background">
        <Search className="h-4 w-4 text-foreground/45" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by product, base SKU, variant SKU, brand, category, or attribute value"
          className="w-full border-none bg-transparent p-0 text-sm outline-none placeholder:text-foreground/40 text-foreground"
        />
      </label>

      <button
        onClick={onToggleFilters}
        className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-border/70 bg-transparent px-4 py-3 text-sm font-semibold text-foreground/76 transition-colors hover:bg-white/5"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      <label className="inline-flex items-center gap-3 rounded-[20px] border border-border/70 bg-transparent px-4 py-3 text-sm font-semibold text-foreground/76 transition-colors hover:bg-white/5">
        <ArrowDownUp className="h-4 w-4 text-foreground/45" />
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="appearance-none border-none bg-transparent p-0 pr-2 text-sm font-semibold outline-none focus:ring-0 cursor-pointer"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1a1a1a] text-foreground">
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="inline-flex items-center gap-3 rounded-[20px] border border-border/70 bg-transparent px-4 py-3 text-sm font-semibold text-foreground/76 transition-colors hover:bg-white/5">
        <ChevronsUpDown className="h-4 w-4 text-foreground/45" />
        <select
          value={pageSize}
          onChange={(event) => setPageSize(Number(event.target.value))}
          className="appearance-none border-none bg-transparent p-0 pr-2 text-sm font-semibold outline-none focus:ring-0 cursor-pointer"
        >
          {PAGE_SIZE_OPTIONS.map((value) => (
            <option key={value} value={value} className="bg-[#1a1a1a] text-foreground">
              {value} / page
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
