import axios from 'axios';

const {
    VUE_APP_PROTOCOL: APP_PROTOCOL,
    VUE_APP_DOMEN: APP_DOMEN,
    VUE_APP_PORT: APP_PORT } = process.env;

export default axios.create({
    baseURL: `${APP_PROTOCOL}://${APP_DOMEN}:${APP_PORT}/api`
})