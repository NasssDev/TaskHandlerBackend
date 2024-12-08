const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.route('/')
  .get(donorController.getAllDonors)
  .post(donorController.createDonor);

router.route('/:id')
  .get(donorController.getDonorById)
  .put(donorController.updateDonor)
  .delete(donorController.deleteDonor);

router.route('/donors/new')

router.post('/:id/link-beneficiary', donorController.linkBeneficiary);

module.exports = router; 