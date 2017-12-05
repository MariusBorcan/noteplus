"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        githubUrl: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        organization: DataTypes.STRING,
        location: DataTypes.STRING,
        website: DataTypes.STRING
    });
    return User;
};
