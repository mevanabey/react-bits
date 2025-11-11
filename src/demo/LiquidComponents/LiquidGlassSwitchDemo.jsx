import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import LiquidGlassSwitch from '../../content/LiquidComponents/LiquidGlassSwitch/LiquidGlassSwitch';
import { liquidGlassSwitch } from '../../constants/code/LiquidComponents/liquidGlassSwitchCode';

const LiquidGlassSwitchDemo = () => {
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
        <Box className="demo-container" minH={250} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={8}>
          <LiquidGlassSwitch
            checked={checked}
            onChange={setChecked}
            size={size}
            disabled={disabled}
            label={showLabel ? 'Enable Glass Mode' : ''}
          />

          <div style={{
            padding: '20px 32px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '8px' }}>
              Switch Status
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 700,
              color: checked ? 'rgba(82, 39, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {checked ? 'ON' : 'OFF'}
            </div>
          </div>

          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '13px',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            Features chromatic aberration glass effect with ON/OFF indicator visible through the surface.
            Hover to see the rotating shimmer effect on the handle.
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
        <CodeExample codeObject={liquidGlassSwitch} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidGlassSwitchDemo;
