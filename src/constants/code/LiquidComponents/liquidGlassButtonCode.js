import code from '@content/LiquidComponents/LiquidGlassButton/LiquidGlassButton.jsx?raw';
import css from '@content/LiquidComponents/LiquidGlassButton/LiquidGlassButton.css?raw';

export const liquidGlassButton = {
  dependencies: `motion`,
  usage: `import LiquidGlassButton from './LiquidGlassButton'

<LiquidGlassButton
  variant="primary"
  size="medium"
  backgroundText="GLASS"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</LiquidGlassButton>

<LiquidGlassButton
  variant="secondary"
  size="large"
  backgroundText="BUTTON"
>
  Secondary
</LiquidGlassButton>

<LiquidGlassButton
  variant="ghost"
  size="small"
  disabled={true}
>
  Disabled
</LiquidGlassButton>`,
  code,
  css
};
