const Donor = require('../models/Donor');
const Beneficiary = require('../models/Beneficiary');
const DonorBeneficiary = require('../models/DonorBeneficiary');

exports.createDonor = async (req, res) => {
  try {
    const donor = await Donor.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.findAll({
      include: [{
        model: Beneficiary,
        through: { attributes: ['status', 'donationType', 'amount'] }
      }]
    });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findByPk(req.params.id, {
      include: [{
        model: Beneficiary,
        through: { attributes: ['status', 'donationType', 'amount'] }
      }]
    });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByPk(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    await donor.update(req.body);
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByPk(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    await donor.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.linkBeneficiary = async (req, res) => {
  try {
    const { beneficiaryId, donationType, amount, frequency } = req.body;
    const donorId = req.params.id;

    const link = await DonorBeneficiary.create({
      donorId,
      beneficiaryId,
      donationType,
      amount,
      frequency,
      startDate: new Date()
    });

    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 