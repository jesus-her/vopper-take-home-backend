import express from 'express'
import dotenv from 'dotenv'
import config from 'config'

import cors from 'cors'

import connect from './utils/connect'
import routes from './routes'

dotenv.config()
const port = config.get<number>('port')

const app = express()
app.use(express.json())

app.use(
  cors({
    credentials: true
  })
)
app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`)

  await connect()

  routes(app)
})

// const server = http.createServer(app)

// server.listen(8080, () => {
//   console.log('Server running in port: http://localhost:8080/')
// })

// const MONGO_URL =
//   'mongodb+srv://jesus10hn:5KqhRObsuMfTp8Gx@vopper-cluster.ynbgnnn.mongodb.net/?retryWrites=true&w=majority&appName=vopper-cluster'

// mongoose.Promise = Promise
// mongoose.connect(MONGO_URL)
// mongoose.connection.on('error', (error: Error) => console.log(error))
