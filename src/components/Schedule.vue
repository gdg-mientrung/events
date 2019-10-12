<template>
  <div>
    <v-tabs
      fixed-tabs
      background-color="primary"
      slider-color="yellow"
      dark
      v-model="tab"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-0">
        Lịch trình
      </v-tab>

      <v-tab href="#tab-1">
        Layout
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-0">
        <v-container>
          <v-row>
            <v-col cols='12' class='pa-0'>
              <v-timeline align-top dense clipped>
                <v-timeline-item
                  v-for="item in schedule"
                  :key="item['.key']"
                  color='primary'
                  small
                >
                  <v-container class="py-0">
                    <v-row>
                      <v-col cols='12' class='pa-0'>
                        <strong>{{ item.time }}</strong>
                      </v-col>
                    </v-row>
                    <v-row class='pa-0'>
                      <v-col cols='12' class='px-0'>
                        <template v-for="activity in item.activities">
                          <div :key="`${$uuid.v4()}`" v-if="activity">
                            {{ activity['name'] }}
                          </div>
                        </template>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-1">
        <v-container>
          <v-img :src="layout.url"></v-img>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { db } from '../config/firebase';

export default {

  firebase: {
    schedule: db.ref('schedule'),
    layout: db.ref('layout'),
  },

  data: () => ({
    tab: null,
    schedule: [],
    layout: {
      url: 'https://bit.ly/2ICsbSC',
    },
  }),

  methods: {

  },
};
</script>

<style lang="sass" scoped>
.view-title
  background: #4285F4
  color: #FFFFFF
  text-align: center
</style>
