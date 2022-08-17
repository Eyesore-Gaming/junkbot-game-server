import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// load local config from .env file
dotenv.config()

// express module used for basic HTTP communication
const app: Express = express()

// load some environment variables
const name: string = process.env.NAME === undefined ? 'CHECK ENV VAR "NAME"' : process.env.NAME
const version: string = process.env.VERSION === undefined ? 'CHECK ENV VAR "VERSION"' : process.env.VERSION
const port: number = Number.parseInt(process.env.PORT === undefined ? '8080' : process.env.PORT)

app.listen(port, () => {
  console.log(`${name} v${version} listening on ${port}`)
})

// TODO: placeholder "hello world" route - need to add a robust router
app.get('/', (req: Request, res: Response) => {
  console.log(`Request URL: ${req.url}`)
  res.send('Hello from Junkbot Game Server')
})

// Catch all unhandled routes
app.get('*', (req: Request, res: Response) => {
  console.log(`Request URL: ${req.url}`)
  res.status(404).send('This is not the page you are looking for... Move along. Move along.')
})
