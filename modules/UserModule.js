const mongoose = require('mongoose');
const userCollection = require('../database/models/User');

class UserModule {
    constructor() {
        this.userCollection = userCollection;
    }

    async getAllUsers() {
        try {
            return await userCollection.find({}, {'_id': 1, 'email': 1})
            .then((users) => {
                return users;
            })
        }
        catch(err) {

        }
    }

    async create(data) {
        try {
            const user = {
                email: data.email,
                passwordHash: data.passwordHash,
                name: data.name,
                contactPhone: data.contactPhone ? data.contactPhone : '',
            };
            return await this.findByEmail(user.email)
            .then((userData) => {
                if (!userData) {
                    const userObj = userCollection.create(user);
                    return userObj;
                }
                return {'message': 'email exists'}
            })
        }
        catch(err) {

        }
    };

    async findByEmail(userEmail) {
       try {
            return new Promise((resolve, reject) => {
                let targetUser;
                if (typeof(userEmail) === 'object') {
                    targetUser = this.userCollection.findOne({email: userEmail.email});
                    resolve(targetUser);
                }
                else {
                    targetUser = this.userCollection.findOne({email: userEmail});
                    if (!targetUser) return null;
                    resolve(targetUser);
                }
                
            })
        }
        catch(err) {
            return reject({'message': 'server err'});
        }
    };
};


module.exports = new UserModule();