import mongoose from 'mongoose'

async function connect () {
  const dbUri =
    'mongodb://mongo:GYSuTexkyCvbXlszAyzMJoumfSldjhlR@roundhouse.proxy.rlwy.net:14458'
  try {
    await mongoose.connect(dbUri?.toString()!)
    console.log('✅  MongoDB online')
  } catch (error) {
    console.log(error)
    throw new Error('🚫 Error on database connection')
  }
}

export default connect
