import router from './index.js'
router.beforeEach(async (to, from, next) => {
	document.title = '农资集采平台 | ' + to.meta.title
	console.log(to.meta.title)
	next()
})