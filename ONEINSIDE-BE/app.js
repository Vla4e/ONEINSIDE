const express = require('express')
const cors = require('cors')
const app = express()
require('./db')

const projectsDb = require('./db/controllers/project.js')
const developersDb = require ('./db/controllers/developer.js')
const assignmentsDb = require ('./db/controllers/assignment.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//Project api calls
app.get('/projects', async (req, res) => {
  try {
    const projects = await projectsDb.getProjects()
    res.send(projects)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})
app.get('/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectsDb.getProjectById(id)
    res.send(project)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.post('/projects', async (req, res) => {
  try {
    const project = req.body
    const insertedProject = await projectsDb.insertProject(project)
    res.send(insertedProject)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.put('/projects', async (req, res) => {
  try {
    const project = req.body
    const updatedProject = await projectsDb.updateProjects(project)
    res.send(updatedProject)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.delete('/projects/:id', async (req, res) => {
  try {
    const id = req.params.id
    await projectsDb.deleteProject(id)
    res.send({ success: true })
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

//Developer api calls
app.get('/developers', async (req, res) => {
  try {
    const developers = await developersDb.getDevelopers()
    res.send(developers)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})
app.get('/developers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const developer = await developersDb.getDeveloperById(id)
    res.send(developer)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.post('/developers', async (req, res) => {
  try {
    const developer = req.body
    const insertedDeveloper = await developersDb.insertDeveloper(developer)
    res.send(insertedDeveloper)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.put('/developers', async (req, res) => {
  try {
    const developer = req.body
    const updatedDeveloper = await developersDb.updateDevelopers(developer)
    res.send(updatedDeveloper)
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.delete('/developers/:id', async (req, res) => {
  try {
    const id = req.params.id
    await developersDb.deleteDeveloper(id)
    res.send({ success: true })
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.post('/assignments', async (req, res) => {
  try {
    const assignment = req.body
    await assignmentsDb.insertAssignment(assignment)
    res.send({ success: true })
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.delete('/assignments', async (req, res) => {
  try {
    const assignment = req.body
    await assignmentsDb.deleteAssignment(assignment)
    res.send({ success: true })
  } catch(e) {
    res.status(500).json({ status: 'internalError' })
  }
})

app.use('*', (req, res) => {
  res.status(404).send()
})

module.exports = app