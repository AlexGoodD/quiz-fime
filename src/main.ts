import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// Font Awesome core + íconos sólidos completos
import { library } from '@fortawesome/fontawesome-svg-core'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Agrega todos los íconos sólidos al `library`
Object.keys(solidIcons)
    .filter(key => key.startsWith('fa'))
    .forEach(key => library.add(solidIcons[key]))

// Crea y monta la app
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router).mount('#app')