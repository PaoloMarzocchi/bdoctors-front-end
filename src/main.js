import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import router from './router.js';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

library.add(faStar, faStarHalfAlt, fasStar, farStar);

createApp(App).component('font-awesome-icon', FontAwesomeIcon,).use(router).mount('#app')
