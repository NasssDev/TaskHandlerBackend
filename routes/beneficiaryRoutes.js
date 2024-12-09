const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiaryController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(beneficiaryController.getAllBeneficiaries)
  .post(beneficiaryController.createBeneficiary);

router.route('/:id')
  .get(beneficiaryController.getBeneficiaryById)
  .put(beneficiaryController.updateBeneficiary)
  .delete(beneficiaryController.deleteBeneficiary);

router.get('/:id/donor-history', beneficiaryController.getDonorHistory);

module.exports = router; 