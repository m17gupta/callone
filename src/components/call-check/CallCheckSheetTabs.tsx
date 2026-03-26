'use client';

type CallCheckSheetTabsProps = {
  sheets: string[];
  activeSheet: string;
  onSelect: (sheet: string) => void;
};

export function CallCheckSheetTabs({sheets, activeSheet, onSelect}: CallCheckSheetTabsProps) {
  if (!sheets.length) {
    return null;
  }

  return (
    <div className="hide-scrollbar flex overflow-x-auto px-1 pt-1">
      {sheets.map((sheet) => {
        const active = sheet === activeSheet;
        return (
          <button
            key={sheet}
            type="button"
            onClick={() => onSelect(sheet)}
            className={`mr-2 rounded-t-[16px] border border-b-0 px-4 py-2 text-xs font-semibold ${
              active
                ? "border-border bg-background text-foreground"
                : "border-transparent bg-background/45 text-foreground/52 hover:border-border/60 hover:bg-background/80"
            }`}
          >
            {sheet}
          </button>
        );
      })}
    </div>
  );
}
