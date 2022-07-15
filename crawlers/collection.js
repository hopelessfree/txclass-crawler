const crawler = require("../libs/crawler")
const { crawler: crawlerConfig } = require('../config/config')


crawler({
  url: crawlerConfig.url.main,

  callback() {
    const $ = window.$
    const $item = $('.agency-recommend-course')

    let data = []


    $item.each((index, item) => {
      const $el = $(item)

      const _idList = []
      const $courseItem = $el.find('.course-card-item')

      $courseItem.each((_, item) => {
        const $elem = $(item)
        _idList.push($elem.find('.item-img-link').attr('data-id'))
      })

      const dataItem = {
        cid: index + 1,
        title: $el.find('.recommend-course-title span').eq(0).text().replace(/(\\n|\s+|更多)/g, ''),
        info: $el.find('.rec-group-info').text(),
        qqQunLink: $el.find('.rec-group-join').prop('href'),
        courseIdList: _idList.toString(),
        posterUrl: $el.find('.rec-group-mask').css('background-image').match(/url\("(.+?)"\)/)[1],
        posterKey: '',
      }

      data.push(dataItem)
    })

    return data
  },
})