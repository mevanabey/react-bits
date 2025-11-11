import code from '@content/LiquidComponents/LiquidButton/LiquidButton.jsx?raw';
import css from '@content/LiquidComponents/LiquidButton/LiquidButton.css?raw';

export const liquidButton = {
  dependencies: `motion`,
  usage: `import LiquidButton from './LiquidButton'

<LiquidButton
  variant="primary"
  size="medium"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</LiquidButton>

<LiquidButton
  variant="secondary"
  size="large"
>
  Secondary Button
</LiquidButton>

<LiquidButton
  variant="ghost"
  size="small"
  disabled={true}
>
  Disabled
</LiquidButton>`,
  code,
  css
};
