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

function fakeLogin (userName: string, password: string): boolean {
  console.log(`${userName}:${password}`)
  return (userName === 'myname' && password === 'whatever')
}

app.listen(port, () => {
  console.log(`${name} v${version} listening on ${port}`)

  const username = 'myname'
  const password = 'whatever'

  if (fakeLogin(username, password)) {
    console.log('Nesting ifs 1.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 2.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 3.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  } else if (fakeLogin(username, password)) {
    console.log('Nesting ifs 4.. ')
  }
})

app.get('/', (req: Request, res: Response) => {
  const url: string = req.url
  console.log(`Request URL: ${url}`)
  res.send('Hello from Junkbot Game Server')
})
