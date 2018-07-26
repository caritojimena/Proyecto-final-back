"use strict";


module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: true,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of table names; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
            
            // define the table's name
            tableName: 'post',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });
        //Relacion con User
        Post.associate = models => {
            Post.belongsTo(models.User, {
                as: 'User',
                foreignKey: 'owner'
            });
            Post.hasMany(models.Like, {
                as: 'Like',
                foreignKey: 'post'
            });
            Post.belongsTo(models.File, {
                as: 'Photo',
                foreignKey: 'photo'
            });
        };        
    return Post;
};