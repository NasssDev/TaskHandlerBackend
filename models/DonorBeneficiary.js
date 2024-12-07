const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DonorBeneficiary = sequelize.define('DonorBeneficiary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  beneficiaryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    defaultValue: 'active'
  },
  donationType: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  frequency: {
    type: DataTypes.ENUM('one-time', 'monthly', 'quarterly', 'yearly')
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = DonorBeneficiary; 