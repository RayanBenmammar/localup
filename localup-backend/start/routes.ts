import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
router.group(() => {
  router.get('/me', [AuthController, 'me']).use(middleware.auth())
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
})

const ListingsController = () => import('#controllers/listings_controller')
router.get('/listings', [ListingsController, 'index'])
router.get('/listings/:id', [ListingsController, 'show'])
router.get('/user/:id/listings', [ListingsController, 'userListings'])

router
  .group(() => {
    router.post('/listings', [ListingsController, 'store'])
    router.put('/listings/:id', [ListingsController, 'update'])
    router.delete('/listings/:id', [ListingsController, 'destroy'])
  })
  .use(middleware.auth())
