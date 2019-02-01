import Vue from 'vue';
import Vuex from 'vuex';

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';
import { GET_POSTS } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        loading: false
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload;
        }
    },
    actions: {
        getPosts: ({ commit }) => {
            commit('setLoading', true);
            // Use the Apolloclient to fire off the getPosts query
            apolloClient
                .query({
                    query: GET_POSTS
                })
                .then(({ data }) => {
                    // Setting the data of the post into a const
                    const posts = data.getPosts;
                    // Commit allows use to pass data from the actions along to the mutation function
                    commit('setPosts', posts);
                    // Stop the loading
                    commit('setLoading', false);
                })
                .catch(err => {
                    commit('setLoading', false);
                    console.error('Error fetching posts: ', err);
                });
        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading
    }
});
