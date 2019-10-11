<template>
  <div class="wrapper">
    <div class="lucky-number mt-10" v-if="this.user">
      15
    </div>

    <div>
      <v-btn to="/auth">Đăng nhập</v-btn>
    </div>
  </div>
</template>

<script>
import { auth } from "../config/firebase";

export default {
  mounted() {
    this.user = auth.currentUser;
  },

  data: () => ({
    user: null,
  }),
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
