import React, { useState, useRef, useId, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './LiquidGlassTabs.css';

export default function LiquidGlassTabs({
  tabs = [],
  defaultTab = 0,
  onChange = () => {},
  className = '',
  style = {}
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [hoveredTab, setHoveredTab] = useState(null);
  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `liquid-glass-tabs-${uniqueId}`;

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange(index);
  };

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 50;
    const borderRadius = 12;
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
  }, []);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className={`liquid-glass-tabs-container ${className}`} style={style}>
      <div
        ref={containerRef}
        className="liquid-glass-tabs-list"
        style={{
          '--filter-id': `url(#${filterId})`
        }}
      >
        {/* SVG Filter for Glass Effect */}
        <svg className="liquid-glass-tabs__filter" xmlns="http://www.w3.org/2000/svg">
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
        <div className="liquid-glass-tabs__background">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`liquid-glass-tabs__background-text ${activeTab === index ? 'active' : ''}`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tabs Layer */}
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`liquid-glass-tab ${activeTab === index ? 'liquid-glass-tab-active' : ''}`}
            onClick={() => handleTabChange(index)}
            onMouseEnter={() => setHoveredTab(index)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {activeTab === index && (
              <motion.div
                className="liquid-glass-tab-background"
                layoutId="activeGlassTab"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              >
                <motion.div
                  className="liquid-glass-tab-shimmer"
                  animate={{
                    x: hoveredTab === index ? '200%' : '-100%',
                    opacity: hoveredTab === index ? [0.3, 0.6, 0.3] : 0
                  }}
                  transition={{
                    x: { duration: 0.8, ease: 'easeInOut' },
                    opacity: { duration: 0.8, ease: 'easeInOut' }
                  }}
                />
              </motion.div>
            )}
            <span className="liquid-glass-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="liquid-glass-tabs-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="liquid-glass-tab-panel"
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
