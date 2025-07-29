const mongoose = require('mongoose');
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

    async getById() {

    }

    async create(data) {
        try {
            const currentDate = new Date();
            console.log(data);
        }
        catch(err) {
            
        }

    }

    async remove() {

    }
};

module.exports = new AdvertisementModule();