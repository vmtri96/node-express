import express from 'express'
const router = express.Router()
import { router as userRouter } from './user.js'
import { router as loginRouter } from './login.js'
import { router as categoryRouter } from './category.js'

router.get('/', (req, res) => {
  res.send('Hello world')
})

router.use('/user', userRouter)
router.use('/login', loginRouter)
router.use('/category', categoryRouter)

router.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

export { router }
