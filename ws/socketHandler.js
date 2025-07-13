const ChatModule = require('../modules/ChatModule');


const initSocket = (io) => {    
    io.on("connection", (socket) => {
        const { id } = socket;
        console.log(`Socket connected: ${id}`);

        const currentUserData = socket.request.session.passport.user.data;
        console.log(currentUserData)

        socket.on('getHistory', (message) => {});
        socket.on('sendMessage', async (message, reciver) => {
            if (!currentUserData) return;
            const data = {
                senderUser: currentUserData._id,
                reciverUser: reciver,
                messageText: message
            };
            await ChatModule.sendMessage(data);

        });

        socket.emit('newMessage', (message) => {

        });
        socket.emit('chatHistory', (message) => {});
        
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
        });
    });
    
}

module.exports = initSocket;