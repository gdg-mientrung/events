<template>
  <div class="wrapper">
    <v-progress-linear
        v-show="isLoading"
        indeterminate
        color="cyan"
    ></v-progress-linear>

    <div v-show="!isLoading">
      <div v-if="user && luckyNumber">
        <div class="pa-4">Số may mắn của bạn</div>

        <div class="lucky-number my-5">
          {{ luckyNumber }}
        </div>

        <div class="pa-4">
          <v-alert outlined
                   type="success"
                   prominent
                   border="left">
            Đây là con số may mắn của bạn. Hãy lưu giữ bằng cách chụp ảnh màn hình để tham gia quay số trúng thưởng.
          </v-alert>
        </div>

        <div class="pa-5">
          <v-btn text @click="logout()">Đăng xuất</v-btn>
        </div>
      </div>

      <div v-else class="wrapper pa-5">
        <v-btn color="primary" to="/auth">Đăng nhập</v-btn>
      </div>
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

  async created() {
    this.isLoading = true;
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.read(user.phoneNumber);
      }
    });
  },

  data: () => ({
    isLoading: false,
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

        this.isLoading = false;
      }).then(() => {
        this.isLoading = false;
      });
    },

    createLuckyNumber(documentId, luckyNumber) {
      db.ref(`lucky-numbers/${documentId}`).set(luckyNumber);
      db.ref('settings/counter').set(luckyNumber);
    },

    logout() {
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
