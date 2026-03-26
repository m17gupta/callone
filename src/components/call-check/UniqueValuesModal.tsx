'use client';

import React from "react";
import {X, Search, Copy, Check} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

type UniqueValuesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  uniqueValues: Record<string, string[]>;
  columns: string[];
};

export function UniqueValuesModal({
  isOpen,
  onClose,
  uniqueValues,
  columns,
}: UniqueValuesModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const filteredColumns = columns.filter((col) =>
    col.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (values: string[], field: string) => {
    const text = values.join(", ");
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{opacity: 0, scale: 0.95, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.95, y: 20}}
            className="fixed left-1/2 top-1/2 z-[60] flex h-[85vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[32px] border border-border/60 bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-8 py-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Unique Column Values</h2>
                <p className="mt-1 text-sm text-foreground/62">
                  Review and copy unique values found in your spreadsheet columns.
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground/62 transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/42" />
                <input
                  type="text"
                  placeholder="Search columns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-[20px] border border-border/70 bg-background px-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {filteredColumns.map((col) => {
                  const values = uniqueValues[col] || [];
                  if (values.length === 0) return null;

                  return (
                    <div
                      key={col}
                      className="flex flex-col rounded-[24px] border border-border/60 bg-foreground/[0.02] p-6 transition-colors hover:border-primary/30"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-foreground">{col}</h3>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/42">
                            {values.length} unique items
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(values, col)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border/60 text-foreground/62 transition-all hover:border-primary/50 hover:text-primary"
                        >
                          {copiedField === col ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {values.slice(0, 15).map((val, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-lg bg-background px-2.5 py-1 text-xs font-medium text-foreground/76 border border-border/40 shadow-sm"
                          >
                            {val}
                          </span>
                        ))}
                        {values.length > 15 && (
                          <span className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1 text-xs font-bold text-foreground/42">
                            +{values.length - 15} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredColumns.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <p className="text-sm text-foreground/42">No columns matched your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
