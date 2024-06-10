import mongoose from 'mongoose'

async function connect () {
  const dbUri =
    'mongodb+srv://jesus10hn:5KqhRObsuMfTp8Gx@vopper-cluster.ynbgnnn.mongodb.net/?retryWrites=true&w=majority&appName=vopper-cluster'
  try {
    await mongoose.connect(dbUri?.toString()!)
    console.log('✅  MongoDB online')
  } catch (error) {
    console.log(error)
    throw new Error('🚫 Error on database connection')
  }
}

export default connect
