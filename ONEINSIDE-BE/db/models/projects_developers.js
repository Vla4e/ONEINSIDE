'use-strict'
module.exports = (sequelize, DataTypes) => {
    const Projects_Developers = sequelize.define('projects_developers', {
        projectId: DataTypes.BIGINT,
        developerId: DataTypes.BIGINT,
    }, { timestamps: false})
    return Projects_Developers
}