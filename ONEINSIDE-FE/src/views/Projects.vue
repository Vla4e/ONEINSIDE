<template>
  <div>
    <b-row responsive>
      <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
        responsive
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>

          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-row>
    <b-table 
      sticky-header 
      striped 
      hover
      responsive
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :items="projectList" 
      :fields="fields"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #cell(actions)="data">
        <b-button @click="goToDetails(data.item.id)">
          Details
        </b-button>
        <b-button @click="deleteProject(data.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>

    <b-button @click="openCreateProject()">
      Create New Project
    </b-button>
    <b-modal id="modal-1" :title="!editProjectId ? 'Create Project' : 'Update Project'" v-model="isUpsertingProject" hide-footer>
      <upsert-project @submit="onUpsertProject" @fire="fireDeveloper" :id="editProjectId"/>
    </b-modal>

    <b-button @click="isAssigningProject = true">
      Assign Developer to Project
    </b-button>
    <b-modal id="modal-2" title="Assign to Developer" v-model="isAssigningProject" hide-footer>
      <assignment-card :projects="projectList" :developers="developerList" @submit="createAssignment"/>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import AssignmentCard from '@/views/Assignment.vue'
import UpsertProject from '@/views/UpsertProject.vue'

export default {
  components: {
    AssignmentCard,
    UpsertProject
  },
  data(){
    return {
      projectList: [],
      developerList: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'description',
          label: 'Description',
          sortable: true,
        },
        {
          key: 'backend',
          label: 'Backend',
          sortable: true,
        },
        {
          key: 'startTime',
          label: 'Start Time',
          sortable: true,
        },
        {
          key: 'endTime',
          label: 'End Time',
          sortable: true,
        },
        {
          key: 'budget',
          label: 'Budget',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        }
      ],
      editProjectId: null,
      isUpsertingProject: false,
      isAssigningProject: false,
      filter: null,
      filterOn: [],
    }
  },
  methods: {
    async getProjects(){
      this.projectList = await axios.get("http://localhost:3000/projects", {}).then((res) => res.data)
      this.developerList = await axios.get("http://localhost:3000/developers", {}).then((res) => res.data)
    },
    goToDetails(id){
      this.editProjectId = id
      this.isUpsertingProject = true
    },
    openCreateProject() {
      this.editProjectId = null
      this.isUpsertingProject = true
    },
    async onUpsertProject(project) {
      if (!project.id) {
        await axios.post('http://localhost:3000/projects', project)
      } else {
        await axios.put('http://localhost:3000/projects', project)
      }
      this.isUpsertingProject = false
      await this.getProjects()
    },
    async createAssignment(assignment) {
      await axios.post('http://localhost:3000/assignments', assignment)
      this.isAssigningProject = false
    },
    async fireDeveloper(assignment) {
      await axios.delete('http://localhost:3000/assignments', assignment)
      this.isUpsertingProject = false
      await this.getProjects()
    },
    async deleteProject(projectId) {
      await axios.delete(`http://localhost:3000/projects/${projectId}`)
      await this.getProjects()
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
  },
  created(){
    this.getProjects()
  }

}
</script>
