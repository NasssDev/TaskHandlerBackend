const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin'), async (req, res) => {
    try {
      const relationships = await DonorBeneficiary.findAll({
        include: ['Donor', 'Beneficiary']
      });
      res.json(relationships);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router; 