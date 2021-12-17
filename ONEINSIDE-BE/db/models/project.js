'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    backend: DataTypes.ENUM({
      values: ['Java', '.NET', 'NodeJS', 'PHP']
    }),
    frontend: DataTypes.ENUM({
      values: ['Angular', 'React', 'Vue', 'Vanilajs']
    }),
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    budget: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  Project.associate = (models) => {
    Project.belongsToMany(models.developer, { through: 'projects_developers'});
  }
  return Project
}