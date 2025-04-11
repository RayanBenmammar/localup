import type { HttpContext } from '@adonisjs/core/http'
import Listing from '#models/listing'

export default class ListingsController {
  public async index({}: HttpContext) {
    return Listing.query().preload('user').orderBy('createdAt', 'desc')
  }
}
