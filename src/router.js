import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      props: true,
      name: 'home',
      component: Home,
    },
    {
      path: '/team/:id',
      props: true,
      name: 'team',
      component: () => import('./views/Team.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue'),
    },
  ],
});
