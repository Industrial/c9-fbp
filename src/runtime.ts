import { startServer } from '#/server.ts'

const config = JSON.parse(await Deno.readTextFile('./fbp-config.json'))

const hostname = config.host as string
const port = config.port as number

startServer(hostname, port)
