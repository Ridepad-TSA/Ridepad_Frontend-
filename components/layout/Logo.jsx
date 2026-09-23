/**
 * Wordmark with a low, sporty side-profile car mark, used in the Navbar
 * and Footer. Hand-drawn silhouette — no icon library has a low-slung
 * sports-car shape. The wheel wells are cut out with the night background
 * color, so this only reads correctly on a bg-night surface.
 */
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 140 50" className="h-9 w-auto text-burgundy-bright" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6 40
             L9 33
             C11 30 14 28 18 27
             L40 25
             C46 17 54 13 64 12
             C74 11 82 12 88 15
             C93 17 96 20 98 24
             L108 25
             C114 25 118 28 120 33
             L122 30
             C126 29 130 31 131 35
             L131 37
             C131 39 129 40 127 40
             L120 40
             C120 34 115 30 109 30
             C103 30 98 34 98 40
             L42 40
             C42 34 37 30 31 30
             C25 30 20 34 20 40
             Z"
        />
        <circle cx="31" cy="40" r="9" fill="#0b0b0b" />
        <circle cx="109" cy="40" r="9" fill="#0b0b0b" />
        <circle cx="31" cy="40" r="4" fill="currentColor" />
        <circle cx="109" cy="40" r="4" fill="currentColor" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">
        RIDE<span className="text-burgundy-bright">PAD</span>
      </span>
    </span>
  );
}
