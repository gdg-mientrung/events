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
        v-for="team in sortedTeams"
        :key="team.id"
        @click="navigate(team.id)"
      >
        <v-list-item-avatar>
          <v-img :src="getPhotoUrl(team.photoURL)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="team.name"></v-list-item-title>
          <v-list-item-subtitle v-text="getDesc(team.description)"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon v-if="isLoggedIn && team.passed && !settings.locked">
          <v-btn color="orange"
                  small
                  depressed
                  dark
                  :outlined="!isVoted(team.id)"
                  @click.stop.prevent="vote(team.id)"
          >
            <v-icon small left>mdi-heart</v-icon>
            <template v-if="!isVoted(team.id)">Bình chọn</template>
            <template v-else>Đã chọn</template>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { db } from '../config/firebase';
import VoteMixins from '../mixins/VoteMixins';

export default {

  mixins: [VoteMixins],

  firebase: {
    teams: db.ref('teams'),
  },

  data: () => ({
    teams: [],
  }),

  computed: {
    sortedTeams() {
      return this.teams.sort((x, y) => (x.passed === y.passed) ? 0 : x.passed ? -1 : 1);
    },
  },

  methods: {
    getPhotoUrl(photoUrl) {
      /* eslint-disable global-require */
      return photoUrl || require('../assets/avatar.png');
    },

    navigate(teamId) {
      this.$router.push({ name: 'team', params: { id: teamId } });
    },

    isVoted(teamId) {
      return this.voteValue == teamId;
    },

    getDesc(htmlDescription) {
      const div = document.createElement("div");
      div.innerHTML = htmlDescription;
      const text = div.textContent || div.innerText || '';
      return text;
    }
  },
};
</script>

<style lang="sass" scoped>
.view-title
  background: #4285F4
  color: #FFFFFF
  text-align: center
</style>
