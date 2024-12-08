const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiaryController');

router.route('/')
  .get(beneficiaryController.getAllBeneficiaries)
  .post(beneficiaryController.createBeneficiary);

router.route('/:id')
  .get(beneficiaryController.getBeneficiaryById)
  .put(beneficiaryController.updateBeneficiary)
  .delete(beneficiaryController.deleteBeneficiary);

router.get('/:id/donor-history', beneficiaryController.getDonorHistory);

module.exports = router; 