const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiaryController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(beneficiaryController.getAllBeneficiaries)
  .post(authorize('admin'), beneficiaryController.createBeneficiary);

router.route('/:id')
  .get(beneficiaryController.getBeneficiaryById)
  .put(authorize('admin'), beneficiaryController.updateBeneficiary)
  .delete(authorize('admin'), beneficiaryController.deleteBeneficiary);

router.get('/:id/donor-history', beneficiaryController.getDonorHistory);

module.exports = router; 