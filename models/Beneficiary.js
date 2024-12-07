const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Beneficiary = sequelize.define('Beneficiary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.TEXT
  },
  needType: {
    type: DataTypes.STRING // e.g., 'financial', 'medical', 'education'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'urgent'),
    defaultValue: 'active'
  },
  description: {
    type: DataTypes.TEXT
  }
});

module.exports = Beneficiary; 