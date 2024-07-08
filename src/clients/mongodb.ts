import mongoose from 'mongoose'
import { MONGODB_URI } from '../environment'

const env = process.env.TARGET_ENV || 'dev'

export const connectMongodb = () => {
  mongoose.connect(MONGODB_URI)

  const connection = mongoose.connection

  connection.once('open', function () {
    console.log('MongoDB database connection established successfully')
  })
  connection.on('error', () => {
    console.error('Error while connecting to DB')
  })
}
