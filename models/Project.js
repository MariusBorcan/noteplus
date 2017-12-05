
module.exports = (sequelize, DataTypes) => {
    var Project = sequelize.define('Project', {
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        githubUrl: DataTypes.STRING
    });
    
    Project.associate = (models) => {
        Project.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id'
        });
    };
    return Project;
}