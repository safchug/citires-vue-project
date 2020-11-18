import axios from 'axios';
import RequestHandler from "@/utils/RequestHandler";

export default {
    actions:{
        async regist(ctx, data){
            let responce = await RequestHandler.registUser(data);
            if(responce.status === 200) {
                ctx.commit('setRegistred');
            } else {
                ctx.commit('setFailure', 'This mail is already taken');
            }/* else {
                ctx.commit('setFailure', 'Something went wrong');
            }*/
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
