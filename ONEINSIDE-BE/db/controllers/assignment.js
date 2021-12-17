const exportsObj = {}

const models = require('../models')
const ProjectDeveloper = models.projects_developers

exportsObj.insertAssignment = (assignment) => {
	return ProjectDeveloper.create(assignment)
}

exportsObj.deleteAssignment = (assignment) => {
	const options = {
		where: { ...assignment }
	}
	return ProjectDeveloper.destroy(options)
	  .then(() => (assignment))
}

module.exports = exportsObj