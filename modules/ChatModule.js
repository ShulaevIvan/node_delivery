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

    async createChat(usersArr) {
        try {
            const createdChat = new chatCollection({
                users: usersArr,
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
            const { senderUser, reciverUser, messageText } = data;
            if (!senderUser || !reciverUser) return;
            const users = await userCollection.find({'_id': {$in: [senderUser, reciverUser]}}).select('_id').exec();
            if (!users || !users.length === 2) return;
            const chat = await this.find(users);
            const message = await this.saveMessageToChat(chat, senderUser, messageText);
            this.chatEmmiter.emit('newMessage', { chatId: chat.id, message });
            
            return message;
        }
        catch(err) {
            console.log(err)
        }
    };


    async saveMessageToChat(chat, senderId, messageText) {
        try {
            const newMessage = new messageCollection({
			    author: senderId,
			    sentAt: Date.now(),
			    text: messageText,
			    readAt: "",
		    });
            const message = await newMessage.save();
            await chatCollection.updateOne({_id: chat._id}, {
                $push: {
                    messages: [newMessage]
                }
            });

            return message;
        }
        catch(err) {
            return {};
        }
        
    };

    async getHistory(chatId) {
        try {
            const targetChat = await chatCollection.findOne({_id: chatId});
            console.log(targetChat)
            if (!targetChat) return [];
            return await messageCollection.find({'_id': {$in: [targetChat.messages]}});
        }
        catch(err) {
            return [];
        }
        
    };

    async subscribe(callback) {
        this.eventEmitter.on('newMessage', data => {
            console.log(data)
        // callback({ chatId: newMessageChatId, message });
        });
    };

    async findChatByMessage(messageId) {
        await this.chatCollection.findOne({_})
    }
};





module.exports = new ChatModule();