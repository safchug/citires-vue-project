import RequestHandler from "@/utils/RequestHandler";

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
        async fetchCitiesWithId(ctx, id) {
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
                }
            } catch (err) {

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
        }
    },
    state: {
        cities: [],
        city: {},
        failureMessage: ''
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
        }
    }
}