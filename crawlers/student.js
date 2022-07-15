const crawler = require('../libs/crawler')
const { crawler: crawlerConfig } = require("../config/config")


crawler({
  url: crawlerConfig.url.main,

  callback() {
    const $ = window.$
    const $item = $(".stu")

    const data = []

    $item.each((index, item) => {
      const $el = $(item)

      const dataItem = {
        sid: index + 1,
        studentImg: $el.find('.stu-img').prop('src'),
        studentName: $el.find('.stu-img').prop('alt'),
        intro: $el.find('.stu-main-cnt ').text().replace(/\n/g, '').trim(),
        courseName: $el.find('.stu-main-tit').prop('title'),
        courseLink: $el.find('.stu-main-tit').prop('href'),
        studentImgKey: '',
      }

      data.push(dataItem)
    })

    return data
  },
})