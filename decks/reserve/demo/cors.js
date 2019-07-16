'use strict'

module.exports = (request, response, url) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  return Promise.resolve()
}
