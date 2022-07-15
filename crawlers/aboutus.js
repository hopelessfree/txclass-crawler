const crawler = require("../libs/crawler")
const { crawler: crawlerConfing } = require("../config/config")

crawler({
  url: crawlerConfing.url.aboutus,

  callback() {
    const $ = window.$
    const $wrapper = $('.agency-about')

    const data = {
      aid: 1,
      posterUrl: $wrapper.find('.about-banner-pic0').css('background-image').match(/url\("(.+?)"\)/)[1],
      title: $wrapper.find('.about-agency-propagate').text(),
      name: $wrapper.find('.about-agency-name').text(),
      intro: $wrapper.find('.about-agency-intr').text(),
      posterKey: '',
    }

    return data
  },
})