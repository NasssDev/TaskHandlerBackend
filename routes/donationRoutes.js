const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/', donationController.createDonation);
router.get('/donor/:donorId', donationController.getDonationsByDonor);
router.get('/beneficiary/:beneficiaryId', donationController.getDonationsByBeneficiary);

module.exports = router; 