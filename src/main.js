import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faBasketShopping, faCheck, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from './composables/socket.io';
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";
import './style.css'
import '@/assets/animations.css'
import App from './App.vue'

const pinia = createPinia()

library.add(faUser, faBasketShopping, faCheck, faMinus, faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.use(Toast)
.use(router)
.mount('#app')

const socket = useSocket()
socket.init()
