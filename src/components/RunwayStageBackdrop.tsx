import React from 'react';

export interface RunwayStageBackdropProps {
  className?: string;
  overlayOpacity?: string;
}

export const RunwayStageBackdrop: React.FC<RunwayStageBackdropProps> = ({
  className = 'w-full h-full object-cover',
  overlayOpacity = 'opacity-35'
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden select-none pointer-events-none">
      {/* SVG Canvas Catwalk Runway with Numbered Cards and Stage Lasers matching the user image */}
      <svg
        viewBox="0 0 1600 900"
        className={`${className} ${overlayOpacity} filter contrast-125 saturate-125`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Laser Gradients */}
          <linearGradient id="laserCyan" x1="50%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laserMagenta" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0844" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffb199" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="laserGreen" x1="50%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#00ff87" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60efff" stopOpacity="0" />
          </linearGradient>

          {/* Runway Surface Gradient */}
          <linearGradient id="runwayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#3b0764" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#831843" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#9f1239" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4c0519" stopOpacity="1" />
          </linearGradient>

          {/* Runway Neon Edge Glow */}
          <linearGradient id="neonEdgeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="centerStageGlow" cx="50%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#c026d3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Deep Nightclub Background */}
        <rect width="1600" height="900" fill="#09090b" />
        <rect width="1600" height="900" fill="url(#centerStageGlow)" />

        {/* Palm Trees & Crowd Silhouettes in the wings */}
        <g opacity="0.35">
          {/* Left Palms */}
          <path d="M 80,450 Q 50,250 150,150 Q 180,220 200,320 Q 150,200 280,180 Q 230,260 210,380 Z" fill="#10b981" />
          <path d="M 120,500 Q 20,380 90,280 Q 140,320 160,420 Z" fill="#059669" />
          {/* Right Palms */}
          <path d="M 1520,450 Q 1550,250 1450,150 Q 1420,220 1400,320 Q 1450,200 1320,180 Q 1370,260 1390,380 Z" fill="#10b981" />
          <path d="M 1480,500 Q 1580,380 1510,280 Q 1460,320 1440,420 Z" fill="#059669" />
        </g>

        {/* Background Laser Fan Beams from Center Stage Spotlight */}
        <g opacity="0.75">
          <polygon points="800,180 0,60 0,90" fill="url(#laserCyan)" />
          <polygon points="800,180 0,250 0,280" fill="url(#laserCyan)" />
          <polygon points="800,180 0,450 0,490" fill="url(#laserCyan)" />
          <polygon points="800,180 1600,60 1600,90" fill="url(#laserMagenta)" />
          <polygon points="800,180 1600,250 1600,280" fill="url(#laserMagenta)" />
          <polygon points="800,180 1600,450 1600,490" fill="url(#laserMagenta)" />
          <polygon points="800,180 300,900 350,900" fill="url(#laserGreen)" opacity="0.5" />
          <polygon points="800,180 1300,900 1250,900" fill="url(#laserGreen)" opacity="0.5" />
        </g>

        {/* Central Runway / Catwalk Perspective */}
        <polygon points="760,280 840,280 1180,900 420,900" fill="url(#runwayGrad)" />

        {/* Runway Neon Edge Strips */}
        <polygon points="755,280 765,280 430,900 410,900" fill="#f43f5e" />
        <polygon points="835,280 845,280 1190,900 1170,900" fill="#38bdf8" />

        {/* Stage Center Runway Light Track */}
        <polygon points="796,280 804,280 810,900 790,900" fill="#fbbf24" opacity="0.8" />

        {/* Cheering VIP Crowd & Leather Booths Perspective (Left & Right) */}
        <g opacity="0.6">
          {/* Left VIP Booths */}
          <path d="M 0,600 Q 180,580 380,680 L 320,900 L 0,900 Z" fill="#18181b" />
          <ellipse cx="220" cy="620" rx="35" ry="30" fill="#27272a" />
          <ellipse cx="310" cy="660" rx="40" ry="35" fill="#27272a" />
          <ellipse cx="140" cy="680" rx="45" ry="40" fill="#27272a" />
          <ellipse cx="260" cy="740" rx="55" ry="45" fill="#3f3f46" />

          {/* Right VIP Booths */}
          <path d="M 1600,600 Q 1420,580 1220,680 L 1280,900 L 1600,900 Z" fill="#18181b" />
          <ellipse cx="1380" cy="620" rx="35" ry="30" fill="#27272a" />
          <ellipse cx="1290" cy="660" rx="40" ry="35" fill="#27272a" />
          <ellipse cx="1460" cy="680" rx="45" ry="40" fill="#27272a" />
          <ellipse cx="1340" cy="740" rx="55" ry="45" fill="#3f3f46" />
        </g>

        {/* Line of Performers on the Runway Holding Number Auction Cards */}
        {/* Model 5 (Farthest back) */}
        <g transform="translate(800, 320)" opacity="0.85">
          <ellipse cx="0" cy="20" rx="6" ry="16" fill="#fbcfe8" />
          <circle cx="0" cy="-2" r="5" fill="#fed7aa" />
          {/* Number 1 Card */}
          <rect x="-6" y="-22" width="12" height="15" rx="1" fill="#ffffff" stroke="#000" strokeWidth="0.5" />
          <text x="0" y="-11" fontSize="10" fontWeight="900" fill="#000" textAnchor="middle" fontFamily="sans-serif">1</text>
        </g>

        {/* Model 4 */}
        <g transform="translate(790, 370)" opacity="0.9">
          <ellipse cx="0" cy="26" rx="9" ry="22" fill="#fbcfe8" />
          <circle cx="0" cy="-3" r="7" fill="#fed7aa" />
          {/* Number 3 Card */}
          <rect x="-8" y="-30" width="16" height="20" rx="2" fill="#ffffff" stroke="#000" strokeWidth="0.5" />
          <text x="0" y="-15" fontSize="13" fontWeight="900" fill="#000" textAnchor="middle" fontFamily="sans-serif">3</text>
        </g>

        {/* Model 3 */}
        <g transform="translate(810, 440)" opacity="0.95">
          <ellipse cx="0" cy="35" rx="12" ry="30" fill="#fbcfe8" />
          <circle cx="0" cy="-5" r="9" fill="#fed7aa" />
          {/* Number 5 Card */}
          <rect x="-11" y="-40" width="22" height="26" rx="2" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
          <text x="0" y="-21" fontSize="17" fontWeight="900" fill="#000" textAnchor="middle" fontFamily="sans-serif">5</text>
        </g>

        {/* Model 2 */}
        <g transform="translate(775, 520)">
          {/* Silhouette body */}
          <ellipse cx="0" cy="48" rx="18" ry="42" fill="#fed7aa" />
          <path d="M -16,40 Q -24,80 -10,120 L 0,120 Q -4,80 0,40 Z" fill="#fdba74" />
          <path d="M 16,40 Q 24,80 10,120 L 0,120 Q 4,80 0,40 Z" fill="#fdba74" />
          <circle cx="0" cy="-8" r="13" fill="#fcd34d" />
          {/* Long flowing hair */}
          <path d="M -12,-8 Q -20,25 -8,55 Q 0,20 12,-8 Z" fill="#78350f" />
          {/* Number 2 Card */}
          <g transform="translate(25, -55)">
            <rect x="-16" y="-22" width="34" height="42" rx="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
            <text x="1" y="8" fontSize="26" fontWeight="900" fill="#18181b" textAnchor="middle" fontFamily="Arial, sans-serif">2</text>
          </g>
        </g>

        {/* Model 1 (Lead Catwalk Performer - Closest in foreground) */}
        <g transform="translate(620, 600)">
          {/* Head & Glamour Long Hair */}
          <circle cx="0" cy="-35" r="22" fill="#fcd34d" />
          <path d="M -22,-35 Q -36,25 -15,80 Q 0,30 20,-35 Z" fill="#451a03" />

          {/* Sensual Catwalk Silhouette & Form */}
          <path d="M -24,-10 Q -32,45 -38,95 Q -40,140 -20,175 Q 0,185 20,175 Q 38,140 32,95 Q 26,45 22,-10 Z" fill="#fed7aa" />
          <ellipse cx="-15" cy="140" rx="20" ry="24" fill="#fb923c" opacity="0.4" />
          <ellipse cx="15" cy="140" rx="20" ry="24" fill="#fb923c" opacity="0.4" />

          {/* Long Legs in High Heels */}
          <path d="M -26,170 Q -35,240 -30,300 L -18,300 Q -15,240 -10,170 Z" fill="#fde047" opacity="0.8" />
          <path d="M 12,170 Q 18,235 24,285 L 34,285 Q 30,225 24,170 Z" fill="#fde047" opacity="0.9" />
          {/* High Stiletto Heels */}
          <polygon points="-30,295 -25,295 -28,320" fill="#f43f5e" />
          <polygon points="26,280 32,280 30,305" fill="#f43f5e" />

          {/* Left Arm Raised Holding High Number 7 Auction Card */}
          <path d="M 20,10 Q 55,-30 75,-90" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" fill="none" />
          <g transform="translate(85, -120)">
            <rect x="-24" y="-30" width="50" height="62" rx="4" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
            <text x="1" y="14" fontSize="42" fontWeight="900" fill="#09090b" textAnchor="middle" fontFamily="Impact, Arial Black, sans-serif">7</text>
          </g>
        </g>

        {/* Bottom Tag 18+ / 21+ ADULTS ONLY */}
        <g transform="translate(60, 850)">
          <rect x="0" y="0" width="130" height="26" rx="4" fill="#000000" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1" />
          <text x="65" y="17" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle" fontFamily="monospace">🔞 ADULTS 21+</text>
        </g>
      </svg>
    </div>
  );
};
