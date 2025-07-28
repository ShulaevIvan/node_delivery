const router = require('express').Router();
const userRouter = require('./userRouter');
const chatRouter = require('./chatRouter');
const advertismentsRouter = require('./advertisementsRouter');

router.use('/', userRouter);
router.use('/chat', chatRouter);
router.use('/advertisements', advertismentsRouter);


module.exports = router;

