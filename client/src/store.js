import Vue from 'vue';
import Vuex from 'vuex';

import { gql } from 'apollo-boost';
import { defaultClient as apolloClient } from './main';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: []
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        }
    },
    actions: {
        getPosts: ({ commit }) => {
            // Use the Apolloclient to fire off the getPosts query
            apolloClient
                .query({
                    query: gql`
                        query {
                            getPosts {
                                _id
                                title
                                imageUrl
                            }
                        }
                    `
                })
                .then(({ data }) => {
                    // Setting the data of the post into a const
                    const posts = data.getPosts;

                    // Commit allows use to pass data from the actions along to the mutation function
                    commit('setPosts', posts);
                })
                .catch(err => {
                    console.error('Error fetching posts: ', err);
                });
        }
    },
    getters: {
        posts: state => state.posts
    }
});
