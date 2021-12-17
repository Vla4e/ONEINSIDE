<template>
    <b-card
      title="Developer Assignment"
      tag="article"
      style="max-width: 50vw;"
      class="mb-2"
    >
      <b-form-select v-model="assignment.projectId" :options="projects" text-field="name" value-field="id"></b-form-select>
      <b-form-select v-model="assignment.developerId" :options="developers" text-field="name" value-field="id"></b-form-select>

      <b-button @click="$emit('submit', assignment)">Submit</b-button>
    </b-card>
</template>

<script>
export default {
  props: {
    projects: Array,
    developers: Array
  },
  data() {
    return {
      assignment: {
        projectId: null,
        developerId: null
      }
    }
  }
}
</script>
