import {LucideIcon} from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group premium-card rounded-[24px] p-4 transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(10,10,10,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">{label}</p>
          <p className="mt-3 text-[2rem] font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-2.5 text-primary transition group-hover:scale-105 group-hover:bg-primary/14">
          <Icon size={18} />
        </div>
      </div>
      {hint ? <p className="mt-3 text-xs leading-5 text-foreground/55">{hint}</p> : null}
    </div>
  );
}
