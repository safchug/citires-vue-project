import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../components/Cities/Home'),
    },
    {
      path: '/login',
      component: () => import('../components/Auth/Login'),
    },
    {
      path: '/registration',
      component: () => import('../components/Auth/Registration'),
    },
    {
      path: '/city/:id',
      component: () => import('../components/Cities/CityInfo'),
    },
    {
      path: '/addcity',
      component: () => import('../components/Cities/AddCityForm'),
    },
    {
      path: '/update/:id',
      component: () => import('../components/Cities/UpdateCityForm'),
    },
    {
      path: '*',
      component: () => import('../components/NotFound'),
    },
  ],
});
