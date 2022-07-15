const pt = require('puppeteer');

(async () => {
  const
    bs /** browser */ = await pt.launch(),
    url = 'https://msiwei.ke.qq.com/',
    pg = await bs.newPage()

  await pg.goto(url, {
    timeout: 30 * 1000,
    waitUntil: 'networkidle2',
  })

  pg.on('console', (msg) => console.log(`PAGE LOG ${msg.text()}`))

  const result = await pg.evaluate(() => {

    const
      $ = window.$,
      $item = $('.agency-big-banner-ul .agency-big-banner-li')

    let data = []

    $item.each((index, item) => {
      const
        $el = $(item),
        $elLink = $el.find('.js-banner-btnqq')

      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src'),
        title: $elLink.prop('title'),
      }
      data.push(dataItem)
    })

    return data
  })

  await bs.close()

  process.send(result)
  setTimeout(() => { process.exit(0) })
  
})()