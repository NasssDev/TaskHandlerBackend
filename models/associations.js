const User = require('./User');
const Task = require('./Task');

Task.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Task, {
  foreignKey: 'userId'
});

module.exports = { User, Task }; 