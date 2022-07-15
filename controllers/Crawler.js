const app = require("../app")
const config = require("../config/config")
const { CRAWLER } = require("../config/error_config")
const { startProcess, qiniuUpload, returnInfo, } = require("../libs/utils")
const { addAboutus } = require("../services/Aboutus")
const { addAgencyInfo } = require("../services/AgencyInfo")
const { addCollection } = require("../services/Collection")
const { addCourseData } = require("../services/Course")
const { addCourseTab } = require("../services/CourseTab")
const { addRecomCourse } = require("../services/RecomCourse")
const { addSliderData } = require("../services/Slider")
const { addStudentData } = require("../services/Student")
const { addTeacherData } = require("../services/Teacher")

class Crawler {
  async crawlSliderData(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'slider',

        async message(data) {
          const qiniu = config.qiniu

          data.forEach(async item => {
            if (item.imgUrl && !item.imgKey) {
              try {
                const imgData = await qiniuUpload({
                  url: item.imgUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: ".jpg",
                })

                if (imgData.key) {
                  item.imgKey = imgData.key
                }

                const result = await addSliderData(item)
                if (result) {
                  console.log('data create ok')
                }
                else {
                  console.log('data create failed')
                }
              }
              catch {

              }
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlAgencyInfo(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'agencyInfo',

        async message(data) {
          const { qiniu } = config

          try {
            const logoData = await qiniuUpload({
              url: data.logoUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg',
            })

            if (logoData.key) {
              data.logoKey = logoData.key
            }

            const result = await addAgencyInfo(data)

            if (result) {
              console.log('data create ok')
            }
            else {
              console.log('data create failed')
            }
          }
          catch (error) {
            console.log('crawlAgencyInfo error', error)
          }

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error() {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlRecomCourse(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'recomCourse',

        async message(data) {
          data.forEach(async item => {
            try {
              const qiniu = config.qiniu

              if (item.posterUrl && !item.posterKey) {

                const posterData = await qiniuUpload({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: '.jpg',
                })

                if (posterData.key) {
                  item.posterKey = posterData.key
                }
              }

              if (item.teacherImg && !item.teacherImgKey) {
                const teacherImgData = await qiniuUpload({
                  url: item.teacherImg,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: '.jpg',
                })

                if (teacherImgData.key) {
                  item.teacherImgKey = teacherImgData.key
                }
              }

              const result = await addRecomCourse(item)

              if (result) {
                console.log('Data create OK')
              }
              else {
                console.log('Data create failed')
              }

            }
            catch (error) {
              console.log('crawlRecomCourse', error)
            }
          });

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlCollection(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'collection',

        async message(data) {
          const qiniu = config.qiniu

          data.forEach(async item => {
            if (item.posterUrl && !item.posterKey) {
              try {
                const url = item.posterUrl
                const posterData = await qiniuUpload({
                  url: url,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: ".jpg",
                })

                if (posterData.key) {
                  item.posterKey = posterData.key
                }

                const result = await addCollection(item)
                if (result) {
                  console.log('data create ok')
                }
                else {
                  console.log('data create failed')
                }
              }
              catch (error) {
                console.log(error)
              }
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlTeacher(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'teacher',

        async message(data) {
          const qiniu = config.qiniu

          data.forEach(async item => {
            if (item.teacherImg && !item.teacherImgKey) {
              try {
                const posterData = await qiniuUpload({
                  url: item.teacherImg,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: ".jpg",
                })

                if (posterData.key) {
                  item.teacherImgKey = posterData.key
                }

                const result = await addTeacherData(item)
                if (result) {
                  console.log('data create ok')
                }
                else {
                  console.log('data create failed')
                }
              }
              catch (error) {
                console.log(error)
              }
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlStudent(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'student',

        async message(data) {
          const qiniu = config.qiniu

          data.forEach(async item => {
            if (item.studentImg && !item.studentImgKey) {
              try {
                const posterData = await qiniuUpload({
                  url: item.studentImg,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: ".jpg",
                })

                if (posterData.key) {
                  item.studentImgKey = posterData.key
                }

                const result = await addStudentData(item)
                if (result) {
                  console.log('data create ok')
                }
                else {
                  console.log('data create failed')
                }
              }
              catch (error) {
                console.log(error)
              }
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlCourseTab(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'courseTab',

        async message(data) {
          data.forEach(async item => {
            const result = await addCourseTab(item)
            if (result) {
              console.log('data create ok')
            }
            else {
              console.log('data create failed')
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlCourse(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'course',

        async message(data) {
          const qiniu = config.qiniu

          data.forEach(async item => {

            if (item.posterUrl && !item.posterKey) {
              try {
                const posterData = await qiniuUpload({
                  url: item.posterUrl,
                  bucket: qiniu.bucket.tximg.bucket_name,
                  ext: ".jpg",
                })

                if (posterData.key) {
                  item.posterKey = posterData.key
                }

                const result = await addCourseData(item)
                if (result) {
                  console.log('data create ok')
                }
                else {
                  console.log('data create failed')
                }
              }
              catch (error) {
                console.log(error)
              }
            }
          })

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlAboutus(ctx) {
    const res = await new Promise((resolve, reject) => {
      startProcess({
        file: 'aboutus',

        async message(data) {
          const { qiniu } = config

          try {
            const posterData = await qiniuUpload({
              url: data.posterUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg',
            })

            if (posterData.key) {
              data.posterKey = posterData.key
            }

            const result = await addAboutus(data)

            if (result) {
              console.log('data create ok')
            }
            else {
              console.log('data create failed')
            }
          }
          catch (error) {
            console.log('crawlAgencyInfo error', error)
          }

          resolve(returnInfo(CRAWLER.CRAWL_SUCCESS))
        },

        async exit(code) {
          console.log('code', code)
        },

        async error(error) {
          resolve(returnInfo(CRAWLER.CRAWL_FAILED))
        },

      })
    })

    ctx.body = res
  }

  async crawlAction(ctx, next) {
    const { apiName } = ctx.request.body;
    const result = 'xxxx'
    ctx.body = result
  }
}


module.exports = new Crawler()  