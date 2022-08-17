import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// load local config from .env file
dotenv.config()

// express module used for basic HTTP communication
const app: Express = express()

// load some environment variables
const name: string = process.env.APP_NAME === undefined ? 'CHECK ENVAR "APP_NAME"' : process.env.APP_NAME
const version: string = process.env.APP_VERSION === undefined ? 'CHECK ENVAR "APP_VERSION"' : process.env.APP_VERSION
const port: number = Number.parseInt(process.env.APP_PORT === undefined ? '8080' : process.env.APP_PORT)

// also warn if APP_PORT is not set - we can live without APP_NAME and APP_VERSION, but APP_PORT is required
if (process.env.APP_PORT === undefined) {
  console.log('main.ts -> Loading Environment Variables : CHECK ENVAR "APP_PORT" - Defaulting to "8080"')
}

app.listen(port, () => {
  console.log(`${name} v${version} listening on ${port}`)
})

// TODO: placeholder "hello world" route - need to add a robust router
app.get('/', (req: Request, res: Response) => {
  console.log(`main.ts -> get('/') : req.url='${req.url}'`)
  res.send(`Hello from ${name}, ${version}`)
})

// Health check used by Azure to determine app/container availability
app.get('/health-check', (req: Request, res: Response) => {
  console.log(`main.ts -> get('/health-check') : req.url='${req.url}'`)
  res.status(200).send('Health Check: OK')
})

// Catch all unhandled routes
app.get('*', (req: Request, res: Response) => {
  console.log(`main.ts -> get('*') : req.url='${req.url}'`)
  res.status(404).send('<img src="https://i.kym-cdn.com/photos/images/newsfeed/000/915/056/50e.jpg" alt="Page Not Found">')
})
