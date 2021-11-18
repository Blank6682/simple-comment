import {createApp} from 'vue';
import App from './App.vue';
import './style.css'
import axios from 'axios';

createApp(App).use(axios).mount(("#app"))
