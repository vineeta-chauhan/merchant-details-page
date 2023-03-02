const express = require('express')
const router = express.Router();

const {  createMerchantDetails } = require('../controllers/merchantDetails')

router.route("/createMerchantData").post(createMerchantDetails);

module.exports = router;