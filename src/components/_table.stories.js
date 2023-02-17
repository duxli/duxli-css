import { generateHtml, createArgTypes } from '../_storybook/util';
import '../styles.scss';

export default {
  title: 'components/Table',
  argTypes: createArgTypes({
    tag: 'table',
    skipDisabled: true,
    skipInnerHtml: true,
    skipTag: true,
    skipBaseClass: true,
  }),
};

const tableContent = `
  <thead>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </tbody>
`;

export const Table = () =>
  generateHtml({ tag: 'table', innerHtml: tableContent });

Table.parameters = {
  docs: { source: { type: 'dynamic' } },
};
