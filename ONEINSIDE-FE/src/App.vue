<template>
  <div id="app">
    <b-container fluid>
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-button variant="warning">
          <router-link to="/projects">
            Projects
          </router-link>
        </b-button>
        <b-button variant="warning">
          <router-link to="/developers">
            Developers
          </router-link>
        </b-button>
      </b-navbar>
        <router-view/>
    </b-container>  
  </div>
</template>