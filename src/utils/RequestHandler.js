import axios from "axios";

export default {
    async registUser({firstname, lastname, mail, birthday, password}){
        let response;
        try {
            let data = {name: `${firstname} ${lastname}`,
                mail, birthday, password};
            console.log(data);
             response = await axios({
                method: 'post',
                url:'http://localhost:3000/api/registration',
                data
            });
        console.log(response);
        return response;
        } catch (err) {
            console.log('err', err.message);
            if(err.message.includes('409')) {
                response = {data: 'The user with this mail already exists',
                status: 409}
                return response;
            }

            response = {data: 'Something went wrong',
                status: 500}

            return response;
        }
    },
    async loginUser({mail, password}){
        let response;
        try {
            let data = {mail, password};
            console.log(data);
            response = await axios({
                method: 'post',
                url:'http://localhost:3000/api/login',
                data
            });
            console.log(response);
            return response;
        } catch (err) {
            console.log('err', err.message);
            if(err.message.includes('401')) {
                response = {data: 'Bad credentials',
                    status: 401}
                return response;
            }

            if(err.message.includes('422')) {
                response = {data: 'Enter login and password',
                    status: 422}
                return response;
            }
            response = {data: 'Something went wrong',
                status: 500}

            return response;
        }
    },

    async fetchCities(query) {
        let response;
        try {
            let addquery = query? `?query=${query}`: ``;
            console.log(addquery);
            response = await axios({
                method: 'get',
                url: `http://localhost:3000/api/cities${addquery}`
            });
            return response;
        } catch (err) {
            response = {data: 'Something went wrong', status: 500};
            return response;
        }
    },
    async fetchCitiesWithId(id) {
        let response;
        console.log(`http://localhost:3000/api/cities/${id}`);
        try {
            response = await axios({
                method: 'get',
                url: `http://localhost:3000/api/cities/${id}`
            });
            return response;
        } catch (err) {
            response = {data: 'Something went wrong', status: 500};
            return response;
        }
    },
    async deleteCity(id, token) {
        let response;
        try {
            console.log( `http://localhost:3000/api/cities/${id}`);
            response = await axios({
                method: 'delete',
                url: `http://localhost:3000/api/cities/${id}`,
                headers: {'Authorization': `beaber ${token}`}
            });
            return response;
        } catch (err) {
            if(err.message.includes('401')){
                response = {data: 'Access is forbiten', status: 401};
                return response;
            }
            if(err.message.includes('403')) {
                response = {data: 'You can`t do it', status: 403};
                return response;
            }

            response = {data: 'Something went wrong', status: 500};
            return response;
        }
    },
    async updateCity(id, token, data) {
        let response;
        try {
            console.log('action: ', data);
            response = await axios({
                method: 'put',
                url: `http://localhost:3000/api/cities/${id}`,
                headers: {'Authorization': `beaber ${token}`},
                data
            });
            return response;
        } catch (err) {
            if(err.message.includes('403')) {
                response = {data: 'You can`t do it', status: 403};
                return response;
            }

            response = {data: 'Something went wrong', status: 500};
            return response;
        }

    },
    async addCity(city, token) {
            let response;
            try {
                console.log(city);
                response = await axios({
                    method: 'post',
                    url:'http://localhost:3000/api/cities',
                    headers: {'Authorization': `beaber ${token}`},
                    data: city
                });
                console.log(response);
                return response;
            } catch (err) {
                response = {data: 'Something went wrong',
                    status: 500}

                return response;
            }
    }
}