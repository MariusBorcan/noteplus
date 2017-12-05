
module.exports = (sequelize, DataTypes) => {
    var Tag = sequelize.define('Tag', {
        noteId: DataTypes.INTEGER,
        text: DataTypes.STRING
    });
    
    Tag.associate = (models) => {
        Tag.belongsTo(models.Note, {
            foreignKey: 'noteId',
            targetKey: 'id'
        });
    };
    return Tag;
}