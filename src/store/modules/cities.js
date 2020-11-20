import RequestHandler from "@/utils/RequestHandler";
import router from '@/components/Router';

export default {
    actions: {
        async fetchCities(ctx, query) {
            try{
                let response = await RequestHandler.fetchCities(query);
                console.log(response.data);
                ctx.commit('setSities', response.data);
            } catch (err) {
                ctx.commit('setFailureMessage', 'Something went wrong...');
            }
            },
        async fetchCityWithId(ctx, id) {
            try{
                let response = await RequestHandler.fetchCitiesWithId(id);
                console.log(response.data);
                if(response.status === 200) {
                    ctx.commit('setOneCity', response.data);
                } else {
                    throw new Error();
                }
            } catch (err) {
                ctx.commit('setFailureMessage', 'Something went wrong...');
            }
        },
        async deleteCity(ctx, id) {
            try{
                let token = localStorage.getItem('accs_tkn');
                let response = await RequestHandler.deleteCity(id, token);
                if(response.status === 200) {
                    ctx.commit('deleteCity', id);
                    router.push('/');
                } else if(response.status === 401) {
                    ctx.commit('setFailureMessage', 'Access is forbiten');
                } else if (response.status === 403){
                    ctx.commit('setFailureMessage', 'You can`t do it');
                } else {
                    ctx.commit('setFailureMessage', 'Something went wrong');
                }
            } catch (err) {
                ctx.commit('setFailureMessage', 'Something went wrong');
            }
        },
        async updateCityWithId(ctx, obj){
            try {
                let token = localStorage.getItem('accs_tkn');
                let response = await RequestHandler.updateCity(obj.id, token, obj.data);
                if(response.status === 200) {
                    ctx.commit('setUpdateStatus', 'City successfuly updated');
                } else if(response.status === 403){
                    ctx.commit('setUpdateStatus', 'You can`t do it');
                }
            } catch (err) {
                ctx.commit('setUpdateStatus', 'Something went wrong');
            }
        },
        async addCity(ctx, city){
            try {
                let token = localStorage.getItem('accs_tkn');
                let response = await RequestHandler.addCity(city, token);
                if(response.status === 200) {
                    ctx.commit('setAddingStatus', 'City successfuly added');
                } else {
                    ctx.commit('setAddingStatus', 'Something went wrong');
                }
            } catch (err) {
                ctx.commit('setAddingStatus', 'Something went wrong');
            }
        }
    },

    mutations:{
        setSities(state, list){
            state.cities = list;
        },
        setFailureMessage(state, msg) {
            state.failureMessage = msg;
        },
        setOneCity(state, city) {
            state.city = city;
        },
        deleteCity(state, id) {
            if(state.cities.length !== 0) {
                state.cities = state.cities.filter(item=> item.id !== id);
            }
        },
        setUpdateStatus(state, msg) {
            state.updateStus = msg;
        },
        setAddingStatus(state, msg) {
            state.addingStutus = msg;
        }
    },
    state: {
        cities: [],
        city: {},
        failureMessage: '',
        updateStus: '',
        addingStutus: '',
    },

    getters:{
        cities(state) {
            return state.cities;
        },
        failureMessage(state){
            return state.failureMessage;
        },
        city(state) {
            return state.city;
        },
        updateStus(state){
            return state.updateStus;
        },
        addingStatus(state) {
            return state.addingStutus;
        }
    }
}