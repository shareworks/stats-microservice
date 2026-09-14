import mongoose from 'mongoose'

export default (dbUrl) =>
  mongoose.connect(dbUrl, {
    connectTimeoutMS: 60000,
  })
