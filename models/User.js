const { DataTypes, Model } = require('sequelize');
const bcrypt = require("bcrypt");
const Post = require('./Post')

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
    modelName: 'user', 
    hooks: {
        async beforeCreate(user) {

            const hashed_pass = await bcrypt.hash(user.password, 10);

            user.password = hashed_pass;
        }
    }
});

User.prototype.validatePassword = async function(password, stored_password) {
    return await bcrypt.compare(password, stored_password);
  };

  User.hasMany(Post)
  Post.belongsTo(User)
  
  module.exports = User;
  