const router = require('koa-router')()
const indexController = require('../controllers/Index')
const loginCheck = require('../middlewares/loginCheck')


router.get('/', indexController.index)
router.get('/get_courses', loginCheck, indexController.getCoursesData)
router.get('/get_recom_courses', loginCheck, indexController.getRecomCourseData)
router.get('/get_sliders', loginCheck, indexController.getSliders)
router.get('/get_collections', loginCheck, indexController.getCollections)
router.get('/get_teachers', loginCheck, indexController.getTeachers)
router.get('/get_students', loginCheck, indexController.getStudents)


router.post('/change_course_field', loginCheck, indexController.changeCourseField)
router.post('/change_status', loginCheck, indexController.changeDataStatus)
router.post('/select_star_teacher', loginCheck, indexController.changeTeacherStar)

module.exports = router 