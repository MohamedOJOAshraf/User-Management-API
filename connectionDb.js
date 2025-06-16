const mongoose = require('mongoose');

require('dotenv/config')

const connectionDb = mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("DB Connected")
});

module.exports = connectionDb