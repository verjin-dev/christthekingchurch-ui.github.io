import React, { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ThreeDTilt: React.FC<ThreeDTiltProps> = ({ children, className = '', style, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
    transition: 'opacity 0.3s ease',
    zIndex: 3,
    borderRadius: 'inherit',
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    // Gentle tilt — reduced from 10 degrees to 5
    const rotateX = -normalizedY * 5;
    const rotateY = normalizedX * 5;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    );

    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0.6,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08) 0%, transparent 65%)`,
    }));
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: transformStyle || undefined,
        transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
        position: 'relative',
      }}
    >
      {/* Glare Overlay */}
      <div style={glareStyle} />

      {/* Content — flat, no translateZ to avoid layout quirks */}
      {children}
    </div>
  );
};
