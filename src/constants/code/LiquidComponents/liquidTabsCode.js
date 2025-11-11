import code from '@content/LiquidComponents/LiquidTabs/LiquidTabs.jsx?raw';
import css from '@content/LiquidComponents/LiquidTabs/LiquidTabs.css?raw';

export const liquidTabs = {
  dependencies: `motion`,
  usage: `import LiquidTabs from './LiquidTabs'

const tabs = [
  {
    label: 'Overview',
    content: <div>Overview content here</div>
  },
  {
    label: 'Features',
    content: <div>Features content here</div>
  },
  {
    label: 'Settings',
    content: <div>Settings content here</div>
  }
];

<LiquidTabs
  tabs={tabs}
  defaultTab={0}
  onChange={(index) => console.log('Tab changed to:', index)}
/>`,
  code,
  css
};
