import { db, auth } from '../config/firebase';
import _ from 'lodash';

export default {

  data: () => ({
    voteValue: 0,
    voteId: 'na',
    isLoggedIn: false,
    votes: null,
  }),

  firebase: {
    votes: db.ref('votes'),
  },

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
            this.computeResults();
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

    computeResults() {
      const votes = _.values(this.votes);
      const results = _.countBy(votes, item => item);
      db.ref('results').set(results);
    },
  },
};
