const User = require('./User');
const Donor = require('./Donor');
const Beneficiary = require('./Beneficiary');
const DonorBeneficiary = require('./DonorBeneficiary');
const Donation = require('./Donation');

// User associations
User.hasMany(Donor, {
  foreignKey: 'createdBy',
  as: 'donors'
});

User.hasMany(Beneficiary, {
  foreignKey: 'createdBy',
  as: 'beneficiaries'
});

// Donor associations
Donor.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

Donor.belongsToMany(Beneficiary, {
  through: DonorBeneficiary,
  foreignKey: 'donorId',
  as: 'beneficiaries'
});

// Beneficiary associations
Beneficiary.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

Beneficiary.belongsToMany(Donor, {
  through: DonorBeneficiary,
  foreignKey: 'beneficiaryId',
  as: 'donors'
});

// DonorBeneficiary associations
DonorBeneficiary.belongsTo(Donor, {
  foreignKey: 'donorId'
});

DonorBeneficiary.belongsTo(Beneficiary, {
  foreignKey: 'beneficiaryId'
});

DonorBeneficiary.hasMany(Donation, {
  foreignKey: 'donorBeneficiaryId',
  as: 'donations'
});

// Donation associations
Donation.belongsTo(DonorBeneficiary, {
  foreignKey: 'donorBeneficiaryId'
});

module.exports = {
  User,
  Donor,
  Beneficiary,
  DonorBeneficiary,
  Donation
}; 