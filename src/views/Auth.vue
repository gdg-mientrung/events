<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div id="firebaseui-auth-container"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn text to="/">
          <v-icon>mdi-arrow-left</v-icon>
          Quay lại trang chủ
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import { auth } from "../config/firebase";

export default {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/?tab=3',
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'VN',
        }
      ],
    };

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>
