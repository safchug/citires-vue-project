import axios from 'axios';
import router from '@/components/Router';

import RequestHandler from "@/utils/RequestHandler";

export default {
    actions:{
        async regist(ctx, data){
            let responce = await RequestHandler.registUser(data);
            if(responce.status === 200) {
                ctx.commit('setRegistred');
            } else if(responce.status === 409){
                ctx.commit('setFailure', 'This mail is already taken');
            } else {
                ctx.commit('setFailure', 'Something went wrong');
            }
        },
        async login(ctx, data) {
            try {
                let response = await RequestHandler.loginUser(data);
                if(response.status === 200) {
                    console.log(data);
                    localStorage.setItem('accs_tkn', response.data.accessToken);
                    ctx.commit('setUser', response.data.user);
                    router.push('/');
                } if(response.status === 401) {
                    ctx.commit('setFailure', 'Your mail or password is incorrect');
                } else if(response.status === 422){
                    ctx.commit('setFailure', response.data);
                } else {
                    ctx.commit('setFailure', response.data);
                }
            } catch (err) {
                ctx.commit('setFailure', 'Something went wrong');
                console.log(err);
            }
        },
        async auth(ctx, user) {
            try{

                let token = localStorage.getItem('accs_tkn');
                if(token) {
                    console.log(token);
                    let response = await RequestHandler.auth(token);
                    if(response.status === 200){
                        ctx.commit('setUser', response.data);
                    } else {
                        localStorage.removeItem('accs_tkn');
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
        async logout(ctx){
            ctx.commit('setUser', null);
            localStorage.removeItem('accs_tkn');
        }
    },
    mutations:{
        setRegistred(state){
            state.isRegistered = true;
        },
        setFailure(state, msg) {
            state.isFailure = true;
            state.message = msg;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    state: {
        isRegistered: false,
        isFailure: false,
        message: '',
        user: null
    },
    getters: {
        isRegistered(state){
            return state.isRegistered;
        },
        isFailure(state) {
            return state.isFailure;
        },
        message(state) {
            return state.message;
        },
        user(state) {
            return state.user;
        }
    }
}
