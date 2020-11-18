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
            if(err === 409) {
                response = {data: 'The user with this mail already exists',
                status: 409}
                return response;
            }

            response = {data: 'Something went wrong',
                status: 500}

            return response;
        }
    }
}