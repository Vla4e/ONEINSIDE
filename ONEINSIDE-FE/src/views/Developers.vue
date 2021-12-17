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
      :items="developerList" 
      :fields="fields"
      @filtered="onFiltered"
      :filter="filter"
      :filter-included-fields="filterOn"
    >
      <template #cell(actions)="data">
        <b-button @click="goToDetails(data.item.id)">
          Details
        </b-button>
        <b-button @click="deleteDeveloper(data.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>

    <b-button @click="openCreateDeveloper()">
      Create New Developer
    </b-button>
    <b-modal id="modal-1" :title="!editDeveloperId ? 'Create Developer' : 'Update Developer'" v-model="isUpsertingDeveloper" hide-footer>
      <upsert-developer @submit="onUpsertDeveloper" :id="editDeveloperId"/>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import UpsertDeveloper from '@/views/UpsertDeveloper.vue'

export default {
  components: {
    UpsertDeveloper
  },
  data(){
    return {
      developerList: [],
      fields: [
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
          key: 'startWork',
          label: 'Started date',
          sortable: true,
        },
        {
          key: 'level',
          label: 'Level',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        }
      ],
      editDeveloperId: null,
      isUpsertingDeveloper: false,
      filter: null,
      filterOn: [],
    }
  },
  methods: {
    async getDevelopers(){
      this.developerList = await axios.get("http://localhost:3000/developers", {}).then((res) => res.data)
    },
    goToDetails(id){
      this.editDeveloperId = id
      this.isUpsertingDeveloper = true
    },
    async onUpsertDeveloper(developer) {
      if (!developer.id) {
        await axios.post('http://localhost:3000/developers', developer)
      } else {
        await axios.put('http://localhost:3000/developers', developer)
      }
      this.isUpsertingDeveloper = false
      await this.getDevelopers()
    },
    openCreateDeveloper() {
      this.editDeveloperId = null
      this.isUpsertingDeveloper = true
    },
    async deleteDeveloper(developerId) {
      await axios.delete(`http://localhost:3000/developers/${developerId}`)
      await this.getDevelopers()
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
    }
  },
  created(){
    this.getDevelopers()
  }

}
</script>