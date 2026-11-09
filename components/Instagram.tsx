import { INSTAGRAM } from "@/lib/studio";

/* The Instagram glyph. Until INSTAGRAM (lib/studio.ts) holds the profile's
   address it is shown greyed out and leads nowhere; once set, it is a link. */
export default function Instagram({ className }: { className?: string }) {
  const glyph = (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );

  if (!INSTAGRAM)
    return (
      <span className={`ig ig-off ${className ?? ""}`} role="img" aria-label="Instagram, coming soon">
        {glyph}
      </span>
    );

  return (
    <a href={INSTAGRAM} className={`ig ${className ?? ""}`} aria-label="Studio Borne on Instagram" target="_blank" rel="noopener noreferrer">
      {glyph}
    </a>
  );
}
