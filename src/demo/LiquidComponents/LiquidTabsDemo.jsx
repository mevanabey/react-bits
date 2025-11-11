import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import LiquidTabs from '../../content/LiquidComponents/LiquidTabs/LiquidTabs';
import { liquidTabs } from '../../constants/code/LiquidComponents/liquidTabsCode';

const LiquidTabsDemo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 600 }}>Overview</h3>
          <p style={{ lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)' }}>
            This is the overview tab with fluid glass effect. The tabs feature smooth transitions
            and a beautiful glassmorphism design inspired by modern UI patterns.
          </p>
        </div>
      )
    },
    {
      label: 'Features',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 600 }}>Features</h3>
          <ul style={{ lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.7)', paddingLeft: '20px' }}>
            <li>Smooth spring animations</li>
            <li>Glassmorphism design</li>
            <li>Customizable content</li>
            <li>Accessible keyboard navigation</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Settings',
      content: (
        <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 600 }}>Settings</h3>
          <p style={{ lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)' }}>
            Configure your preferences and customize the appearance of your components.
            All settings are saved automatically.
          </p>
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
        <Box className="demo-container" minH={400} p={4}>
          <LiquidTabs
            tabs={tabs}
            defaultTab={activeTab}
            onChange={setActiveTab}
          />
        </Box>

        <Customize>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', padding: '12px 0' }}>
            Active tab: {tabs[activeTab]?.label}
          </div>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidTabs} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidTabsDemo;
