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
                    localStorage.setItem('accs_tkn', response.data);
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
        }
    },
    mutations:{
        setRegistred(state){
            state.isRegistered = true;
        },
        setFailure(state, msg) {
            state.isFailure = true;
            state.message = msg;
        }
    },
    state: {
        isRegistered: false,
        isFailure: false,
        message: ''
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
        }
    }
}
