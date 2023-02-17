/**
 *
 * @typedef {object} ElementAttributes
 * @property {string[]} classes
 * @property {boolean} disabled
 */

/**
 *
 * @typedef {object} StyleArgTypeOptions
 * @property {string} name
 * @property {string} description
 * @property {string[]} options
 */

function toPascalCase(value) {
  if (/^[a-z\d]+$/i.test(value)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value
    .replace(
      /([a-z\d])([a-z\d]*)/gi,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
    )
    .replace(/[^a-z\d]/gi, '');
}

/**
 * @param {object} args
 * @returns {string}
 */
export function generateAttributes(options) {
  const { disabled = false, ...styleArgs } = options;

  const classes = [];

  Object.entries(styleArgs).forEach(([key, value = '']) => {
    if (!key.startsWith('class')) return;

    classes.push(Array.isArray(value) ? value.join(' ') : value);
  });

  const className = classes.filter((cls) => !!cls).join(' ');

  const all = [
    className ? `class="${className}"` : '',
    !!disabled ? 'disabled' : '',
  ]
    .filter((attr) => !!attr)
    .join(' ')
    .trim();

  return all ? ` ${all}` : '';
}

/**
 * @param {object} args
 * @returns {string}
 */
export function generateHtml(args) {
  const { tag = 'div', innerHtml = '', ...attributeArgs } = args;

  return `<${tag}${generateAttributes(attributeArgs)}>${innerHtml}</${tag}>`;
}

const HTML_ELEMENTS = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'slot',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'template',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'webview',
];

/**
 * @param {StyleArgTypeOptions} props
 */
export function createStyleArgType(props) {
  const { name, options = [], description } = props;

  return {
    name,
    options,
    control: { type: 'check' },
    description,
    table: {
      category: 'Classes',
    },
  };
}

/**
 * @param {object} options
 * @param {string} options.tag
 * @param {string} options.innerHtml
 * @param {boolean} options.skipTag
 * @param {boolean} options.skipInnerHtml
 * @param {boolean} options.skipDisabled
 * @param {Record<string, StyleArgTypeOptions>} options.styleArgTypes
 */
export function createArgTypes(options) {
  const {
    tag,
    innerHtml = 'Example',
    skipTag = false,
    skipInnerHtml = false,
    skipDisabled = false,
    skipBaseClass = false,
    styleArgTypes = {},
  } = options;

  const argTypes = {};

  if (tag && !skipTag) {
    argTypes.tag = {
      description: 'Tag name of the element',
      defaultValue: tag,
      control: {
        type: 'select',
      },
      options: HTML_ELEMENTS,
    };
  }

  if (!skipInnerHtml) {
    argTypes.innerHtml = {
      control: { type: 'text' },
      defaultValue: innerHtml,
      description: 'Content of the element',
    };
  }

  if (tag && !skipBaseClass) {
    argTypes.classBase = createStyleArgType({
      name: 'Base Styles',
      options: [`dx-${tag}`],
      description: `This class is optional when using a <code>button</code> element.`,
    });
  }

  if (!skipDisabled) {
    argTypes.disabled = {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Sets the element to be disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: {
          summary: 'false',
        },
      },
    };
  }

  Object.entries(styleArgTypes).forEach(([key, opts]) => {
    const pascalKey = toPascalCase(key);
    const { name = pascalKey, ...otherOpts } = opts;
    argTypes[`class${pascalKey}`] = createStyleArgType({ name, ...otherOpts });
  });

  return argTypes;
}
