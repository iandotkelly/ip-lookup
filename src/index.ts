import * as path from 'path'
import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import { LocationFinder } from './location-finder'
import { ipGetHandler } from './get-handler'
import { createIpPostHandler } from './post-handler'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  '/static',
  express.static(path.resolve(process.env.PWD as string, 'public'))
)

const finder = new LocationFinder()

finder.initialize().then(() => {
  app.get('/', ipGetHandler)
  app.post('/', createIpPostHandler(finder))
  app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server started on port ${PORT}`)
  )
})

export { app }
