import React from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // for dark backgrounds
}

// Server Component — no interactivity needed
export default function SectionHeading({
  label,
  title,
  accentWord,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  // Insert accent colouring: replace last word or explicit accentWord
  const renderTitle = () => {
    if (!accentWord) return <span>{title}</span>;
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <em className={`not-italic font-semibold ${light ? "text-green-300" : "text-green-600"}`}>
          {accentWord}
        </em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {label && (
        <div
          className={`inline-flex items-center gap-3 mb-4 text-xs font-medium tracking-[0.18em] uppercase ${
            light ? "text-green-300" : "text-green-600"
          }`}
        >
          <span
            className={`inline-block w-8 h-px ${light ? "bg-green-300" : "bg-green-500"} opacity-60`}
          />
          {label}
        </div>
      )}
      <h2
        className={`font-playfair text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight mb-4 ${
          light ? "text-white" : "text-neutral-900"
        }`}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className={`text-base font-light leading-relaxed max-w-md ${
            centered ? "mx-auto" : ""
          } ${light ? "text-neutral-300" : "text-neutral-500"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
