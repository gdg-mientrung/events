<template>
  <v-container class="white">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-img :src="getPhotoUrl()" height="200px"></v-img>
      </v-col>
    </v-row>

    <v-row class="vote">
      <v-col>
        <div class="px-4">Lượt bình chọn: {{ team.votes }}</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="title px-4">{{ team.name }}</div>
        <v-subheader>{{ team.description }}</v-subheader>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="px-4 subtitle-2">Thành viên</div>

        <v-list>
          <v-list-item v-for="member in members" :key="`${$uuid.v4()}`">
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
        <v-chip color="orange" dark outlined>
          <v-icon small left>mdi-heart</v-icon>
          Bình chọn
        </v-chip>
        <v-btn text to="/">Quay lại</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../config/firebase';
const teams = db.ref('teams');

export default {
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
    getPhotoUrl(){
      return this.team && this.team.photoURL ? this.team.photoURL : require('../assets/default-team-avatar.png');
    },

    getAvatarUrl(photoUrl){
      return photoUrl ? photoUrl : require('../assets/avatar.png');
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
  }
}
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
</style>
