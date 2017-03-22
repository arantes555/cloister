'use strict'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://192.168.99.100/my_database')

mongoose.connection.on('error', e => console.error(e)) // TODO : do more than print

mongoose.connection.once('open', async () => {
  // Do my stuff
})
