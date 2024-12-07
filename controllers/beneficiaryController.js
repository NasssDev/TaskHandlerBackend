const Beneficiary = require('../models/Beneficiary');
const Donor = require('../models/Donor');
const DonorBeneficiary = require('../models/DonorBeneficiary');

exports.createBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(beneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      include: [{
        model: Donor,
        through: { attributes: ['status', 'donationType', 'amount'] }
      }]
    });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBeneficiaryById = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByPk(req.params.id, {
      include: [{
        model: Donor,
        through: { 
          attributes: ['status', 'donationType', 'amount', 'frequency', 'startDate'] 
        }
      }]
    });
    
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.json(beneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByPk(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    await beneficiary.update(req.body);
    res.json(beneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByPk(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    await beneficiary.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDonorHistory = async (req, res) => {
  try {
    const history = await DonorBeneficiary.findAll({
      where: { beneficiaryId: req.params.id },
      include: [{
        model: Donor,
        attributes: ['name', 'email', 'phone']
      }],
      order: [['startDate', 'DESC']]
    });
    res.json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 