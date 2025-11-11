import React, { useRef, useState, useId, useEffect } from 'react';
import { motion } from 'motion/react';
import './LiquidGlassButton.css';

export default function LiquidGlassButton({
  children = 'Click Me',
  onClick = () => {},
  variant = 'primary',
  size = 'medium',
  disabled = false,
  backgroundText = null,
  className = '',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `liquid-glass-btn-${uniqueId}`;

  const sizeClasses = {
    small: 'liquid-glass-btn-sm',
    medium: 'liquid-glass-btn-md',
    large: 'liquid-glass-btn-lg'
  };

  const variantClasses = {
    primary: 'liquid-glass-btn-primary',
    secondary: 'liquid-glass-btn-secondary',
    ghost: 'liquid-glass-btn-ghost'
  };

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 200;
    const actualHeight = rect?.height || 60;
    const borderRadius = size === 'small' ? 10 : size === 'large' ? 16 : 12;
    const edgeSize = Math.min(actualWidth, actualHeight) * 0.035;

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red-grad-${uniqueId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue-grad-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#red-grad-${uniqueId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#blue-grad-${uniqueId})" style="mix-blend-mode: difference" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    if (feImageRef.current && containerRef.current) {
      feImageRef.current.setAttribute('href', generateDisplacementMap());
    }
  };

  useEffect(() => {
    updateDisplacementMap();

    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // Display background text - use children as default if not provided
  const displayBackgroundText = backgroundText || children;

  return (
    <motion.button
      ref={containerRef}
      className={`liquid-glass-button ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'liquid-glass-btn-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...style,
        '--filter-id': `url(#${filterId})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25
      }}
    >
      {/* SVG Filter for Glass Effect */}
      <svg className="liquid-glass-button__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap in="SourceGraphic" in2="map" scale="-180" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap in="SourceGraphic" in2="map" scale="-170" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap in="SourceGraphic" in2="map" scale="-160" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      {/* Background Text Layer */}
      <div className="liquid-glass-button__background">
        <span className="liquid-glass-button__background-text">
          {displayBackgroundText}
        </span>
      </div>

      {/* Glass Surface Layer */}
      <div className="liquid-glass-button__glass">
        <motion.div
          className="liquid-glass-button__shimmer"
          animate={{
            x: isHovered ? '200%' : '-100%',
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0
          }}
          transition={{
            x: { duration: 0.8, ease: 'easeInOut' },
            opacity: { duration: 0.8, ease: 'easeInOut' }
          }}
        />
      </div>

      {/* Content Layer */}
      <span className="liquid-glass-button__content">{children}</span>
    </motion.button>
  );
}
