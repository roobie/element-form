
const tap = require('tap')
const test = tap.test

test('simple arithmetic', t => {
  t.equals(1 + 1, 2)
  t.end()
})
