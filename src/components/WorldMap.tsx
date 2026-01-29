import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreatEvent, getSeverityColor } from '@/lib/threatSimulation';

interface WorldMapProps {
  activeAttacks: ThreatEvent[];
  className?: string;
}

// SVG path for simplified world map (mercator projection style)
const worldMapPath = `M 0,60 
  L 10,55 L 15,58 L 25,52 L 35,55 L 45,48 L 55,52 L 65,45 L 75,48 L 85,42 L 95,45 L 105,40 L 115,43 L 125,38 L 135,42 L 145,36 L 155,40 L 165,35 L 175,38 L 185,32 L 195,36 L 205,30 L 215,34 L 225,28 L 235,32 L 245,26 L 255,30 L 265,25 L 275,28 L 285,22 L 295,26 L 305,20 L 315,24 L 325,18 L 335,22 L 345,16 L 355,20 L 360,15
  L 360,85
  L 355,88 L 345,82 L 335,86 L 325,80 L 315,84 L 305,78 L 295,82 L 285,76 L 275,80 L 265,74 L 255,78 L 245,72 L 235,76 L 225,70 L 215,74 L 205,68 L 195,72 L 185,66 L 175,70 L 165,64 L 155,68 L 145,62 L 135,66 L 125,60 L 115,64 L 105,58 L 95,62 L 85,56 L 75,60 L 65,54 L 55,58 L 45,52 L 35,56 L 25,50 L 15,54 L 5,48 L 0,52
  Z`;

// Convert lat/lng to x/y on our map (simplified mercator)
function geoToPoint(lat: number, lng: number, width: number, height: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (mercN * height) / (2 * Math.PI);
  return { x, y: Math.max(10, Math.min(height - 10, y)) };
}

