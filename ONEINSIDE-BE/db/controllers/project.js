const exportsObj = {}

const models = require('../models')
const Developer = models.developer
const Project = models.project

exportsObj.getProjects = () => {
	return Project.findAll({include:Developer})
}

exportsObj.getProjectById = (projectId) => {
	const options = {
		where: { id: projectId },
		include: Developer,
	}
	return Project.findOne(options)
}

exportsObj.insertProject = (project) => {
	return Project.create(project)
		.then(project => exportsObj.getProjectById(project.id))
}

exportsObj.updateProjects = (project) => {
	const options = {
		where: { id: project.id }
	}
	return Project.update(project, options)
		.then(() => exportsObj.getProjectById(project.id))
}

exportsObj.deleteProject = (projectId) => {
	const options = {
		where: { id: projectId }
	}
	return Project.destroy(options)
	  .then(() => ({ id: projectId }))
}

module.exports = exportsObj