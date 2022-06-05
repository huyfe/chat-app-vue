import MessengerStatus from '@/const/MessengerStatus';
import { setCookie, getCookie, checkCookie } from '@/helpers/common.js';

// initial state
const state = () => ({
    profile: {}
})

// getters
const getters = {
    clientProfile: (state, getters, rootState) => {
        return state.profile;
    }
}

// actions
const actions = {
    getProfile({ commit }, data) {
        const profile = data;
        commit('setProfile', profile);
    }
}

// mutations
const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
        // console.log("Check cookie", checkCookie());
        if (!checkCookie()) {
            setCookie("token", profile.token, 1);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}