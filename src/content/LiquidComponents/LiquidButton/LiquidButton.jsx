import React from 'react';
import { motion } from 'motion/react';
import './LiquidButton.css';

export default function LiquidButton({
  children = 'Click Me',
  onClick = () => {},
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  style = {}
}) {
  const sizeClasses = {
    small: 'liquid-btn-sm',
    medium: 'liquid-btn-md',
    large: 'liquid-btn-lg'
  };

  const variantClasses = {
    primary: 'liquid-btn-primary',
    secondary: 'liquid-btn-secondary',
    ghost: 'liquid-btn-ghost'
  };

  return (
    <motion.button
      className={`liquid-button ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'liquid-btn-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={style}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
    >
      <span className="liquid-button-content">{children}</span>
      <div className="liquid-button-glow"></div>
      <div className="liquid-button-shine"></div>
    </motion.button>
  );
}
