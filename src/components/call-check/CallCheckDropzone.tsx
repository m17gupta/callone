'use client';

import {Upload} from "lucide-react";

type CallCheckDropzoneProps = {
  active: boolean;
};

export function CallCheckDropzone({active}: CallCheckDropzoneProps) {
  if (!active) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center border-4 border-dashed border-primary bg-primary/15 backdrop-blur-sm">
      <div className="premium-card rounded-[28px] px-8 py-10 text-center">
        <Upload className="mx-auto h-16 w-16 animate-bounce text-primary" />
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Drop spreadsheet here</h2>
        <p className="mt-2 text-sm text-foreground/62">
          Release to load `.xlsx`, `.xls`, or `.csv` into the call-check workspace.
        </p>
      </div>
    </div>
  );
}
