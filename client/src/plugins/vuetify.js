import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    theme: {
        primary: '#1B2021',
        secondary: '#30343F',
        accent: '#89023E',
        accent2: '#EA638C',
        accent3: '#FFD9DA',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#4caf50'
    }
});
