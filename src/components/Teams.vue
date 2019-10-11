<template>
  <div>
    <v-container class="py-0" fluid>
      <v-row class='pa-0'>
        <v-col cols='12' class='view-title'>
          <div class='title'>Đội tham gia</div>
        </v-col>
      </v-row>
    </v-container>
    <v-list subheader>
      <v-list-item
        v-for="team in teams"
        :key="team.id"
        @click="navigate(team.id)"
      >
        <v-list-item-avatar>
          <v-img :src="getPhotoUrl(team.photoURL)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="team.name"></v-list-item-title>
          <v-list-item-subtitle v-html="team.description"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-chip color="orange" dark outlined>
            <v-icon small left>mdi-heart</v-icon>
            Bình chọn:
            {{ team.votes }}
          </v-chip>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { db } from '../config/firebase';

export default {

  firebase: {
    teams: db.ref('teams'),
  },

  data: () => ({
    teams: [],
  }),

  methods: {
    getPhotoUrl(photoUrl) {
      /* eslint-disable global-require */
      return photoUrl || require('../assets/avatar.png');
    },

    navigate(teamId) {
      this.$router.push({ name: 'team', params: { id: teamId } });
    },
  },
};
</script>

<style lang="sass" scoped>
  .view-title
    background: #4285F4
    color: #FFFFFF
    text-align: center
</style>
