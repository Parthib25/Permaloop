import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  hideText?: boolean;
  showTagline?: boolean;
}

export default function Logo({ 
  className = '', 
  size = 32, 
  hideText = false, 
  showTagline = false 
}: LogoProps) {
  const width = size;
  const height = size * 0.5;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <path
          d="M25 10C16.7157 10 10 16.7157 10 25C10 33.2843 16.7157 40 25 40C31.5 40 37 35.5 41 30L59 20C63 14.5 68.5 10 75 10C83.2843 10 90 16.7157 90 25C90 33.2843 83.2843 40 75 40C68.5 40 63 35.5 59 30L41 20C37 14.5 31.5 10 25 10Z"
          stroke="url(#permaloop-logo-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="permaloop-logo-gradient"
            x1="10"
            y1="25"
            x2="90"
            y2="25"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2563eb" /> {/* Blue */}
            <stop offset="45%" stopColor="#a3e635" /> {/* Yellow-Green */}
            <stop offset="100%" stopColor="#f59e0b" /> {/* Chrome Yellow */}
          </linearGradient>
        </defs>
      </svg>
      {!hideText && (
        <div className="flex flex-col">
          <span className="font-bold text-white text-xl tracking-tight leading-none">Permaloop</span>
          {showTagline && (
            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mt-1">
              by Parthib Goswami
            </span>
          )}
        </div>
      )}
    </div>
  );
}
