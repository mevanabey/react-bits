import React, { useState, useRef, useId, useEffect } from 'react';
import { motion } from 'motion/react';
import './LiquidGlassSwitch.css';

export default function LiquidGlassSwitch({
  checked = false,
  onChange = () => {},
  disabled = false,
  size = 'medium',
  label = '',
  className = '',
  style = {}
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `liquid-glass-switch-${uniqueId}`;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const sizeClasses = {
    small: 'liquid-glass-switch-sm',
    medium: 'liquid-glass-switch-md',
    large: 'liquid-glass-switch-lg'
  };

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 60;
    const actualHeight = rect?.height || 32;
    const borderRadius = 100;
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

  return (
    <div className={`liquid-glass-switch-wrapper ${className}`} style={style}>
      <button
        ref={containerRef}
        className={`liquid-glass-switch ${sizeClasses[size]} ${isChecked ? 'liquid-glass-switch-checked' : ''} ${disabled ? 'liquid-glass-switch-disabled' : ''}`}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        role="switch"
        aria-checked={isChecked}
        style={{
          '--filter-id': `url(#${filterId})`
        }}
      >
        {/* SVG Filter for Glass Effect */}
        <svg className="liquid-glass-switch__filter" xmlns="http://www.w3.org/2000/svg">
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

        {/* Background Layer */}
        <div className="liquid-glass-switch__background">
          <motion.div
            className="liquid-glass-switch__background-indicator"
            animate={{
              x: isChecked ? '100%' : '0%',
              opacity: isChecked ? 1 : 0.3
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
          />
          <span className="liquid-glass-switch__background-text">
            {isChecked ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Glass Handle */}
        <motion.div
          className="liquid-glass-switch-handle"
          animate={{
            x: isChecked ? '100%' : '0%'
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        >
          <motion.div
            className="liquid-glass-switch-handle-shimmer"
            animate={{
              rotate: isHovered ? 180 : 0,
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2
            }}
            transition={{
              rotate: { duration: 0.8, ease: 'easeInOut' },
              opacity: { duration: 0.8, ease: 'easeInOut', repeat: Infinity }
            }}
          />
        </motion.div>
      </button>
      {label && <span className="liquid-glass-switch-label">{label}</span>}
    </div>
  );
}
