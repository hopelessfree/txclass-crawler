const { API } = require('../config/error_config')
const { returnInfo } = require('../libs/utils')
const { getCourseFieldData } = require('../services/CourseTab')

const {
  getCourses,
  changeField,
  changeStatus: changeCourseStatus,
} = require('../services/Course')

const {
  getRecomCourseData,
  changeStatus: changeRecomCourseStatus,
} = require('../services/RecomCourse')

const {
  getSliderData,
  changeStatus: changeSliderStatus,
} = require('../services/Slider')

const {
  getCollectionData,
  changeStatus: changeCollectionStatus,
} = require('../services/Collection')

const {
  getTeacherData,
  changeStatus: changeTeacherStatus,
  selectStarTeacher
} = require('../services/Teacher')

const {
  getStudentData,
  changeStatus: changeStudentStatus
} = require('../services/Student')
const { isPrd } = require('../config/env_config')



class Index {
  async index(ctx, next) {
    const { session } = ctx

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    if (!session.uid) {
      session.uid = 1
      session.username = 'song xian wei'
      session.nickname = 'nothing'
      session.gender = 'male'
    }

    ctx.body = {
      session,
      env: process.env.NODE_ENV,
      isPrd: isPrd,
    }

  }

  async getCoursesData(ctx, next) {
    const courseData = await getCourses()
    const fieldData = await getCourseFieldData()

    ctx.body = courseData && fieldData
      ? returnInfo(API.RETURN_SUCCESS, { courseData, fieldData, })
      : returnInfo(API.RETURN_FAILED)
  }

  async changeCourseField(ctx, next) {
    const { cid, field } = ctx.request.body;
    const result = await changeField(cid, field)

    if (!result) {
      ctx.body = returnInfo(API.CHANGE_COURSE_FIELD_FAILED)
      return
    }
    ctx.body = returnInfo(API.CHANGE_COURSE_FIELD_SUCCESS)
  }

  async getRecomCourseData(ctx, next) {
    const result = await getRecomCourseData()

    ctx.body = result
      ? returnInfo(API.RETURN_SUCCESS, result)
      : returnInfo(API.RETURN_FAILED)
  }

  async changeDataStatus(ctx, next) {
    const { id, status, field } = ctx.request.body;

    let result
    switch (field) {
      case 'COURSE':
        result = await changeCourseStatus(id, status)
        break;

      case 'RECOM_COURSE':
        result = await changeRecomCourseStatus(id, status)
        break;

      case 'SLIDER':
        result = await changeSliderStatus(id, status)
        break;

      case 'COLLECTION':
        result = await changeCollectionStatus(id, status)
        break;

      case 'TEACHER':
        result = await changeTeacherStatus(id, status)
        break;

      case 'STUDENT':
        result = await changeStudentStatus(id, status)
        break;

      default:
        ctx.body = returnInfo(API.FIELD_ERROR)
        return;
    }

    ctx.body = result
      ? returnInfo(API.CHANGE_STATUS_SUCCESS)
      : returnInfo(API.CHANGE_STATUS_FAILED)
  }

  async getSliders(ctx, next) {
    const result = await getSliderData()

    ctx.body = result
      ? returnInfo(API.RETURN_SUCCESS, result)
      : returnInfo(API.RETURN_FAILED)
  }

  async getCollections(ctx, next) {
    const result = await getCollectionData()

    ctx.body = result
      ? returnInfo(API.RETURN_SUCCESS, result)
      : returnInfo(API.RETURN_FAILED)
  }

  async getTeachers(ctx, next) {
    const result = await getTeacherData()

    ctx.body = result
      ? returnInfo(API.RETURN_SUCCESS, result)
      : returnInfo(API.RETURN_FAILED)
  }

  async getStudents(ctx, next) {
    const result = await getStudentData()

    ctx.body = result
      ? returnInfo(API.RETURN_SUCCESS, result)
      : returnInfo(API.RETURN_FAILED)
  }

  async changeTeacherStar(ctx, next) {
    const { id, isStar } = ctx.request.body;
    const result = await selectStarTeacher(id, isStar)

    ctx.body = result
      ? returnInfo(API.SELECT_STAR_TEACHER_SUCCESS)
      : returnInfo(API.SELECT_STAR_TEACHER_FAILED)
  }
}


module.exports = new Index()