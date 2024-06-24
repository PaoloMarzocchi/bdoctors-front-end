import { createApp } from 'vue'
import './style.css'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import router from './router.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } '@fortawesome/free-solid-svg-icons';

library.add(faStar);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')

