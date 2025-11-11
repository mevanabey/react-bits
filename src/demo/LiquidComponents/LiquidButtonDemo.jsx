import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import LiquidButton from '../../content/LiquidComponents/LiquidButton/LiquidButton';
import { liquidButton } from '../../constants/code/LiquidComponents/liquidButtonCode';

const LiquidButtonDemo = () => {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('medium');
  const [disabled, setDisabled] = useState(false);

  const propData = [
    {
      name: 'children',
      type: 'ReactNode',
      default: "'Click Me'",
      description: 'The content inside the button.'
    },
    {
      name: 'onClick',
      type: 'function',
      default: '() => {}',
      description: 'Function to call when the button is clicked.'
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost'",
      default: "'primary'",
      description: 'The visual style variant of the button.'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'The size of the button.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled.'
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
      description: 'Inline styles to apply to the button.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box className="demo-container" minH={200} display="flex" alignItems="center" justifyContent="center" gap={4}>
          <LiquidButton
            variant={variant}
            size={size}
            disabled={disabled}
            onClick={() => alert('Button clicked!')}
          >
            Click Me
          </LiquidButton>
        </Box>

        <Customize>
          <PreviewSelect
            title="Variant"
            options={[
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'ghost', label: 'Ghost' }
            ]}
            value={variant}
            onChange={setVariant}
          />

          <PreviewSelect
            title="Size"
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ]}
            value={size}
            onChange={setSize}
          />

          <PreviewSwitch
            title="Disabled"
            isChecked={disabled}
            onChange={setDisabled}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidButton} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidButtonDemo;
