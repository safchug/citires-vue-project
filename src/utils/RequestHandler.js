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
            response = await axios({
                method: 'get',
                url: `http://localhost:3000/api/cities${addquery}`
            });
            return response;
        } catch (err) {
            response = {data: 'Something went wrong', status: 500};
            return response;
        }
    }
}