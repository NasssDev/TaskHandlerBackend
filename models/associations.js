const User = require('./User');
const Donor = require('./Donor');
const Beneficiary = require('./Beneficiary');
const DonorBeneficiary = require('./DonorBeneficiary');
const Donation = require('./Donation');

// User can create/manage donors and beneficiaries
User.hasMany(Donor, {
  foreignKey: 'createdBy'
});
User.hasMany(Beneficiary, {
  foreignKey: 'createdBy'
});

// Donor-Beneficiary many-to-many relationship
Donor.belongsToMany(Beneficiary, {
  through: DonorBeneficiary,
  foreignKey: 'donorId'
});

Beneficiary.belongsToMany(Donor, {
  through: DonorBeneficiary,
  foreignKey: 'beneficiaryId'
});

DonorBeneficiary.hasMany(Donation, {
  foreignKey: 'donorBeneficiaryId'
});

Donation.belongsTo(DonorBeneficiary, {
  foreignKey: 'donorBeneficiaryId'
});

DonorBeneficiary.belongsTo(Donor, {
  foreignKey: 'donorId'
});

DonorBeneficiary.belongsTo(Beneficiary, {
  foreignKey: 'beneficiaryId'
});

Donor.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

Beneficiary.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

module.exports = {
  User,
  Donor,
  Beneficiary,
  DonorBeneficiary,
  Donation
}; 