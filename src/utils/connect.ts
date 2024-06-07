import mongoose from 'mongoose'
import config from 'config'

async function connect () {
  const dbUri = config.get<string>('dbUri')
  try {
    await mongoose.connect(dbUri!)
    console.log('✅  MongoDB online')
  } catch (error) {
    console.log(error)
    throw new Error('🚫 Error on database connection')
  }
}

export default connect
