import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { cpfDirective } from './directives/cpf'
import { digitsOnlyDirective } from './directives/digitsOnly'
import { loggerPlugin } from './plugins/logger/logger.plugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(loggerPlugin, {
  prefix: 'projeto-1',
})
app.directive('cpf', cpfDirective)
app.directive('digits-only', digitsOnlyDirective)

app.mount('#app')
