'use strict'
/* global describe, before, it */
import _User from '../src/models/User'
import { assert } from 'chai'
import DataBase from '@seald/uodm'
import jetpack from 'fs-jetpack'

const tmpdir = jetpack.dir('./tmp', {empty: true})

describe('User', () => {
  let DB, User
  before(() => {
    DB = DataBase(tmpdir.path())
    User = _User(DB)
    return DB.open()
  })

  it('checkPassword', async () => {
    const myUser = await User.register('myUser', 'mySecretPassword')
    assert.isFalse(myUser.checkPassword('notMyPassword'))
    assert.isTrue(myUser.checkPassword('mySecretPassword'))
    assert.isFalse(await User.checkPassword('myUser', 'notMyPassword'))
    assert.isTrue(await User.checkPassword('myUser', 'mySecretPassword'))
    assert.isFalse(await User.checkPassword('notMyUser', 'notMyPassword'))
  })
})
