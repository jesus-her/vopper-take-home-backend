import express from 'express'
import dotenv from 'dotenv'
import config from 'config'

import cors from 'cors'

import connect from './utils/connect'
import routes from './routes'

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`)

  await connect()

  routes(app)
})
