const crawler = require("../libs/crawler")
const { crawler: crawlerConfig } = require('../config/config')

crawler({
  url: crawlerConfig.url.course,
  callback() {
    const $ = window.$
    const $item = $('.course-tab-filter li')

    const data = []
    $item.each((index, item) => {
      const $el = $(item)
      const $elLink = $el.find('.course-tab-filter-item')
      const title = $elLink.text().replace('促', '')

      if (title === '全部') { return }

      const dataItem = {
        cid: index,
        title
      }

      data.push(dataItem)
    })

    return data
  },
})