const WorldMap: React.FC<WorldMapProps> = ({ activeAttacks, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent animate-scan" />
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for attack lines */}
          <linearGradient id="attack-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--cyber-red))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--cyber-orange))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--cyber-yellow))" stopOpacity="0.3" />
          </linearGradient>

          {/* Radial gradient for pulse */}
          <radialGradient id="pulse-gradient">
            <stop offset="0%" stopColor="hsl(var(--cyber-red))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--cyber-red))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Simplified continent shapes */}
        <g className="continents" opacity="0.6">
          {/* North America */}
          <path
            d={`M ${width * 0.1},${height * 0.2} 
                Q ${width * 0.15},${height * 0.15} ${width * 0.22},${height * 0.18}
                Q ${width * 0.28},${height * 0.12} ${width * 0.25},${height * 0.25}
                Q ${width * 0.22},${height * 0.35} ${width * 0.18},${height * 0.45}
                Q ${width * 0.12},${height * 0.42} ${width * 0.08},${height * 0.35}
                Q ${width * 0.06},${height * 0.28} ${width * 0.1},${height * 0.2}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
          
          {/* South America */}
          <path
            d={`M ${width * 0.2},${height * 0.5} 
                Q ${width * 0.25},${height * 0.48} ${width * 0.28},${height * 0.55}
                Q ${width * 0.26},${height * 0.7} ${width * 0.22},${height * 0.85}
                Q ${width * 0.18},${height * 0.82} ${width * 0.17},${height * 0.7}
                Q ${width * 0.16},${height * 0.58} ${width * 0.2},${height * 0.5}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
          
          {/* Europe */}
          <path
            d={`M ${width * 0.42},${height * 0.18} 
                Q ${width * 0.48},${height * 0.15} ${width * 0.55},${height * 0.18}
                Q ${width * 0.58},${height * 0.22} ${width * 0.56},${height * 0.32}
                Q ${width * 0.5},${height * 0.35} ${width * 0.44},${height * 0.32}
                Q ${width * 0.4},${height * 0.26} ${width * 0.42},${height * 0.18}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
          
          {/* Africa */}
          <path
            d={`M ${width * 0.44},${height * 0.38} 
                Q ${width * 0.52},${height * 0.36} ${width * 0.58},${height * 0.42}
                Q ${width * 0.6},${height * 0.55} ${width * 0.55},${height * 0.72}
                Q ${width * 0.48},${height * 0.75} ${width * 0.45},${height * 0.68}
                Q ${width * 0.42},${height * 0.52} ${width * 0.44},${height * 0.38}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
          
          {/* Asia */}
          <path
            d={`M ${width * 0.55},${height * 0.15} 
                Q ${width * 0.7},${height * 0.12} ${width * 0.85},${height * 0.18}
                Q ${width * 0.9},${height * 0.28} ${width * 0.88},${height * 0.4}
                Q ${width * 0.78},${height * 0.48} ${width * 0.65},${height * 0.45}
                Q ${width * 0.58},${height * 0.38} ${width * 0.55},${height * 0.28}
                Q ${width * 0.54},${height * 0.2} ${width * 0.55},${height * 0.15}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
          
          {/* Australia */}
          <path
            d={`M ${width * 0.78},${height * 0.6} 
                Q ${width * 0.88},${height * 0.58} ${width * 0.9},${height * 0.68}
                Q ${width * 0.88},${height * 0.78} ${width * 0.8},${height * 0.75}
                Q ${width * 0.76},${height * 0.68} ${width * 0.78},${height * 0.6}
                Z`}
            fill="hsl(var(--cyber-cyan) / 0.1)"
            stroke="hsl(var(--cyber-cyan) / 0.4)"
            strokeWidth="1"
          />
        </g>

        {/* Grid lines */}
        <g className="grid-lines" opacity="0.15">
          {/* Latitude lines */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((y, i) => (
            <line
              key={`lat-${i}`}
              x1={0}
              y1={height * y}
              x2={width}
              y2={height * y}
              stroke="hsl(var(--cyber-cyan))"
              strokeWidth="0.5"
              strokeDasharray="5,5"
            />
          ))}
          {/* Longitude lines */}
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((x, i) => (
            <line
              key={`lng-${i}`}
              x1={width * x}
              y1={0}
              x2={width * x}
              y2={height}
              stroke="hsl(var(--cyber-cyan))"
              strokeWidth="0.5"
              strokeDasharray="5,5"
            />
          ))}
        </g>

        {/* Attack paths and points */}
        <AnimatePresence>
          {activeAttacks.map((attack) => {
            const source = geoToPoint(attack.source.lat, attack.source.lng, width, height);
            const target = geoToPoint(attack.target.lat, attack.target.lng, width, height);
            const midX = (source.x + target.x) / 2;
            const midY = Math.min(source.y, target.y) - 50; // Arc upward
            const color = getSeverityColor(attack.severity);

            return (
              <g key={attack.id}>
                {/* Attack arc path */}
                <motion.path
                  d={`M ${source.x},${source.y} Q ${midX},${midY} ${target.x},${target.y}`}
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow-red)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="attack-path"
                />

                {/* Source point (attacker) */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle
                    cx={source.x}
                    cy={source.y}
                    r="8"
                    fill={color}
                    opacity="0.3"
                    className="animate-attack-pulse"
                  />
                  <circle
                    cx={source.x}
                    cy={source.y}
                    r="4"
                    fill={color}
                    filter="url(#glow-red)"
                  />
                </motion.g>

                {/* Target point */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="10"
                    fill="none"
                    stroke={attack.blocked ? 'hsl(var(--cyber-green))' : color}
                    strokeWidth="2"
                    filter="url(#glow-cyan)"
                  />
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="4"
                    fill={attack.blocked ? 'hsl(var(--cyber-green))' : color}
                  />
                  
                  {/* Blocked indicator */}
                  {attack.blocked && (
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring' }}
                    >
                      <line
                        x1={target.x - 6}
                        y1={target.y - 6}
                        x2={target.x + 6}
                        y2={target.y + 6}
                        stroke="hsl(var(--cyber-green))"
                        strokeWidth="2"
                      />
                      <line
                        x1={target.x + 6}
                        y1={target.y - 6}
                        x2={target.x - 6}
                        y2={target.y + 6}
                        stroke="hsl(var(--cyber-green))"
                        strokeWidth="2"
                      />
                    </motion.g>
                  )}
                </motion.g>

                {/* Attack info label */}
                <motion.g
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <rect
                    x={source.x + 10}
                    y={source.y - 25}
                    width="100"
                    height="20"
                    rx="3"
                    fill="hsl(var(--cyber-dark) / 0.9)"
                    stroke={color}
                    strokeWidth="1"
                  />
                  <text
                    x={source.x + 15}
                    y={source.y - 11}
                    fill="hsl(var(--foreground))"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                  >
                    {attack.source.city}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </AnimatePresence>

        {/* Corner decorations */}
        <g className="corner-decorations" stroke="hsl(var(--cyber-cyan))" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M 5,20 L 5,5 L 20,5" />
          <path d={`M ${width - 5},20 L ${width - 5},5 L ${width - 20},5`} />
          <path d={`M 5,${height - 20} L 5,${height - 5} L 20,${height - 5}`} />
          <path d={`M ${width - 5},${height - 20} L ${width - 5},${height - 5} L ${width - 20},${height - 5}`} />
        </g>
      </svg>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyber-red pulse-threat" />
          <span>Active Attack</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyber-green" />
          <span>Blocked</span>
        </div>
      </div>

      {/* Satellite connection indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-dark/80 border border-cyber-cyan/30">
        <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
        <span className="text-xs font-mono text-cyber-cyan">SAT-LINK ACTIVE</span>
      </div>
    </div>
  );
};

export default WorldMap;
