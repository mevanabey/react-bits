import code from '@content/LiquidComponents/LiquidGlassSwitch/LiquidGlassSwitch.jsx?raw';
import css from '@content/LiquidComponents/LiquidGlassSwitch/LiquidGlassSwitch.css?raw';

export const liquidGlassSwitch = {
  dependencies: `motion`,
  usage: `import LiquidGlassSwitch from './LiquidGlassSwitch'
import { useState } from 'react'

const [isEnabled, setIsEnabled] = useState(false);

<LiquidGlassSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  size="medium"
  label="Enable Glass Mode"
/>

<LiquidGlassSwitch
  checked={true}
  onChange={(value) => console.log('Switch:', value)}
  size="large"
/>

<LiquidGlassSwitch
  checked={false}
  size="small"
  disabled={true}
  label="Disabled switch"
/>`,
  code,
  css
};
