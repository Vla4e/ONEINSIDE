'use-strict'
module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define('developer', {
        name: DataTypes.STRING,
        position: DataTypes.ENUM({
          values: ['frontend', 'backend']
        }),
        startWork: DataTypes.DATE,
        level: DataTypes.ENUM({
          values: ['apprentice', 'junior', 'mid', 'senior', 'architect', 'consultant']
        }),
    }, { timestamps: false}
    )
    Developer.associate = (models) => {
        Developer.belongsToMany(models.project, { through: 'projects_developers'});
      }
    return Developer
}