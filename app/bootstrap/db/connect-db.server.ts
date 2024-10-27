import fs from 'fs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' })
    console.log('Loaded settings from .env file')
  } else {
    dotenv.config({ path: '.env.example' })
    console.warn('Loaded settings from .env.example file')
  }
}

if (![1, 2].includes(mongoose.connection.readyState)) {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log(`Connected to ${process.env.MONGODB_URI} successfully`))
    .catch(error => console.error(error?.message || error))
}

export default mongoose
