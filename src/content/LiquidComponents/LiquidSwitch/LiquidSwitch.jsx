import React, { useState } from 'react';
import { motion } from 'motion/react';
import './LiquidSwitch.css';

export default function LiquidSwitch({
  checked = false,
  onChange = () => {},
  disabled = false,
  size = 'medium',
  label = '',
  className = '',
  style = {}
}) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  const sizeClasses = {
    small: 'liquid-switch-sm',
    medium: 'liquid-switch-md',
    large: 'liquid-switch-lg'
  };

  return (
    <div className={`liquid-switch-wrapper ${className}`} style={style}>
      <button
        className={`liquid-switch ${sizeClasses[size]} ${isChecked ? 'liquid-switch-checked' : ''} ${disabled ? 'liquid-switch-disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        role="switch"
        aria-checked={isChecked}
      >
        <motion.div
          className="liquid-switch-handle"
          animate={{
            x: isChecked ? '100%' : '0%'
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        >
          <div className="liquid-switch-glow"></div>
        </motion.div>
        <div className="liquid-switch-background">
          <motion.div
            className="liquid-switch-fill"
            initial={{ scale: 0 }}
            animate={{ scale: isChecked ? 1 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
          />
        </div>
      </button>
      {label && <span className="liquid-switch-label">{label}</span>}
    </div>
  );
}
