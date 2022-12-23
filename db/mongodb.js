const mongoose = require('mongoose');

const InitiateMongo = async () => {
    await mongoose.connect(process.env.MONGOURI).then(() =>
        console.log("Connected to DB !!")).catch((e) => console.log("db" + e));
};


module.exports = InitiateMongo;
