import type { HttpContext } from '@adonisjs/core/http'
import Listing from '#models/listing'
import { listingValidator } from '#validators/listing'

export default class ListingsController {
  public async index({}: HttpContext) {
    return Listing.query().preload('user').orderBy('updatedAt', 'desc')
  }

  public async show({ params }: HttpContext) {
    const listing = await Listing.query().where('id', params.id).preload('user').firstOrFail()
    return listing
  }

  public async userListings({ params }: HttpContext) {
    const listings = await Listing.query()
      .where('userId', params.id)
      .preload('user')
      .orderBy('updatedAt', 'desc')
    return listings
  }

  public async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(listingValidator)
    // @ts-ignore
    const userId = auth.user!.id
    const listing = await Listing.create({
      ...payload,
      userId,
    })
    return response.created('Listing created successfully: ' + JSON.stringify(listing))
  }

  public async update({ params, response, auth, request }: HttpContext) {
    const listing = await Listing.query().where('id', params.id).firstOrFail()
    // @ts-ignore
    if (listing.userId !== auth.user!.id) {
      return response.unauthorized('Unauthorized')
    }

    const data = await request.validateUsing(listingValidator)

    listing.merge(data)
    await listing.save()

    return response.ok('Listing updated successfully: ' + JSON.stringify(listing))
  }

  public async destroy({ params, response, auth }: HttpContext) {
    const listing = await Listing.findOrFail(params.id)
    // @ts-ignore
    if (listing.userId !== auth.user.id) {
      return response.unauthorized('Unauthorized')
    }
    await listing.delete()
    return response.ok('Listing deleted successfully')
  }
}
