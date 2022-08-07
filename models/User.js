const { DataTypes, Model } = require('sequelize');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            len: 5
        }
    }, 
    password: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            len: 6
        }
    }
}, 
{
    sequelize: require('../config/connection'),
    modelName: 'user'
});

User.prototype.validPass = async function(pass, stored_pass) {
    return await bcrypt.compare(pass, stored_pass);
  };
  
  module.exports = User;
  