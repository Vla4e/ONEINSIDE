<template>
  <div>
    <b-form @submit.prevent="$emit('submit', developer)">
      <b-form-group
        id="input-group-1"
        label="Developer Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="developer.name"
          type="text"
          placeholder="Enter Developer Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Developer Position" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="developer.position"
          :options="positions"
          placeholder="Enter Position"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-datepicker
          v-model="developer.startWork"
          :date-format-options="{ year: 'numeric', month: null, day: null }"
          id="datepicker-1"
          required
        />
      </b-form-group>


      <b-form-group id="input-group-7" label="Level" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="developer.level"
          :options="levels"
          required
        ></b-form-select>
      </b-form-group>

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
    if (this.id) this.getDeveloperById(this.id)
  },
  data() {
    return {
      developer: {},
      positions: ['frontend', 'backend'],
      levels: ['apprentice', 'junior', 'mid', 'senior', 'architect', 'consultant']
    }
  },
  methods: {
    async getDeveloperById(id){
      this.developer = await axios.get(`http://localhost:3000/developers/${id}`).then(res => res.data)
    }
  }
}
</script>