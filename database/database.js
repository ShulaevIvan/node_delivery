const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`)
        .then((data) => {
            console.log('connected to db - ok');
        })
        .catch((err) => {
            console.log(err);
            console.log('connected to db - err');
        })
    }
    catch(err) {
        console.log('connected to db - err');
    }
};

module.exports = connectToDb;