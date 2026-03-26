import React from 'react';

export interface TravisMathewStatsProps {
  visibleCount: number;
  availableStock: number;
  selectedCount: number;
  activeFilterCount: number;
}

function SummaryTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-transparent px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</p>
    </div>
  );
}

export function TravisMathewStats({
  visibleCount,
  availableStock,
  selectedCount,
  activeFilterCount,
}: TravisMathewStatsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <SummaryTile label="Visible products" value={visibleCount} />
      <SummaryTile label="Available stock" value={availableStock} />
      <SummaryTile label="Selected rows" value={selectedCount} />
      <SummaryTile label="Active filters" value={activeFilterCount} />
    </div>
  );
}
