<template>
  <div>
    <b-form @submit.prevent="$emit('submit', project)">
      <b-form-group
        id="input-group-1"
        label="Project Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="project.name"
          type="text"
          placeholder="Enter Project Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Project Description" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="project.description"
          placeholder="Enter Description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Backend Technology:" label-for="input-3">
        <b-form-select
          id="input-3"
          :options="backends"
          v-model="project.backend"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Frontend Technology:" label-for="input-4">
        <b-form-select
          id="input-4"
          :options="frontends"
          v-model="project.frontend"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-datepicker
          v-model="project.startTime"
          id="datepicker-1"
          required
        > 
        </b-form-datepicker>
      </b-form-group>
      <b-form-group id="input-group-6">
        <b-form-datepicker
          v-model="project.endTime"
          id="datepicker-2"
          required
        > 
        </b-form-datepicker>
      </b-form-group>
      <b-form-group id="input-group-7" label="Budget" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="project.budget"
          required
        ></b-form-input>
      </b-form-group>

      <b-table 
        sticky-header 
        striped 
        hover
        responsive
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        :items="project.developers || []" 
        :fields="devFields"
      >
        <template #cell(actions)="data">
          <b-button @click="$emit('fire', { projectId: id, developerId: data.item.id })">
            Fire
          </b-button>
        </template>
      </b-table>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: String
  },
  mounted() {
    if (this.id) this.getProjectById(this.id)
  },
  data() {
    return {
      project: {},
      devFields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'position',
          label: 'Position',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Actions',
        }
      ],
      backends: ['Java', '.NET', 'NodeJS', 'PHP'],
      frontends: ['Angular', 'React', 'Vue', 'Vanilajs']
    }
  },
  methods: {
    async getProjectById(id){
      this.project = await axios.get(`http://localhost:3000/projects/${id}`).then(res => res.data)
    }
  }
}
</script>