const router = require('express').Router()
const userRouter = require('./user.js')
const loginRouter = require('./login')

router.get('/', (req, res) => {
  res.send('Hello world')
})

router.use('/user', userRouter)
router.use('/login', loginRouter)

router.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router
