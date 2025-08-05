const mongoose = require('mongoose');
const userModule = require('../modules/UserModule');
const advertisementCollection = require('../database/models/Advertisement');

class AdvertisementModule {
    constructor() {

    }
    async get() {
        try {
            const advData = await advertisementCollection.find()
            .populate({path: 'userId', select: 'name'})
            .select('-updatedAt -isDeleted -tags -__v');

            return advData;
        }
        catch(err) {
            return err;
        }
    }

    async getById(id) {
        try {
            const targetAdv = await advertisementCollection.find({_id: id})
            .populate({path: 'userId', select: 'name'})
            .select('-updatedAt -tags -isDeleted -userId -__v');

            return targetAdv;
        }
        catch(err) {
            return err;
        }
    }

    async create(data) {
        try {
            const currentDate = new Date();
            const user = await userModule.findByEmail(data.email)
            const advData = {
                shortText: data.shortTitle,
                description: data.description,
                images: data.files.map((item) => item.path),
                userId: user._id,
                createdAt: currentDate,
                updatedAt: currentDate,
                tags: '',
                isDeleted: false,
            };
            const adv = new advertisementCollection(advData)
            const createdAdv = await adv.save();
            const targetAdv = await advertisementCollection.findOne({_id: createdAdv.id})
            .populate({path: 'userId', select: 'name'})
            .select('-updatedAt -tags -isDeleted -userId -__v');

            return targetAdv;
        }
        catch(err) {
            return err;
        }
    }

    async remove(id, userId) {
        try {
            const deletedAdv = await advertisementCollection.findOneAndUpdate({_id: id, userId: userId }, { isDeleted: true });
            const currentAdv = await advertisementCollection.findOne({_id: deletedAdv.id});

            return currentAdv;
        }
        catch(err) {
            return err;
        }
    }

    async recover(id, userId) {
        try {
            const recoveredAdv = await advertisementCollection.findOneAndUpdate({_id: id, userId: userId }, { isDeleted: false });
            const currentAdv = await advertisementCollection.findOne({_id: recoveredAdv.id});
            return currentAdv;
        }
        catch(err) {
            return err;
        }
    }
};

module.exports = new AdvertisementModule();