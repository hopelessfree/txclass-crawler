const crawler = require('../libs/crawler')
const { crawler: crawlerConfig } = require("../config/config")


crawler({
  url: crawlerConfig.url.teacher,

  callback() {
    const $ = window.$
    const $item = $('.tea')

    const data = []

    $item.each((index, item) => {
      const $el = $(item)

      const dataItem = {
        tid: index + 1,
        href: $el.find('.tea-face').prop('href'),
        teacherName: $el.find('.tea-face').prop('title'),
        teacherImg: 'https:' + $el.find('.tea-img').attr('lazy-src'),
        courseCount: Number($el.find('.tea-main-sub span').eq(0).text().replace(/[^0-9]/ig, '')),
        studentCount: Number($el.find('.tea-main-sub span').eq(1).text().replace(/[^0-9]/ig, '')),
        intro: $el.find('.tea-main-cnt').prop('title'),
        teacherImgKey: '',
      }

      data.push(dataItem)
    })

    return data
  }
})

