import code from '@content/LiquidComponents/LiquidSwitch/LiquidSwitch.jsx?raw';
import css from '@content/LiquidComponents/LiquidSwitch/LiquidSwitch.css?raw';

export const liquidSwitch = {
  dependencies: `motion`,
  usage: `import LiquidSwitch from './LiquidSwitch'
import { useState } from 'react'

const [isEnabled, setIsEnabled] = useState(false);

<LiquidSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  size="medium"
  label="Enable notifications"
/>

<LiquidSwitch
  checked={true}
  onChange={(value) => console.log('Switch:', value)}
  size="large"
/>

<LiquidSwitch
  checked={false}
  size="small"
  disabled={true}
  label="Disabled switch"
/>`,
  code,
  css
};
