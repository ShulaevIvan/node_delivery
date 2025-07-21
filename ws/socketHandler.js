const ChatModule = require('../modules/ChatModule');


const initSocket = (io) => {    
    io.on("connection", (socket) => {
        const { id } = socket;
        console.log(`Socket connected: ${id}`);

        const currentUserData = socket.request.session.passport.user.data;

        socket.on('getHistory', async (reciverId) => {
            const data = {
                senderUser: currentUserData._id,
                reciverUser: reciverId,
            };
            const chat = await ChatModule.find([data.senderUser, data.reciverId])
            const history = await ChatModule.getHistory(chat._id);
            socket.emit('chatHistory', history);
        });

        socket.on('sendMessage', async (message, reciver) => {
            if (!currentUserData || currentUserData._id === reciver) return;
            const data = {
                senderUser: currentUserData._id,
                reciverUser: reciver,
                messageText: message
            };
            console.log(`sender: ${currentUserData._id}`);
            console.log(`reciver: ${reciver}`);
            const messageData = await ChatModule.sendMessage(data);
            ChatModule.chatEmmiter.emit('newMessage', messageData);
        });
        
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
        });
    });
}

module.exports = initSocket;