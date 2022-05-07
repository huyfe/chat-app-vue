import MessengerStatus from '@/const/MessengerStatus';
import { setCookie, getCookie } from '@/helpers/common.js';

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
        // const profile = {
        //     id: 'me123',
        //     avatar: require('@/assets/images/user.png'),
        //     firstName: 'Mehmet',
        //     lastName: 'Revnaki',
        //     status: MessengerStatus.WORKING,
        // }
        const profile = data;

        commit('setProfile', profile);
    }
}

// mutations
const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
        setCookie("token", profile.token, 1);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}