<template>
  <div class="wrapper">
    <div class="lucky-number mt-10" v-if="user && luckyNumber">
      {{ luckyNumber }}

      <div class="pa-10">
        <v-btn text @click="logout()">Đăng xuất</v-btn>
      </div>
    </div>

    <div v-else class="wrapper pa-10">
      <v-btn color="primary" to="/auth">Đăng nhập</v-btn>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../config/firebase';

export default {
  mounted() {
    this.user = auth.currentUser;
  },

  firebase: {
    settings: db.ref('settings'),
  },

  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.read(user.phoneNumber);
      }
    });
  },

  data: () => ({
    user: null,
    luckyNumber: null,
    totalLuckyNumbers: 0,
    settings: null,
  }),

  methods: {
    read(documentId) {
      db.ref(`lucky-numbers/${documentId}`).once('value', (snapshot) => {
        const luckyNumber = snapshot.val();

        if (luckyNumber) {
          this.luckyNumber = luckyNumber;
        } else {
          const newLuckyNumber = this.settings.counter + 1;
          this.createLuckyNumber(documentId, newLuckyNumber);
          this.luckyNumber = newLuckyNumber;
        }
      });
    },

    createLuckyNumber(documentId, luckyNumber) {
      db.ref(`lucky-numbers/${documentId}`).set(luckyNumber);
      db.ref('settings/counter').set(luckyNumber);
    },

    logout() {
      console.log('logout');
      auth.signOut().then(() => {
        this.$router.push('/auth');
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.lucky-number
  height: 250px
  width: 250px
  text-align: center
  background-color: #4285F4
  vertical-align: middle
  line-height: 250px
  color: #FFF
  font-size: 60px
  border-radius: 50%
  display: inline-block
.wrapper
  text-align: center
</style>
