import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

// Setting up the vue middleware to use
Vue.use(VueApollo);

/**
 * Setting up the new Apollo Client with options
 * @param { uri } String allowing us to connect the frontend to the backend (Where to make requests)
 */
const defaultClient = new ApolloClient({
    uri: 'http://localhost:400/graphql'
});

// Creating the apollo provider to pass the default client to the vue apollo
const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

// Apollo Provider injects apollo into the vue templates in our application
new Vue({
    apolloProvider,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
