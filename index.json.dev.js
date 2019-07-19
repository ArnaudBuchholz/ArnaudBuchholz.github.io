'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readdirAsync = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)
const statAsync = promisify(fs.stat)

const twoWeeksAgo = new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000)

async function keepRecentFiles (folder, names) {
  for (let index = 0; index < names.length; ++index) {
      const fullName = path.join(folder, names[index])
      const stat = await statAsync(fullName)
      if (stat.mtime < twoWeeksAgo) {
          names[index] = undefined
      } else {
          names[index] = { fullName, stat }
      }
  }
  return names
    .filter(info => !!info)
    .sort((info1, info2) => info1.stat.mtime - info2.stat.mtime)
    .map(info => info.fullName)
}

async function listRecentDecks (index) {
    const exposedDecks = index
      .filter(item => item.type === 'deck')
      .map(item => path.basename(item.link))
    const decks = (await readdirAsync('./decks'))
      .filter(name => path.extname(name) === '.html')
      .filter(name => !(['me.html', 'disclaimer.html'].includes(name) || exposedDecks.includes(name)))
    return keepRecentFiles('./decks', decks)
}

async function listRecentBlogItems () {
    const blogItems = (await readdirAsync('./blog/post'))
      .filter(name => path.extname(name) === '.html')
    return keepRecentFiles('./blog/post', blogItems)
}

module.exports = async (request, response) => {
  const index = JSON.parse(await readFileAsync('./index.json'))
  const recentDecks = await listRecentDecks(index)
  const recentBlogItems = await listRecentBlogItems(index)
  recentBlogItems.concat(recentDecks).forEach(fullName => {
      index.unshift({
          type: 'wip',
          link: fullName,
          title: fullName
      })
  })
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  response.end(JSON.stringify(index))
}
