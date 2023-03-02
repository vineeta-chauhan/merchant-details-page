const merchantDetail = require('../models/merchantDetail');
const { isEmpty } = require('lodash');

const createMerchantDetails = async (req, res) => {
    const { restaurantName, phoneNumber, contactName, Pincode, website, location, averageDailyTransactions } = req.body;
    try {
        if (isEmpty(restaurantName && phoneNumber && contactName && !Pincode && website && location && averageDailyTransactions)) {
            return res.status(400).json({ msg: "all fields are mandiotory" });
        } else {
            const data = await merchantDetail.create({ restaurantName, phoneNumber, contactName, Pincode, website, location, averageDailyTransactions })
            return res.status(200).json(data);
        }

    } catch (err) {
        return res.status(500).json({ err });
    }
}
module.exports = { createMerchantDetails }