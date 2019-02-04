import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import FormAlert from './components/Shared/FormAlert';

// Registering a global component for global use
Vue.component('form-alert', FormAlert);
// Setting up the vue middleware to use
Vue.use(VueApollo);

/**
 * Setting up the new Apollo Client with options
 * @param { uri } String allowing us to connect the frontend to the backend (Where to make requests)
 */
export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    // include the auth token with requests made to the backend
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        // Check to see if we have a token in local storage and if not we will set one to prevent errors
        if (!localStorage.token) {
            localStorage.setItem('token', '');
        }
        // Operation adds the token to the request that we make to the backend as an authorization header
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        });
    },
    onError: ({ graphQLErrors, networkError }) => {
        if (networkError) {
            console.log('[networkError]', networkError);
        }
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                console.dir(err);
            }
        }
    }
});

// Creating the apollo provider to pass the default client to the vue apollo
const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

// Apollo Provider injects apollo into the vue templates in our application
new Vue({
    apolloProvider,
    router,
    store,
    render: h => h(App),
    created() {
        // Execute the query for getting the current user (Helpful for page refreshses)
        this.$store.dispatch('getCurrentUser');
    }
}).$mount('#app');
