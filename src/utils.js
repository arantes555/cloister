'use strict'
import crypto from 'crypto'

export function randomString (length = 10) {
  return crypto.randomBytes(length).toString('base64').slice(0, length)
}

export function hash (data) {
  const myHash = crypto.createHash('sha256')
  myHash.update(data)
  return myHash.digest('base64')
}
