const html = require('bel')
const component = require('nanocomponent')

const Form = () => component({
  render: function (state, subTree) {
    return html`
    <form>
      ${subTree}
    </form>`
  }
})
module.exports = Form
