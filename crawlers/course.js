const crawler = require("../libs/crawler")
const { crawler: crawlerConfig } = require('../config/config')

crawler({
  url: crawlerConfig.url.course,
  field: 'course',

  callback() {
    const $ = window.$
    const $item = $('.course-card-list-multi-wrap .course-card-item')

    const data = []
    $item.each((index, item) => {
      const $el = $(item)
      const $itemLink = $el.find('.item-img-link')
      const $itemImg = $itemLink.find('.item-img')
      const price = $el.find('.item-price').text()

      const dataItem = {
        cid: $itemLink.attr('data-id'),
        href: $itemLink.prop('href'),
        posterUrl: $itemImg.prop('src'),
        courseName: $itemImg.prop('title'),
        price: price === '免费' ? '0' : price.slice(1),
        studentCount: parseInt($el.find('.item-user').text()),
        posterKey: '',
        description: $el.find('.item-status-step').text(),
      }

      data.push(dataItem)
    })

    return data
  }
})