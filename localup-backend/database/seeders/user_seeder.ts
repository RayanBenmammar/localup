import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { fakerEN_US as faker, fakerFR } from '@faker-js/faker'
import { DateTime } from 'luxon'
import Listing from '#models/listing'
import { ListingCategory } from '../../app/enums/listings_category.js'

export default class extends BaseSeeder {
  async run() {
    const categories = Object.values(ListingCategory)
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      })

      const listingCount = faker.number.int({ min: 1, max: 10 })

      for (let j = 0; j < listingCount; j++) {
        const category = faker.helpers.arrayElement(categories)

        let title: string
        let description: string

        switch (category) {
          case ListingCategory.ELECTRONICS:
            title = fakerFR.commerce.productName()
            description = `À vendre : ${title} en excellent état, très peu utilisé.`
            break
          case ListingCategory.FURNITURE:
            title = `${fakerFR.word.adjective()} table`
            description = `Table ${title}, idéale pour le salon ou le bureau. Quelques traces d'usure.`
            break
          case ListingCategory.CLOTHING:
            title = `${fakerFR.color.human()} veste`
            description = `Veste ${title}, très peu portée, comme neuve.`
            break
          case ListingCategory.BOOKS:
            title = fakerFR.lorem.words(2)
            description = `Livre "${title}" à vendre. Parfait pour les amateurs de lecture.`
            break
          case ListingCategory.TOYS:
            title = `Peluche ${fakerFR.animal.type()}`
            description = `${title}, propre et en bon état. Maison non-fumeur.`
            break
          default:
            title = 'Objet divers'
            description = 'Description non disponible.'
        }

        await Listing.create({
          title,
          description,
          price: Number.parseFloat(faker.commerce.price({ min: 10, max: 500 })),
          category,
          userId: user.id,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        })
      }
    }
  }
}
