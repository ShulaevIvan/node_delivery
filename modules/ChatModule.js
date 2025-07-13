const mongoose = require('mongoose');
const EventEmitter = require('node:events');
const userCollection = require('../database/models/User');
const chatCollection = require('../database/models/Chat');
const messageCollection = require('../database/models/Message');


class ChatModule {
    constructor() {
        this.chatEmmiter = new EventEmitter();
    }

    async find(usersIdsArr) {
        try {
            if (!usersIdsArr && usersIdsArr.length < 2) return;
            let targetChat = await chatCollection.findOne({users: { $all: usersIdsArr }});
            if (!targetChat) {
                targetChat = await this.createChat(usersIdsArr);
            }
            return targetChat;
        }
        catch(err) {

        }
    }

    async createChat(users) {
        try {
            const createdChat = new chatCollection({
                users: [users[0], users[1]],
                createdAt: new Date(),
                messages: [],
            });
            await createdChat.save();
            return createdChat;
        }
        catch(err) {
            return [];
        }
    }

    async sendMessage(data) {
        try {
            console.log(data)
            const senderUser = data.sender;
            const reciverUser = data.reciver;
            const messageText = data.message;

            return 'ok';
        }
        catch(err) {
            console.log(err)
        }
    };

    async sendMessage(data) {
        try {
            const { senderUser, reciverUser, messageText } = data;
            if (!senderUser || !reciverUser) return;
            const users = await userCollection.find({'_id': {$in: [senderUser, reciverUser]}}).select('_id').exec();
            const chat = await this.find([users[0]._id, users[1]._id]);
            const message = await this.saveMessageToChat(chat, senderUser, messageText);
            
            return message;
        }
        catch(err) {
            console.log(err)
        }
    };


    async saveMessageToChat(chat, senderId, messageText) {
        const newMessage = new messageCollection({
			author: senderId,
			sentAt: Date.now(),
			text: messageText,
			readAt: "",
		});
        await newMessage.save();
        await chatCollection.updateOne({_id: chat._id}, {
            $push: {
                messages: [newMessage]
            }
        });
        return newMessage;
    };


    subscribe(callback) {
        this.chatEmmiter.on('messageAdded', ({ chat, message}) => {
        callback({ chatId: chat.id, message });
    });
  }
};


module.exports = new ChatModule();