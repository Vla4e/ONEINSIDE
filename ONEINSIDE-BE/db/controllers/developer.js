const exportsObj = {}

const models = require('../models')
const Project = models.project
const Developer = models.developer

exportsObj.getDevelopers = () => {
	return Developer.findAll({include:Project})
}

exportsObj.getDeveloperById = (developerId) => {
	const options = {
		where: { id: developerId },
        include: Project,
	}
	return Developer.findOne(options)
}

exportsObj.insertDeveloper = (developer) => {
	return Developer.create(developer)
		.then(developer => exportsObj.getDeveloperById(developer.id))
}

exportsObj.updateDevelopers = (developer) => {
	const options = {
		where: { id: developer.id }
	}
	return Developer.update(developer, options)
		.then(() => exportsObj.getDeveloperById(developer.id))
}

exportsObj.deleteDeveloper = (developerId) => {
	const options = {
		where: { id: developerId }
	}
	return Developer.destroy(options)
	  .then(() => ({ id: developerId }))
}

module.exports = exportsObj