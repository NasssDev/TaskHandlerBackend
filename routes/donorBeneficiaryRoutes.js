const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(donorController.getAllDonors)
  .post(donorController.createDonor);

router.route('/:id')
  .get(donorController.getDonorById)
  .put(donorController.updateDonor)
  .delete(donorController.deleteDonor);

router.post('/:id/link-beneficiary', donorController.linkBeneficiary);

module.exports = router; 