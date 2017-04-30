/* @flow weak */
import frontMatter from 'front-matter'
import asciiDoctor from 'asciidoctor.js'
import objectAssign from 'object-assign'

module.exports = function(content) {
  this.cacheable()

  const asciidoctor = asciiDoctor();
  const meta = frontMatter(content)
  const opts = { safe: 'server', attributes: ['skip-front-matter'] };
  const body = asciidoctor.convert(content, opts);
  const result = objectAssign({}, meta.attributes, {
    body,
  })
  this.value = result
  return `module.exports = ${JSON.stringify(result)}`
}
