import code from '@content/LiquidComponents/LiquidGlassTabs/LiquidGlassTabs.jsx?raw';
import css from '@content/LiquidComponents/LiquidGlassTabs/LiquidGlassTabs.css?raw';

export const liquidGlassTabs = {
  dependencies: `motion`,
  usage: `import LiquidGlassTabs from './LiquidGlassTabs'

const tabs = [
  {
    label: 'Overview',
    content: (
      <div>
        <h3>Overview</h3>
        <p>Experience Apple's Liquid Glass design with chromatic aberration.</p>
      </div>
    )
  },
  {
    label: 'Features',
    content: (
      <div>
        <h3>Features</h3>
        <ul>
          <li>Chromatic aberration effects</li>
          <li>Dynamic shimmer on hover</li>
          <li>Background text distortion</li>
        </ul>
      </div>
    )
  },
  {
    label: 'Settings',
    content: <div>Settings content here</div>
  }
];

<LiquidGlassTabs
  tabs={tabs}
  defaultTab={0}
  onChange={(index) => console.log('Tab changed to:', index)}
/>`,
  code,
  css
};
