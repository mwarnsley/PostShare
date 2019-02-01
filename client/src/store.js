import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { GET_POSTS, SIGNIN_USER } from './queries';
import { SET_LOADING, SET_POSTS } from './constants';

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
            commit(SET_LOADING, true);
            // Use the Apolloclient to fire off the getPosts query
            apolloClient
                .query({
                    query: GET_POSTS
                })
                .then(({ data }) => {
                    // Setting the data of the post into a const
                    const posts = data.getPosts;
                    // Commit allows use to pass data from the actions along to the mutation function
                    commit(SET_POSTS, posts);
                    // Stop the loading
                    commit(SET_LOADING, false);
                })
                .catch(err => {
                    commit(SET_LOADING, false);
                    console.error('Error fetching posts: ', err);
                });
        },
        signinUser: ({ commit }, payload) => {
            apolloClient
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(({ data }) => {
                    const { signinUser } = data;
                    // Setting the users token into local storage
                    localStorage.setItem('token', signinUser.token);
                })
                .catch(err => {
                    console.error('Error signing in user: ', err);
                });
        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading
    }
});
