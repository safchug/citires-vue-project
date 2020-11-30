import axiosInstance from '@/utils/AxiosInstance';

export default {
    actions: {
        async fetchCities(ctx, query) {
            ctx.commit('startLoading');

            let addquery = query? `?query=${query}`: ``;

            let response = await axiosInstance({
                method: 'get',
                url: `/cities${addquery}`
            });

            ctx.commit('setSities', response.data);
            ctx.commit('stopLoading')

            return response;
        },
        async fetchCityWithId(ctx, id) {
            let response = await axiosInstance({
                method: 'get',
                url: `/cities/${id}`
            });
            if(! response.data) throw new Error('There is no data in server response');
            ctx.commit('setOneCity', response.data);
        },
        async deleteCity(ctx, id) {
            let token = localStorage.getItem('accs_tkn');
            if(!token) throw new Error('User is not authorized');

            const response = await  await axiosInstance({
                method: 'delete',
                url: `cities/${id}`,
                headers: {'Authorization': `beaber ${token}`}
            });
            ctx.commit('deleteCity', id);
            return response;
        },
        updateCityWithId(ctx, obj){
            let token = localStorage.getItem('accs_tkn');
            if(!token) throw new Error('User is not authorized');
            return axiosInstance({
                method: 'put',
                url: `/cities/${obj.id}`,
                headers: {'Authorization': `beaber ${token}`},
                data: obj.city
            });
        },
        addCity(ctx, city) {
            let token = localStorage.getItem('accs_tkn');
            if(!token) throw new Error('User is not authorized');
            return axiosInstance({
                method: 'post',
                url: '/cities',
                headers: {'Authorization': `beaber ${token}`},
                data: city
            });
        }
    },

    mutations:{
        startLoading(state) {
          state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        setSities(state, list){
            state.cities = list;
        },
        setOneCity(state, city) {
            state.city = city;
        },
        deleteCity(state, id) {
            if(state.cities.length !== 0) {
                state.cities = state.cities.filter(item=> item.id !== id);
            }
        }
    },
    state: {
        cities: [],
        city: {},
        loading: false
    },
}