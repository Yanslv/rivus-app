
import React from 'react';
import { LifeArea } from '../types';

interface WheelOfLifeProps {
  areas: LifeArea[];
}

const WheelOfLife: React.FC<WheelOfLifeProps> = ({ areas }) => {
  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 20;

  // Calculate coordinates for a score at a given angle
  const getCoords = (score: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (score / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate grid circles
  const gridCircles = [2, 4, 6, 8, 10].map(s => {
    const r = (s / 10) * radius;
    return <circle key={s} cx={center} cy={center} r={r} className="fill-none stroke-border/30" strokeWidth="1" />;
  });

  // Generate axis lines
  const axisLines = areas.map((_, i) => {
    const coords = getCoords(10, i, areas.length);
    return <line key={i} x1={center} y1={center} x2={coords.x} y2={coords.y} className="stroke-border/30" strokeWidth="1" />;
  });

  // Generate data polygon
  const points = areas.map((a, i) => {
    const coords = getCoords(a.score, i, areas.length);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Labels
  const labels = areas.map((a, i) => {
    const coords = getCoords(11.5, i, areas.length);
    return (
      <text 
        key={i} 
        x={coords.x} 
        y={coords.y} 
        textAnchor="middle" 
        alignmentBaseline="middle" 
        className="fill-muted font-bold text-[8px] uppercase tracking-widest"
      >
        {a.name}
      </text>
    );
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible drop-shadow-[0_0_20px_rgba(19,236,128,0.1)]">
      {gridCircles}
      {axisLines}
      {/* Previous data placeholder - semi-transparent */}
      <polygon 
        points={areas.map((a, i) => {
           const coords = getCoords(a.score - 1.2, i, areas.length);
           return `${coords.x},${coords.y}`;
        }).join(' ')}
        className="fill-none stroke-muted/20"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />
      {/* Current data */}
      <polygon 
        points={points} 
        className="fill-primary/20 stroke-primary transition-all duration-500" 
        strokeWidth="2.5" 
      />
      {areas.map((a, i) => {
        const coords = getCoords(a.score, i, areas.length);
        return <circle key={i} cx={coords.x} cy={coords.y} r="3.5" className="fill-primary transition-all duration-500 shadow-xl" />;
      })}
      {labels}
    </svg>
  );
};

export default WheelOfLife;
