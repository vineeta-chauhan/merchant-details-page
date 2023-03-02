const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI } = process.env;
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}

const connectDB = async () => {
    try {
        console.log(MONGODB_URI,"MONGODB_URI")
        await mongoose.connect(MONGODB_URI, config)
        console.log("db is connected")
    } catch (err) {
        console.log(err)
    }

}
module.exports = connectDB;

