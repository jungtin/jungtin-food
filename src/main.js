import { createApp } from 'vue'
import router from '@/scripts/router-config'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);
app.use(router);
app.mount('#app');
