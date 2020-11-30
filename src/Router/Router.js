import Vue from 'vue';
import Router from 'vue-router';
import CitiesList from '../components/CitiesList';
import Login from '../components/Login';
import Registration from '../components/Registration';
import CityInfo from '../components/CityInfo';
import AddCityForm from '../components/AddCityForm';
import UpdateCityForm from '../components/UpdateCityForm';
import NotFound from '../components/NotFound';

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
            component: AddCityForm,
        },
        {
            path: '/update/:id',
            component: UpdateCityForm,
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});