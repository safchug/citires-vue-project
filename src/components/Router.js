import Vue from 'vue';
import Router from 'vue-router';
import CitiesList from './CitiesList';
import Login from './Login';
import Registration from './Registration';
import CityInfo from './CityInfo';
import AddCityForm from './AddCityForm';
import UpdateCityForm from './UpdateCityForm';
import NotFound from './NotFound';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: CitiesList
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/registration',
            component: Registration
        },
        {
            path:'/city/:id',
            component: CityInfo
        },
        {
            path:'/addcity',
            component: AddCityForm
        },
        {
            path: '/update/:id',
            component: UpdateCityForm
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});