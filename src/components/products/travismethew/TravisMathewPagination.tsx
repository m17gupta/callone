import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TravisMathewPaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function TravisMathewPagination({ currentPage, pageCount, onPageChange }: TravisMathewPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
      <div className="text-sm text-foreground/56">
        Page {currentPage} of {pageCount || 1}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-transparent text-foreground/70 disabled:opacity-50 hover:bg-card/5 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-card/10 text-sm font-semibold text-foreground/76">
          {currentPage}
        </div>
        <button
          onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
          disabled={currentPage >= pageCount || pageCount === 0}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-transparent text-foreground/70 disabled:opacity-50 hover:bg-card/5 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

