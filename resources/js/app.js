require('./bootstrap');
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

//window.Vue = require('vue');

const VueProgressBarOptions = {
    color: '#50d38a',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};
Vue.use(VueProgressBar, VueProgressBarOptions);


Vue.component('customer-component', require('./components/CustomerComponent.vue'));
Vue.component('pagination', require('./components/partial/paginationComponent.vue'));

const app = new Vue({
    el: '#app'
});
