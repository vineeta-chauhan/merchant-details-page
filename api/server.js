
require("dotenv").config();
const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connect')
const { PORT, NODE_ENV } = process.env;
const merchantDetailsRoute = require('./routes/merchantDetails');
const corsOptions = require('./config/cors')

app.use(NODE_ENV === "production" ? cors(corsOptions) : cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/merchantDetails', merchantDetailsRoute)

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(` app listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}
start();
