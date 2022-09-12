import { library } from '@fortawesome/fontawesome-svg-core'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faEllipsisV,
  faCheckCircle,
  faExclamation,
  faTrashCan,
  faCircleExclamation,
  faPaw
} from '@fortawesome/free-solid-svg-icons'
import { BrowserTracing } from '@sentry/tracing'
import * as Sentry from '@sentry/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

const pinia = createPinia()

library.add(
  faStackOverflow,
  faSquare,
  faSquareCheck,
  faSearch,
  faEllipsisV,
  faCheckCircle,
  faExclamation,
  faTrashCan,
  faCircleExclamation,
  faPaw,
)

const app = createApp(App)


Sentry.init({
  app,
  dsn: 'https://5c3a8e528ba34a409de120a8fe6cdf3e@o1406124.ingest.sentry.io/6739572',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', /./, /dog.ceo./, /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
})

app.use(router).use(pinia)

app.mount('#app')
