import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ListingsController = () => import('#controllers/listings_controller')
router.group(() => {
  router.get('/', [ListingsController, 'index'])
})

const AuthController = () => import('#controllers/auth_controller')
router.group(() => {
  router.get('/me', [AuthController, 'me']).use(middleware.auth())
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
})
