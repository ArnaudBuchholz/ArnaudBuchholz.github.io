'use strict'

const fs = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)

module.exports = async (request, response) => {
  const index = JSON.parse(await readFileAsync('./index.json'))
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  response.end(JSON.stringify(index))
}
