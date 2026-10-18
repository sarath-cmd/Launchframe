import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  tone?: "default" | "inverse";
}

export function SectionHeading({ eyebrow, title, lead, as: Tag = "h2", className = "", tone = "default" }: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow && (
        <p className={`text-eyebrow mb-5 ${inverse ? "text-ivory/70" : "text-cobalt"}`}>{eyebrow}</p>
      )}
      <Tag className={Tag === "h1" ? "text-h1" : "text-h2"}>{title}</Tag>
      {lead && <p className={`text-lead mt-6 max-w-2xl ${inverse ? "text-ivory/80" : "text-ink-soft"}`}>{lead}</p>}
    </div>
  );
}
