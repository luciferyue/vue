const Sequelize = require('sequelize'); //暗号：哈希算法
module.exports.initModel = async sequelize => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
    },
    name: Sequelize.STRING,
  }, { tableName: 'user' });

  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, allowNull: true, primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, { tableName: 'product' });

  Product.belongsTo(User, {
    constraints: true, onDelete: 'CASCADE'
  });

  User.hasMany(Product);
  //同步
  await sequelize.sync();
  return { User, Product }
} 
