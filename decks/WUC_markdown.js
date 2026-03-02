(async () => {
  const load = async url => {
    const { promise, resolve, reject } = Promise.withResolvers()
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
    return promise
  }

  const source = document.head.childNodes[2].textContent
  await load('https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js')
  const markdown = document.createElement('template')
  markdown.innerHTML = marked.parse(source)

  const settings = {};
  const settingsTable = markdown.content.querySelector('table')
  settingsTable.parentNode.removeChild(settingsTable)
  for (const tr of settingsTable.querySelectorAll('tr')) {
    const [key, value] = tr.querySelectorAll('td')
    if (key && value) {
      settings[key.innerText] = value.innerHTML
    }
  }

  const sections = document.createElement('template')

  let mainSection = sections.content.appendChild(document.createElement('section'));
  let section = mainSection.appendChild(document.createElement('section'));
  for (const node of markdown.content.childNodes) {
    if (node.tagName && node.tagName.toLowerCase() === 'hr') {
      section = undefined;
      continue;
    }
    if (node.tagName && node.tagName.toLowerCase() === 'h3' && !section) {
      mainSection = sections.content.appendChild(document.createElement('section'));
    }
    if (!section) {
      if (node.nodeType === 3 && !node.textContent.trim()) {
        continue;
      }
      section = mainSection.appendChild(document.createElement('section'));
      section.className = 'future';
    }
    section.appendChild(node.cloneNode(true));
  }

  const wucTpl = await fetch('WUC_template.html')
  const wuc = document.createElement('template')
  const wucHtml = await wucTpl.text()
  wuc.innerHTML = wucHtml
    .replaceAll('<html>', '<div id="hmtl">')
    .replaceAll('</html>', '</div>')
    .replaceAll('<head>', '<div id="head">')
    .replaceAll('</head>', '</div>')
    .replaceAll('<body>', '<div id="body">')
    .replaceAll('</body>', '</div>')

  if (settings.title) {
    const h3 = wuc.content.querySelector('h3')
    h3.innerHTML = settings.title
    wuc.content.querySelector('meta[name=description]').setAttribute('content', '☕ ' + h3.innerText)
  }
  const metaDuration = wuc.content.querySelector('meta[name=deck-duration]')
  if (settings.duration) {
    metaDuration.setAttribute('content', settings.duration)
  } else {
    metaDuration.parentNode.removeChild(metaDuration)
  }

  const links = wuc.content.querySelectorAll('link')
  const cssHrefs = []
  for (const link of links) {
    link.parentNode.removeChild(link)
    cssHrefs.push(link.href)
  }
  document.head.replaceChildren(...wuc.content.getElementById('head').childNodes)
  for (const cssHref of cssHrefs) {
    const link = document.createElement('link')
    link.href = cssHref
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.head.appendChild(link)
  }

  const scripts = wuc.content.querySelectorAll('script')
  const scriptSrcs = []
  for (const script of scripts) {
    script.parentNode.removeChild(script)
    scriptSrcs.push(script.src)
  }
  document.body.replaceChildren(...wuc.content.getElementById('body').childNodes)

  const slides = document.querySelector('div.slides')
  slides.appendChild(sections.content)

  for (const scriptSrc of scriptSrcs) {
    await load(scriptSrc)
  }
  deck()
})()
