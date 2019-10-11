import Vue from 'vue';
import { rtdbPlugin } from 'vuefire';
import Firebase from 'firebase';

Vue.use(rtdbPlugin);

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSENGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

const app = Firebase.initializeApp(config);

const db = app.database();
const auth = app.auth();
app.auth().languageCode = 'vi';

export { db, auth };
