import type { HttpContext } from '@adonisjs/core/http'
import Listing from '#models/listing'
import { listingValidator } from '#validators/listing'
import { ListingCategory } from '../enums/listings_category.js'

export default class ListingsController {
  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const category = request.input('category')
    const search = request.input('search')

    const query = Listing.query().preload('user').orderBy('updatedAt', 'desc')
    if (category && !Object.values(ListingCategory).includes(category as ListingCategory)) {
      return { message: 'Category is not valid.' }
    }

    if (category) {
      query.where('category', category)
    }
    if (search) {
      query.where((subQuery) => {
        subQuery.whereLike('title', `%${search}%`).orWhereLike('description', `%${search}%`)
      })
    }
    return query.paginate(page, limit)
  }

  public async show({ params }: HttpContext) {
    return await Listing.query().where('id', params.id).preload('user').firstOrFail()
  }

  public async userListings({ params }: HttpContext) {
    return Listing.query().where('userId', params.id).preload('user').orderBy('updatedAt', 'desc')
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
