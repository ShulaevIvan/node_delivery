const router = require('express').Router();
const userRouter = require('./userRouter');
const chatRouter = require('./chatRouter');


router.use('/', userRouter);
router.use('/chat', chatRouter);


module.exports = router;

