<template>
  <v-container class="home pa-0">
    <div class="pa-0 home-content">
      <teams v-show="activeNav===0"></teams>
      <schedule v-show="activeNav===1"></schedule>
      <sponsor v-show="activeNav===2"></sponsor>
      <account v-show="activeNav===3"></account>
    </div>

    <v-bottom-navigation
      app
      v-model="activeNav"
      fixed
      grow
      color="primary"
    >
      <v-btn>
        <span>Đội thi</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>

      <v-btn>
        <span>Lịch trình</span>
        <v-icon>mdi-clock-outline</v-icon>
      </v-btn>

      <v-btn>
        <span>Nhà tài trợ</span>
        <v-icon>mdi-account-badge-outline</v-icon>
      </v-btn>

      <v-btn>
        <span>Tài khoản</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';
import Schedule from '../components/Schedule.vue';
import Teams from '../components/Teams.vue';
import Sponsor from '../components/Sponsor.vue';
import Account from '../components/Account.vue';

export default {
  components: {
    Schedule,
    Teams,
    Sponsor,
    Account,
  },

  mounted() {
    const tab = this.$route.query.tab;
    this.activeNav = +tab;
  },

  data: () => ({
    activeNav: 0,
  }),

  watch: {
    activeNav() {
      return goTo(0);
    },
  },
};
</script>
