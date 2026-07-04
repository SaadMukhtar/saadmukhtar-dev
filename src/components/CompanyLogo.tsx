"use client";

export function CompanyLogo({ domain, company }: { domain: string; company: string }) {
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={company}
      width={20}
      height={20}
      className="rounded shrink-0 opacity-80"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}
