const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // Protect all routes

router.route('/')
  .get(donorController.getAllDonors)
  .post(authorize('admin'), donorController.createDonor);

router.route('/:id')
  .get(donorController.getDonorById)
  .put(authorize('admin'), donorController.updateDonor)
  .delete(authorize('admin'), donorController.deleteDonor);

router.post('/:id/link-beneficiary', authorize('admin'), donorController.linkBeneficiary);

module.exports = router; 