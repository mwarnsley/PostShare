import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import { defaultClient as apolloClient } from './main';
import {
    ADD_POST,
    GET_CURRENT_USER,
    GET_POSTS,
    SIGNIN_USER,
    SIGNUP_USER
} from './queries';
import {
    CLEAR_ERROR,
    CLEAR_USER,
    SET_ERROR,
    SET_LOADING,
    SET_POSTS,
    SET_USER
} from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authError: null,
        error: null,
        loading: false,
        posts: [],
        user: null
    },
    mutations: {
        clearError: state => (state.error = null),
        clearUser: state => (state.user = null),
        setAuthError: (state, payload) => {
            state.authError = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload;
        },
        setError: (state, payload) => {
            state.error = payload;
        },
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        }
    },
    actions: {
        addPost: ({ commit }, payload) => {
            commit(SET_LOADING, true);
            console.log('The Payload: ', payload);
            apolloClient
                .mutate({
                    mutation: ADD_POST,
                    variables: payload
                })
                .then(({ data }) => {
                    console.log('The Data: ', data.addPost);
                })
                .catch(err => {
                    console.error('Add Post Error: ', err);
                });
        },
        getCurrentUser: ({ commit }) => {
            commit(SET_LOADING, true);
            apolloClient
                .query({
                    query: GET_CURRENT_USER
                })
                .then(({ data }) => {
                    commit(SET_LOADING, false);
                    // Grabbing the current user if there is one and setting it to state
                    const { getCurrentUser } = data;
                    commit(SET_USER, getCurrentUser);
                })
                .catch(err => {
                    commit(SET_LOADING, false);
                    commit(SET_ERROR, err.message);
                    console.error(err);
                });
        },
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
                    commit(SET_ERROR, err.message);
                    console.error('Error fetching posts: ', err);
                });
        },
        signinUser: ({ commit }, payload) => {
            // Clearing outt he error message
            commit(CLEAR_ERROR);
            // Set loading
            commit(SET_LOADING, true);
            apolloClient
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(({ data }) => {
                    commit(SET_LOADING, false);
                    // Setting the users token into local storage
                    localStorage.setItem('token', data.signinUser.token);
                    // Make sure the created method is run in main.js (we run getCurrentUser) refresh the current page
                    router.go();
                })
                .catch(err => {
                    commit(SET_LOADING, false);
                    commit(SET_ERROR, err.message);
                    console.error('Error signing in user: ', err);
                });
        },
        signupUser: ({ commit }, payload) => {
            // Clearing outt he error message
            commit(CLEAR_ERROR);
            // Set loading
            commit(SET_LOADING, true);
            apolloClient
                .mutate({
                    mutation: SIGNUP_USER,
                    variables: payload
                })
                .then(({ data }) => {
                    commit(SET_LOADING, false);
                    const { signupUser } = data;
                    // Setting the users token into local storage
                    localStorage.setItem('token', signupUser.token);
                    // Make sure the created method is run in main.js (we run getCurrentUser) refresh the current page
                    router.go();
                })
                .catch(err => {
                    commit(SET_LOADING, false);
                    commit(SET_ERROR, err.message);
                    console.error('Error signing in user: ', err);
                });
        },
        signoutUser: async ({ commit }) => {
            // Clear the user in state
            commit(CLEAR_USER);
            // Remove the token from localstorage
            localStorage.setItem('token', '');
            // End the Session for the user
            await apolloClient.resetStore();
            // Redirect to the home page - kicking the user out of the private routes
            router.push('/');
        }
    },
    getters: {
        authError: state => state.authError,
        error: state => state.error,
        loading: state => state.loading,
        posts: state => state.posts,
        user: state => state.user
    }
});
