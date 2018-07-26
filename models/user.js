"use strict";

var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email_index'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return "*****";
            },
            set(password) {
                this.setDataValue('password', crypto.createHmac('sha256', config.crypto.salt)
                    .update(password)
                    .digest('hex'));
            }
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // default values for dates => current time
        token: {
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
            tableName: 'user',

            // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
            // to the model and throw an OptimisticLockingError error when stale instances are saved.
            // Set to true or a string with the attribute name you want to use to enable.
            version: false
        });

    //Relacion con tabla Friends
    User.associate = models => {
        User.belongsToMany(models.User, {
            as: 'Friends',
            foreignKey: 'user1',
            through: 'friends',
            otherKey: 'user2'
        });
   
        //Relacion con tabla Post      
        User.hasMany(models.Post, {
            as: 'Post',
            foreignKey: 'owner'
        });
        User.hasMany(models.Comment, {
            as: 'Comment',
            foreignKey: 'owner'
        });
        User.belongsTo(models.File, {
            as: 'Photo',
            foreignKey: 'photo'
        });
        User.hasMany(models.Like, {
            as: 'Likes',
            foreignKey: 'user'
        });
    };
    return User;
};