'use client';

import type {IFloatingFilterParams} from "ag-grid-community";
import React, {forwardRef, useImperativeHandle, useState} from "react";

type FloatingFilterRef = {
  onParentModelChanged: (parentModel: {filter?: string} | null) => void;
};

type ParentTextFilter = {
  onFloatingFilterChanged: (type: string | null, value: string | null) => void;
};

export interface UniqueValueFloatingFilterParams extends IFloatingFilterParams {
  uniqueValues: string[];
}

export const UniqueValueFloatingFilter = forwardRef<
  FloatingFilterRef,
  UniqueValueFloatingFilterParams
>((props, ref) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  useImperativeHandle(ref, () => ({
    onParentModelChanged(parentModel: any) {
      if (!parentModel) {
        setCurrentValue("");
      } else {
        setCurrentValue(parentModel.filter || "");
      }
    },
  }));

  const onValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrentValue(value);
    
    props.parentFilterInstance((instance: ParentTextFilter) => {
      instance.onFloatingFilterChanged(value ? "equals" : null, value || null);
    });
  };

  return (
    <div className="flex h-full w-full items-center px-2">
      <select
        value={currentValue}
        onChange={onValueChange}
        className="w-full h-8 rounded-md border border-border/60 bg-background px-2 text-[11px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
      >
        <option value="">(All)</option>
        {props.uniqueValues.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
});

UniqueValueFloatingFilter.displayName = "UniqueValueFloatingFilter";
