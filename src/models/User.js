'use strict'
import { randomString, hash } from '../utils'
import * as Joi from 'joi'

const UserSchema = Joi.object({
  username: Joi.string().required(),
  hashedPassword: Joi.string().required(),
  salt: Joi.string().required(),
  created: Joi.date().default(() => new Date(), 'new Date()')
})

export default DB =>
  class User extends DB.AbstractDocument {
    constructor (object) {
      super(object)
      const validated = Joi.validate(object, UserSchema, {allowUnknown: true})
      if (validated.error) throw validated.error

      let {username, hashedPassword, salt, created} = validated.value
      this.username = username
      this.hashedPassword = hashedPassword
      this.salt = salt
      this.created = created
    }

    static async register (username, password) {
      const salt = randomString()
      const hashedPassword = hash(salt + password)
      const user = new this({username, hashedPassword, salt})
      await user.save()
      return user
    }

    static async checkPassword (username, password) {
      try {
        const user = await this.findOne({username})
        return user.checkPassword(password)
      } catch (e) {
        return false
      }
    }

    checkPassword (password) {
      return this.hashedPassword === hash(this.salt + password)
    }
  }
