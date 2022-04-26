import { createStore, createLogger } from 'vuex';
import client from './modules/client'

export default createStore({
    modules: {
        client,
    },

})