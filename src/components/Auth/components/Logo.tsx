import React from 'react';
import classNames from 'classnames';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={classNames('flex items-center justify-center', className)}>
      <svg
        className="h-full w-auto"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="8"
          className="fill-blue-600"
        />
        <path
          d="M30 35h40M30 50h40M30 65h20"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="30"
          r="15"
          className="fill-red-500"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="50" y="10" width="40" height="40">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#ef4444" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
        Hot Form
      </span>
    </div>
  );
};