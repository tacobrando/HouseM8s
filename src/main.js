import "vue-toastification/dist/index.css";
import './style.css'
import '@/assets/css/animations.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSocket } from './composables/socket.io';
import { 
  faUser, 
  faCheck, 
  faTrash,
  faHome,
  faBroom,
  faPlus,
  faCartShopping,
  faBars,
  faChevronDown,
  faChevronUp,
  faGear,
  faCircle,
  faXmark,
  faEllipsis,
  faRightFromBracket
  
} from '@fortawesome/free-solid-svg-icons';
import Toast from 'vue-toastification'
import App from './App.vue'

const pinia = createPinia()

library.add(
  faUser, 
  faCartShopping, 
  faCheck, 
  faTrash, 
  faHome,
  faBroom,
  faPlus,
  faBars,
  faChevronDown,
  faChevronUp,
  faGear,
  faCircle,
  faXmark,
  faEllipsis,
  faRightFromBracket
)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.use(Toast)
.use(router)
.mount('#app')

// const socket = useSocket()
// socket.init()
