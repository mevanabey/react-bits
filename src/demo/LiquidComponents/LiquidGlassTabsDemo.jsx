import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import LiquidGlassTabs from '../../content/LiquidComponents/LiquidGlassTabs/LiquidGlassTabs';
import { liquidGlassTabs } from '../../constants/code/LiquidComponents/liquidGlassTabsCode';

const LiquidGlassTabsDemo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Overview</h3>
          <p style={{ lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)' }}>
            Experience Apple's Liquid Glass design language with chromatic aberration effects.
            The glass surface creates a beautiful lens distortion that shifts RGB channels,
            simulating the refraction of light through real glass. Background text appears
            behind the glass layer with subtle distortion effects.
          </p>
        </div>
      )
    },
    {
      label: 'Features',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Features</h3>
          <ul style={{ lineHeight: 2, color: 'rgba(255, 255, 255, 0.75)', paddingLeft: '24px' }}>
            <li>Chromatic aberration with RGB channel separation</li>
            <li>Dynamic shimmer effects on hover</li>
            <li>Layered depth with background text distortion</li>
            <li>Smooth spring-based tab transitions</li>
            <li>Responsive glass morphing based on size</li>
            <li>Inspired by visionOS design language</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Settings',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 600 }}>Settings</h3>
          <p style={{ lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)', marginBottom: '16px' }}>
            Customize the appearance and behavior of your liquid glass components. The material
            adapts to surrounding content and intelligently responds to user interaction.
          </p>
          <div style={{
            padding: '16px',
            background: 'rgba(82, 39, 255, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(82, 39, 255, 0.2)'
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              💡 Tip: Hover over tabs to see the dynamic shimmer effect and chromatic aberration in action.
            </p>
          </div>
        </div>
      )
    }
  ];

  const propData = [
    {
      name: 'tabs',
      type: 'array',
      default: '[]',
      description: 'Array of tab objects with `label` and `content` properties.'
    },
    {
      name: 'defaultTab',
      type: 'number',
      default: '0',
      description: 'Index of the initially active tab.'
    },
    {
      name: 'onChange',
      type: 'function',
      default: '() => {}',
      description: 'Callback function called when the active tab changes.'
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes to apply.'
    },
    {
      name: 'style',
      type: 'object',
      default: '{}',
      description: 'Inline styles to apply to the container.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box className="demo-container" minH={450} p={4}>
          <LiquidGlassTabs
            tabs={tabs}
            defaultTab={activeTab}
            onChange={setActiveTab}
          />
        </Box>

        <Customize>
          <div style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '12px 0' }}>
            Active tab: <strong>{tabs[activeTab]?.label}</strong>
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginTop: '8px' }}>
            The active tab features a glass surface with chromatic aberration effect
          </div>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidGlassTabs} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidGlassTabsDemo;
