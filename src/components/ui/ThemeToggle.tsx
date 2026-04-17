"use client";

import React from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={clsx(
        "group relative flex shrink-0 items-center justify-center transition-all duration-300",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isDark ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
          </motion.div>
        ) : (
          <div className="flex items-center justify-center">
            <Sun size={18} strokeWidth={2.5} />
          </div>
        )}
      </AnimatePresence>

      {showLabel ? (
        <span className="ml-2 text-sm font-bold uppercase tracking-wider">
          {isDark ? "Dark theme" : "Light theme"}
        </span>
      ) : null}
    </button>
  );
}
