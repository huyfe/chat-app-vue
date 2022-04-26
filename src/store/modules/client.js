import MessengerStatus from '@/const/MessengerStatus';

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
    getProfile({ commit }) {
        const profile = {
            id: 'me123',
            avatar: require('@/assets/images/user.png'),
            firstName: 'Mehmet',
            lastName: 'Revnaki',
            status: MessengerStatus.WORKING,
        }
        commit('setProfile', profile);
    }
}

// mutations
const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}