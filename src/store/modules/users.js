import axios from 'axios';

export default {
    actions:{
        regist(ctx, data) {
            return axios({
                method: 'post',
                url: 'http://localhost:3000/api/registration',
                data
            });
        },
        async login(ctx, data) {
            let response;
            try {
                console.log(data);
                response = await axios({
                    method: 'post',
                    url:'http://localhost:3000/api/login',
                    data
                });
                if(response.status === 200) {
                    localStorage.setItem('accs_tkn', response.data.accessToken);
                    ctx.commit('setUser', response.data.user);
                    return 'ok';
                }
            } catch (err) {
                console.log('err', err.message);
                if(err.message.includes('401')) {
                    return 'Bad credentials';
                }

                if(err.message.includes('422')) {
                    return 'Enter login and password';
                }
                return 'Something went wrong';
            }
        },
        async auth(ctx) {
            try{

                let token = localStorage.getItem('accs_tkn');
                if(token) {
                    console.log(token);
                    let response = await axios({
                        method: 'post',
                        url:'http://localhost:3000/api/auth',
                        headers: {'Authorization': `beaber ${token}`},
                        body : {}
                    });

                    if(response.status === 200){
                        ctx.commit('setUser', response.data);
                    } else {
                        localStorage.removeItem('accs_tkn');
                    }
                }
            } catch (err) {
                localStorage.removeItem('accs_tkn');
                console.log(err);
            }
        },
        logout(ctx){
            ctx.commit('setUser', null);
            localStorage.removeItem('accs_tkn');
        }
    },
    mutations:{
        setUser(state, user) {
            state.user = user;
        }
    },
    state: {
        user: null
    }
}
