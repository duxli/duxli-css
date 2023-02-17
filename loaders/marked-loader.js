const { marked } = require('marked');
const fm = require('front-matter');
const { capitalize, words, kebabCase } = require('lodash');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

/**
 *
 * @param {string} name
 * @returns {string}
 */
function createHashCheck(name) {
  const hashName = kebabCase(name).toLowerCase();

  if (hashName === 'main' || hashName === 'home' || hashName === 'index') {
    return `!location.hash`;
  }

  return `location.hash === '${hashName}'`;
}

/**
 *
 * @param {string} name
 * @returns {string}
 */
function createDemoHandlerName(name) {
  return `handle${words(name).map(capitalize).join('')}`;
}

/**
 *
 * @param {string} html
 * @param {Record<string, string>}} attributes
 * @returns {string}
 */
function createDemo(html, attributes) {
  const { name } = attributes;
  const hashCheck = createHashCheck(name);
  const handlerName = createDemoHandlerName(name);

  return `
function ${handlerName}() {
  if (${hashCheck}) {
    document.getElementById('app').innerHTML = \`${html}\`;
  }
}

window.addEventListener('hashchange', ${handlerName}, false);
window.addEventListener('load', ${handlerName}, false);
`;
}

function loader(source) {
  const callback = this.async();

  const { attributes, body } = fm(source);

  marked(body, (error, html) => {
    if (error) {
      callback(error, '');
      return;
    }

    callback(error, createDemo(html, attributes));
  });
}

module.exports = loader;
