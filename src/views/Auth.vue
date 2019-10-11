<template>
  <v-container>
    <v-card>
      <v-card-text class="text-xs-center">
        <div id="firebaseui-auth-container"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import { auth } from "../config/firebase";

export default {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
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
