const crawler = require('../libs/crawler')
const { crawler: crawlerConfig } = require("../config/config")


crawler({
  url: crawlerConfig.url.main,
  
  callback() {
    const
      $ = window.$,
      $item = $('.agency-big-banner-ul .agency-big-banner-li'),
      data = []


    $item.each((index, item) => {
      const
        $el = $(item),
        $elLink = $el.find('.js-banner-btnqq')

      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src'),
        title: $elLink.prop('title'),
        imgKey: '',
      }
      data.push(dataItem)
    })

    return data

  },
})