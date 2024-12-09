const Donation = require('../models/Donation');
const DonorBeneficiary = require('../models/DonorBeneficiary');

exports.createDonation = async (req, res) => {
  try {
    const { donorId, beneficiaryId, amount, donationType, notes } = req.body;

    const donorBeneficiary = await DonorBeneficiary.findOne({
      where: { donorId, beneficiaryId }
    });

    if (!donorBeneficiary) {
      return res.status(404).json({ message: 'Donor-Beneficiary relationship not found' });
    }

    const donation = await Donation.create({
      donorBeneficiaryId: donorBeneficiary.id,
      amount,
      donationType,
      notes,
      status: 'completed'
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDonationsByDonor = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      include: [{
        model: DonorBeneficiary,
        where: { donorId: req.params.donorId },
        include: ['Beneficiary']
      }],
      order: [['transactionDate', 'DESC']]
    });
    res.json(donations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDonationsByBeneficiary = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      include: [{
        model: DonorBeneficiary,
        where: { beneficiaryId: req.params.beneficiaryId },
        include: ['Donor']
      }],
      order: [['transactionDate', 'DESC']]
    });
    res.json(donations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 