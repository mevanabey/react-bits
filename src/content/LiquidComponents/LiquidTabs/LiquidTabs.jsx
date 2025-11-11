import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './LiquidTabs.css';

export default function LiquidTabs({
  tabs = [],
  defaultTab = 0,
  onChange = () => {},
  className = '',
  style = {}
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange(index);
  };

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className={`liquid-tabs-container ${className}`} style={style}>
      <div className="liquid-tabs-list">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`liquid-tab ${activeTab === index ? 'liquid-tab-active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            {activeTab === index && (
              <motion.div
                className="liquid-tab-background"
                layoutId="activeTab"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
            <span className="liquid-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="liquid-tabs-content">
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
            className="liquid-tab-panel"
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
