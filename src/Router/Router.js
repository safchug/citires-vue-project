import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('../components/CitiesList')
        },
        {
            path: '/login',
            component: () => import('../components/Login')
        },
        {
            path: '/registration',
            component: () => import('../components/Registration')
        },
        {
            path:'/city/:id',
            component: () => import('../components/CityInfo')
        },
        {
            path:'/addcity',
            component: () => import('../components/AddCityForm')
        },
        {
            path: '/update/:id',
            component: () => import('../components/UpdateCityForm')
        },
        {
            path: '*',
            component: () => import('../components/NotFound')
        }
    ]
});