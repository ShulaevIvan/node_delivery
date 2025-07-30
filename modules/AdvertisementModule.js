const mongoose = require('mongoose');
const userModule = require('../modules/UserModule');
const advertisementCollection = require('../database/models/Advertisement');

class AdvertisementModule {
    constructor() {

    }
    async get() {
        try {
            const advData = await advertisementCollection.find();

            return advData;
        }
        catch(err) {

        }
    }

    async getById(id) {
        try {
            const targetAdv = await advertisementCollection.find({_id: id});

            return targetAdv;
        }
        catch(err) {

        }
    }

    async create(data) {
        try {
            const currentDate = new Date();
            const user = await userModule.findByEmail(data.email)

            const advData = {
                shortText: data.shortText,
                description: data.description,
                images: data.files.map((item) => item.path),
                userId: user._id,
                createdAt: currentDate,
                updatedAt: currentDate,
                tags: '',
                isDeleted: false,
            };
            const adv = new advertisementCollection(advData);
            const createdAdv = await adv.save();

            return createdAdv;
        }
        catch(err) {
            
        }
    }

    async remove(id, userId) {
        try {
            const deletedAdv = await advertisementCollection.findOneAndUpdate({_id: id, userId: userId }, { isDeleted: true });

            return deletedAdv;
        }
        catch(err) {

        }
    }

    async recover(id, userId) {
        try {
            const recoveredAdv = await advertisementCollection.findOneAndUpdate({_id: id, userId: userId }, { isDeleted: false });

            return recoveredAdv
        }
        catch(err) {

        }
    }
};

module.exports = new AdvertisementModule();