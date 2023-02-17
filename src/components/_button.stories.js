import { generateHtml, createArgTypes } from '../_storybook/util';
import '../styles.scss';

export default {
  title: 'components/Button',
  argTypes: createArgTypes({
    tag: 'button',
    styleArgTypes: {
      variant: {
        options: ['dx-button--variant-outlined'],
        description:
          'This class is optional when using a button or input with the type "button", "submit", or "reset"',
      },
    },
  }),
};

export const Button = (args) => generateHtml(args);

Button.parameters = {
  docs: { source: { type: 'dynamic' } },
};
