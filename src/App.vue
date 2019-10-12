<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <v-content>
        <router-view/>
      </v-content>

      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
#app
  max-width: 768px
  margin: 0 auto
</style>
