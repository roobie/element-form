// const html = require('bel')

const Form = require('./form')
const Input = require('./input')

document.addEventListener('DOMContentLoaded', function () {
  const root = document.body

  const input1 = Input()
  const input2 = Input()
  const input3 = Input()
  const form = Form()
  const tree = form({}, [
    input1({
      value: 'Crap!',
      validation: {
        noNumbers: (v) => !/\d+/.test(v)
      }
    }),
    input2({
      value: 'Hello, world!',
      required: () => true,
      validation: {
        minLength: {
          check: (v) => v.length > 3,
          errMsg: 'Must be at least 3 characters long'
        },
        maxLength: {
          check: (v) => v.length < 5,
          errMsg: 'Cannot have more than 5 characters'
        }
      }
    }),
    input3({
      value: 'oops',
      type: 'number'
    })
  ])

  root.appendChild(tree)
})
