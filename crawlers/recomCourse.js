const crawler = require('../libs/crawler')
const { crawler: crawlerConfig } = require("../config/config")

crawler({
  url: crawlerConfig.url.main,

  callback() {
    const
      $ = window.$,
      $item = $('.spread-course-ul li'),
      mainTitle = $('.agency-spread-wrap h4').text(),
      data = []


    $item.each((index, item) => {
      const
        $el = $(item),
        $itemLk = $el.find('a')

      const dataItem = {
        mainTitle,
        cid: Number($el.attr('report-tdw').match(/\&(.+?)\&/)[1].split('=')[1]),
        href: $itemLk.prop('href'),
        title: $itemLk.prop('title'),
        posterUrl: $itemLk.find('.spread-course-cover').prop('src'),
        description: $el.find('.spread-course-des').text(),
        teacherImg: $el.find('.spread-course-face img').prop('src'),
        teacherName: $el.find('.spread-course-face span').eq(0).text(),
        studentCount: $el.find('.spread-course-face span').eq(1).text().replace(/[^0-9]/ig, ''),
        price: Number($el.find('.spread-course-price').text().replace(/[^0-9|\.]/ig, '')),
        posterKey: '',
        teacherImgKey: '',
      }

      data.push(dataItem)
    })

    return data
  },
})