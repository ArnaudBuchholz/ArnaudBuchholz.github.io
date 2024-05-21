'use strict'

const { send } = require('reserve')
const { readdir, readFile, stat } = require('node:fs/promises')
const { join, extname, basename } = require('path')

const twoWeeksAgo = new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000)

async function keepRecentFiles (folder, names) {
  for (let index = 0; index < names.length; ++index) {
      const fullName = join(folder, names[index])
      const fileStat = await stat(fullName)
      if (fileStat.mtime < twoWeeksAgo) {
          names[index] = undefined
      } else {
          names[index] = { fullName, stat: fileStat }
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
      .map(item => basename(item.link))
    const decks = (await readdir('./decks'))
      .filter(name => extname(name) === '.html')
      .filter(name => !(['me.html', 'disclaimer.html'].includes(name) || exposedDecks.includes(name)))
    return keepRecentFiles('./decks', decks)
}

async function listRecentBlogItems () {
    const blogItems = (await readdir('./blog/post'))
      .filter(name => extname(name) === '.html')
    return keepRecentFiles('./blog/post', blogItems)
}

module.exports = async (request, response) => {
  const index = JSON.parse(await readFile('./index.json'))
  const recentDecks = await listRecentDecks(index)
  const recentBlogItems = await listRecentBlogItems(index)
  recentBlogItems.concat(recentDecks).forEach(fullName => {
    index.unshift({
      type: 'wip',
      link: fullName,
      title: fullName
    })
  })
  return send(response, index)
}
