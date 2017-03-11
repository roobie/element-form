const html = require('bel')
const component = require('nanocomponent')

const defaults = {
  required: () => false,
  type: 'text'
}

function findParentForm (el) {
  if (el.parentNode) {
    if (el.parentNode.nodeName.toLowerCase() === 'form') {
      return el.parentNode
    }
    return findParentForm(el.parentNode)
  }
  throw new Error('no ancestor of this element is a FORM')
}

function updateForm (form, state) {
  for (let validationName in state.validation) {
    const cfg = state.validation[validationName]
    const checkFunc = typeof cfg === 'function' ? cfg : cfg.check
    const check = checkFunc(state.value)
    const className = `${validationName}-${check ? 'ok' : 'err'}`

    if (!check) {
      form.className += ` ${className}`
    }
  }
}

const Input = () => {
  let parentForm = null
  let lastState = null

  return component({
    onload: function (el) {
      parentForm = findParentForm(el)
      updateForm(parentForm, lastState)
    },
    onunload: function (el) {
      parentForm = null
    },
    render: function (state) {
      lastState = state
      const classes = []
      const messages = []
      for (let validationName in state.validation) {
        const cfg = state.validation[validationName]
        const checkFunc = typeof cfg === 'function' ? cfg : cfg.check
        const check = checkFunc(state.value)
        if (!check) {
          const className = `${validationName}-${check ? 'ok' : 'err'}`
          classes.push(className)
          if (cfg.errMsg) {
            messages.push(cfg.errMsg)
          }
          if (parentForm) {
            if (!parentForm.className.includes(validationName)) {
              parentForm.className += ` ${className}`
            }
          }
        }
      }
      return html`
      <div>
        <div>
          <input
            class="${classes.join(' ')}"
            required=${(state.required || defaults.required)()}
            type="${state.type || defaults.type}"
            value="${state.value}"/>
        </div>
        <div>
          ${messages}
        </div>
      </div>`
    }
  })
}
Input.defaults = defaults

module.exports = Input
