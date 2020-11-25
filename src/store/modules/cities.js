import axios from "axios";

export default {
    actions: {
        async fetchCities(ctx, query) {
            try{
                let addquery = query? `?query=${query}`: ``;

                let response = await axios({
                    method: 'get',
                    url: `http://localhost:3000/api/cities${addquery}`
                });
                if(response.status === 200) {
                    ctx.commit('setSities', response.data);
                    return 'ok';
                } else {
                    return 'Something went wrong';
                }
            } catch (err) {
                return 'Something went wrong';
            }
            },
        async fetchCityWithId(ctx, id) {
            try{
                let response = await axios({
                    method: 'get',
                    url: `http://localhost:3000/api/cities/${id}`
                });
                console.log(response.data);
                if(response.status === 200) {
                    ctx.commit('setOneCity', response.data);
                    return 'ok';
                } else {
                    throw new Error();
                }
            } catch (err) {
                return 'Something went wrong...';
            }
        },
        async deleteCity(ctx, id) {
            try{
                let token = localStorage.getItem('accs_tkn');
                if(!token) return 'anauthorized';

                let response = await  await axios({
                    method: 'delete',
                    url: `http://localhost:3000/api/cities/${id}`,
                    headers: {'Authorization': `beaber ${token}`}
                });
                if(response.status === 200) {
                    ctx.commit('deleteCity', id);
                    return 'ok';
                }
            } catch (err) {
                if(err.message.includes('401')){
                    return 'Access is forbiten';
                }
                if(err.message.includes('403')) {
                    return 'You can`t do it';
                }

                return 'Something went wrong';
            }
        },
        async updateCityWithId(ctx, obj){
            try {
                let token = localStorage.getItem('accs_tkn');
                if (!token) return 'anauthorized';
                let response = await axios({
                    method: 'put',
                    url: `http://localhost:3000/api/cities/${obj.id}`,
                    headers: {'Authorization': `beaber ${token}`},
                    data: obj.data
                });
                if (response.status === 200) {
                    return 'ok';
                }
            } catch (err) {
                return err;
            }
        },
        async addCity(ctx, city){
            try {
                let token = localStorage.getItem('accs_tkn');
                if (!token) return 'anauthorized';
                let response = await axios({
                    method: 'post',
                    url:'http://localhost:3000/api/cities',
                    headers: {'Authorization': `beaber ${token}`},
                    data: city
                });
                if(response.status === 200) {
                    return 'ok';
                } else {
                    throw new Error();
                }
            } catch (err) {
                return 'Something go wrong';
            }
        }
    },

    mutations:{
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
        city: {}
    },
}