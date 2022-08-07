const { DataTypes, Model } = require('sequelize');

class Post extends Model { }

Post.init({
    post_title: {
        type: DataTypes.STRING(30), 
        allowNull: false
    }, 
    content: {
        type: DataTypes.STRING(700), 
        allowNull: false
    }
}, 
{
    sequelize: require('../config/connection'), 
    modelName: 'post'
});

module.exports = Post;