<template>
  <v-container>
    <v-row v-for="sponsor in sponsors"
           :key="sponsor.type"
    >
      <v-col cols="12">
        <div class="title">{{ sponsor.type }}</div>
        <template v-for="org in sponsor.organizations">
          <div class="org my-5" :key="`${$uuid.v4()}`" v-if="org">
            <v-row justify="center">
              <img height="184px" width="306px" :src="org">
            </v-row>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../config/firebase';

export default {

  firebase: {
    sponsors: db.ref('organizations'),
  },

  data: () => ({
    sponsors: [],
  }),
};
</script>

<style lang="sass" scoped>
.org
  border: 1px solid #ccc
  border-radius: 15px
  text-align: center
  background-color: white

.title
  text-align: center
</style>
