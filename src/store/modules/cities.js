import RequestHandler from "@/utils/RequestHandler";

export default {
    actions: {
        async fetchCities(ctx, query) {
            try{
                let response = await RequestHandler.fetchCities(query);
                ctx.commit('setSities', response.data);
            } catch (err) {
                ctx.commit('setFailureMessage', 'Something went wrong...');
            }
            }
    },

    mutations:{
        setSities(state, list){
            state.cities = list;
        },
        setFailureMessage(state, msg) {
            state.failureMessage = msg;
        }

    },
    state: {
        cities: [],
        failureMessage: ''
    ,
    getters:{
        cities(state) {
            return state.cities;
        },
        failureMessage(state){
            return state.failureMessage;
        }
        }
    }
}