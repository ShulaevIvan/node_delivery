const router = require('express').Router();
const ChatModule = require('../modules/ChatModule');

router.post('/create-chat', async (req, res) => {
    const { users } = req.body;
    const chat = await ChatModule.createChat(users)
    res.status(201).json({'status': 'ok', data: chat});
});

router.post('/find-chat', async (req, res) => {
    const { users } = req.body;
    const chat = await ChatModule.find(users)
    res.status(200).json({status: 'ok', data: chat});
});

router.get('/get-history/', async (req, res) => {
    const chatId = req.query.id;
    if (!chatId) return res.status(200).json({status: 'param err'});
    const targetChat = await ChatModule.getHistory(chatId);

    res.status(200).json({status: 'ok', data: targetChat});
});

router.post('/send-message', async (req, res) => {
    const { author, reciver, text } = req.body;
});


module.exports = router;