const projects = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  backend: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  frontend: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

const developers = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startWork: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

const projects_developers = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  projectId: {
    allowNull: false,
    type: Sequelize.BIGINT,
    references: {
      model: 'projects',
      key: 'id',
      as: 'projectId'
    },
  },
  developerId: {
    allowNull: false,
    type: Sequelize.BIGINT,
    references: {
      model: 'developers',
      key: 'id',
      as: 'developerId'
    },
  }
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      const projectsPromise = queryInterface.createTable('projects', projects(Sequelize))
      return Promise.all([projectsPromise])
      .then(() => {
        const developersPromise = queryInterface.createTable('developers', developers(Sequelize))
        return Promise.all([developersPromise])
        .then(() => {
          const projects_developers_Promise = queryInterface.createTable('projects_developers', projects_developers(Sequelize))
          return Promise.all([projects_developers_Promise])
        })
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      const projects_developers_Promise = queryInterface.dropTable('projects_developers')
      return Promise.all([projects_developers_Promise])
      .then(() => {
        const developersPromise = queryInterface.dropTable('developers')
        return Promise.all([developersPromise])
        .then(() => {
          const projectsPromise = queryInterface.dropTable('projects')
          return Promise.all([projectsPromise])
        })
      })
    })
  }
}