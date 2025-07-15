const ChatModule = require('../modules/ChatModule');


const initSocket = (io) => {    
    io.on("connection", (socket) => {
        const { id } = socket;
        console.log(`Socket connected: ${id}`);

        const currentUserData = socket.request.session.passport.user.data;
        console.log(currentUserData)

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
            await ChatModule.sendMessage(data);

        });

        socket.emit('newMessage', (message) => {

        });
        socket.emit('chatHistory', (chatHistory) => {

        });
        
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
        });
    });
    
}

module.exports = initSocket;