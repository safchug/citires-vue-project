import axiosInstance from '@/utils/AxiosInstance';

export default {
    actions:{
        regist(ctx, data) {
            return axiosInstance({
                method: 'post',
                url: '/registration',
                data
            });
        },
        async login(ctx, data) {

            const response = await axiosInstance({
                method: 'post',
                url: '/login',
                data
            });
            const token = response.data.accessToken;
            const user = response.data.user;
            if(!token) throw new Error('There is no token in server response');
            if(!user) throw new Error('There is no user in server response');
            localStorage.setItem('accs_tkn', token);
            ctx.commit('setUser', user);

            return response;
        }
        ,
        async auth(ctx) {
            try{

                let token = localStorage.getItem('accs_tkn');
                if(token) {
                    console.log(token);
                    let response = await axiosInstance({
                        method: 'post',
                        url:'/auth',
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
            localStorage.clear();
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
