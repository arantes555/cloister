'use strict'
import mongoose from 'mongoose'

export const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capabilities: [ String ],
  dependencies: [ String ] // TODO: what else to put here?
}, {
  timestamps: true
})

export const Service = mongoose.model('Service', ServiceSchema)

export default Service
