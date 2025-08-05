const ChatModule = require('../modules/ChatModule');


const initSocket = (io) => {    
    io.on("connection", (socket) => {
        const { id } = socket;
        console.log(`Socket connected: ${id}`);
        
        const currentUserData = socket.request.session.passport ? socket.request.session.passport.user.data : null;
        if (!currentUserData) {
            io.to(id).emit('newMessage', 'not authenticated');
            return socket.disconnect();
        }

        socket.on('getHistory', async (reciverId) => {
            const data = {
                senderUser: currentUserData._id,
                reciverUser: reciverId,
            };
            const chat = await ChatModule.find([data.senderUser, data.reciverUser]);
            const history = await ChatModule.getHistory(chat._id);
            console.log(history)
            socket.emit('chatHistory', history);
        });

        socket.on('sendMessage', async (message, reciver) => {
            if (!currentUserData || currentUserData._id === reciver) return;
            const data = {
                senderUser: currentUserData._id,
                reciverUser: reciver,
                messageText: message
            };
            const messageData = await ChatModule.sendMessage(data);
            const chat = await ChatModule.find([data.senderUser, data.reciverUser])
            socket.emit('newMessage', { chatId: chat._id, message: messageData });
        });

        socket.on('subscribeToChat', (data) => {
            console.log(data);
        })
        
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
        });
    });
}

module.exports = initSocket;