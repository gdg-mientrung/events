import { db, auth } from '../config/firebase';

export default {

  data: () => ({
    voteValue: 0,
    voteId: 'na',
    isLoggedIn: false,
  }),

  async created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.voteId = user.phoneNumber;
        this.fetchVote(this.voteId);
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },

  methods: {
    vote(teamId) {
      this.voteValue = teamId;
      db.ref(`votes/${this.voteId}`)
          .set(this.voteValue)
          .then(() => {
            this.voteValue = teamId;
          });
    },

    async fetchVote(voteId) {
      const voteRef = db.ref(`votes/${voteId}`);
      await voteRef.on('value', (snapshot) => {
        if (snapshot) {
          this.voteId = voteId;
          this.voteValue = JSON.stringify(snapshot);
        }
      });
    },
  },
};
