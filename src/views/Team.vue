<template>
  <v-container class="white">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-img :src="getPhotoUrl()" height="200px"></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="px-4">
        <div class="title">{{ team.name }}</div>
        <div v-html="team.description"></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="px-4 subtitle-2">Thành viên</div>

        <v-list>
          <v-list-item v-for="member in members" :key="`${member}${$uuid.v4()}`">
            <v-list-item-avatar tile>
              <v-img :src="getAvatarUrl(member.avatar)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="member.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" class="justify-center">
        <v-btn v-if="isLoggedIn && team.passed"
               color="orange"
               dark
               depressed
               :outlined="!isVoted(team.id)"
               @click.stop.prevent="vote(team.id)"
        >
          <v-icon small left>mdi-heart</v-icon>
          <template v-if="!isVoted(team.id)">Bình chọn</template>
          <template v-else>Đã chọn</template>
        </v-btn>
        <v-btn text to="/">Quay lại</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../config/firebase';
import VoteMixins from '../mixins/VoteMixins';

const teams = db.ref('teams');

export default {
  mixins: [VoteMixins],

  props: {
    id: Number,
  },

  data: () => ({
    team: {
      photoURL: '',
      name: '',
      description: '',
      votes: 0,
      members: [],
    },
  }),

  methods: {
    getPhotoUrl() {
      /* eslint-disable global-require */
      return this.team && this.team.photoURL ? this.team.photoURL : require('../assets/default-team-avatar.png');
    },

    getAvatarUrl(photoUrl) {
      /* eslint-disable global-require */
      return photoUrl || require('../assets/avatar.png');
    },

    isVoted(teamId) {
      return this.voteValue == teamId;
    },
  },

  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler(id) {
        this.$rtdbBind('team', teams.child(id));
      },
    },
  },

  computed: {
    members() {
      return this.team.members.filter(member => member && true);
    },
  },
};
</script>

<style lang="sass" scoped>
.vote
  background-color: orange
  color: white
  font-size: 14px

.container
  background-color: white

.justify-center
  text-align: center

.desc
  color: #d4d4d4
</style>
