const mongoose = require('mongoose');
const userCollection = require('../database/models/User');

class UserModule {
    constructor() {
        this.userCollection = userCollection;
    }

    async create(data) {
        return new Promise((resolve, reject) => {
            const user = {
                email: data.email,
                passwordHash: data.passwordHash,
                name: data.name,
                contactPhone: data.contactPhone ? data.contactPhone : '',
            };
            this.findByEmail(user.email)
            .then((userData) => {
                if (userData.length === 0) {
                    const userObj = userCollection.create(user);
                    return resolve(userObj);
                }
                return reject({'message': 'email exists'});
            })
        });
    };

    async findByEmail(userEmail) {
       try {
            return new Promise((resolve, reject) => {
                const targetUser = this.userCollection.findOne({email: userEmail});
                if (!targetUser) return null;
                resolve(targetUser);
            })
        }
        catch(err) {
            return reject({'message': 'server err'});
        }
    };
};


module.exports = new UserModule();