'use strict'
/* global describe, it */
import { randomString, hash } from '../src/utils'
import { assert } from 'chai'

describe('utils', () => {
  it('randomString', () => {
    const str = randomString(15)
    assert.isString(str)
    assert.equal(str.length, 15)
    assert.match(str, /^[a-zA-Z0-9/+]+$/)
  })

  it('randomString default length', () => {
    const str = randomString()
    assert.isString(str)
    assert.equal(str.length, 10)
    assert.match(str, /^[a-zA-Z0-9/+]+$/)
  })

  it('hash', () => {
    const str = randomString()
    const strHash = hash(str)
    assert.isString(strHash)
    assert.equal(strHash, hash(str))
    assert.notEqual(strHash, hash(str + ' '))
  })
})
