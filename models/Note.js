
module.exports = (sequelize, DataTypes) => {
    var Note = sequelize.define('Note', {
        projectId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        text: DataTypes.STRING
    });
    
    Note.associate = (models) => {
        Note.belongsTo(models.Project, {
            foreignKey: 'projectId',
            targetKey: 'id'
        });
    };
    return Note;
}