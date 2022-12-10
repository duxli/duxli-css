import { generateHtml, createArgTypes } from '../_storybook/util';
import '../styles.scss';

export default {
  title: 'components/Typography',
  argTypes: createArgTypes({
    innerHtml: 'The quick brown fox jumps over the lazy dog',
    skipDisabled: true,
  }),
};

export const Typography = ({ innerHtml }) => `
<p>${innerHtml}</p>

<!-- Other elements to text markup -->
<div>
  <a href="">Anchor/Link</a>
</div>

<div>
  <em>Emphasis</em>
</div>

<div>
  <small>Small</small>
</div>

<div>
  <strong>Strong</strong>
</div>

<div>
  <u>Underline</u>
</div>

<!-- Default Headings -->
<h1>Heading <code>h1</code></h1>
<h2>Heading <code>h1</code></h2>
<h3>Heading <code>h1</code></h3>
<h4>Heading <code>h1</code></h4>
<h5>Heading <code>h1</code></h5>
<h6>Heading <code>h1</code></h6>
`;

Typography.parameters = {
  docs: { source: { type: 'dynamic' } },
};
