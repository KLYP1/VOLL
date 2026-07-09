import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  light?: boolean;
}

export default function Logo({ className = '', size = 'md', showTagline = true, light = true }: LogoProps) {
  const dimensions = {
    sm: { width: 100, height: 28 },
    md: { width: 140, height: 40 },
    lg: { width: 220, height: 62 },
    xl: { width: 320, height: 90 },
  }[size];

  // Colors based on the real brand: Deep Blue (#171A8D) and Bright Yellow/Gold (#F7B51D)
  const letterFill = light ? "#FFFFFF" : "#171A8D";

  return (
    <div id="voll-logo-wrapper" className={`flex flex-col items-start font-display select-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 160 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        {/* Custom Geometric VOLL Typography with high precision industrial cuts */}
        <g>
          {/* V - custom stylized left-hand stroke with parallel diagonal, horizontal flag, and vertical foot */}
          <path
            d="M 12 7 H 34 L 40 25 V 37 H 32 V 25 L 28 13 H 12 Z"
            fill={letterFill}
          />
          
          {/* O - Official Yellow squircle with white star and horizontal left cutout */}
          <rect
            x="46"
            y="7"
            width="36"
            height="30"
            rx="10"
            fill="#F7B51D"
          />
          {/* White Star / Sparkle cutout inside O */}
          <path
            d="M 64 12 Q 64 22 74 22 Q 64 22 64 32 Q 64 22 54 22 Q 64 22 64 12 Z"
            fill="#FFFFFF"
          />
          {/* Left horizontal slit connecting to star tip */}
          <rect
            x="45.5"
            y="20.5"
            width="9.5"
            height="3"
            fill="#FFFFFF"
          />

          {/* L1 */}
          <path
            d="M 88 7 H 96 V 29 H 112 V 37 H 88 Z"
            fill={letterFill}
          />

          {/* L2 */}
          <path
            d="M 120 7 H 128 V 29 H 144 V 37 H 120 Z"
            fill={letterFill}
          />
        </g>
      </svg>
      {showTagline && (
        <div
          id="voll-logo-tagline"
          className="text-[0.52rem] font-sans font-extrabold tracking-[0.18em] text-voll-gold mt-1.5 uppercase leading-tight"
        >
          <div>Profesionales de la Urea</div>
          <div>Automotriz</div>
        </div>
      )}
    </div>
  );
}
