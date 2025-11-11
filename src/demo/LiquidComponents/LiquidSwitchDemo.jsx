import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import LiquidSwitch from '../../content/LiquidComponents/LiquidSwitch/LiquidSwitch';
import { liquidSwitch } from '../../constants/code/LiquidComponents/liquidSwitchCode';

const LiquidSwitchDemo = () => {
  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState('medium');
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  const propData = [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is in the checked state.'
    },
    {
      name: 'onChange',
      type: 'function',
      default: '() => {}',
      description: 'Callback function called when the switch state changes.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the switch is disabled.'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'The size of the switch.'
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Optional label text displayed next to the switch.'
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
      description: 'Inline styles to apply to the wrapper.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box className="demo-container" minH={200} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={6}>
          <LiquidSwitch
            checked={checked}
            onChange={setChecked}
            size={size}
            disabled={disabled}
            label={showLabel ? 'Enable notifications' : ''}
          />

          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Switch is {checked ? 'ON' : 'OFF'}
          </div>
        </Box>

        <Customize>
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

          <PreviewSwitch
            title="Show Label"
            isChecked={showLabel}
            onChange={setShowLabel}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidSwitch} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidSwitchDemo;
