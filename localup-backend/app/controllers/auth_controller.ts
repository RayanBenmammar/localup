import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

export default class AuthController {
  public async me({ auth }: HttpContext) {
    return auth.user
  }

  public async register({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user)
    return response.created(user)
  }

  public async login({ auth, response, request }: HttpContext) {
    try {
      const { email, password } = request.all()
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.ok(user)
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok('Logged out successfully')
  }
}
