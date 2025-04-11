import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { fakerEN_US as faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const users = []

    for (let i = 0; i < 10; i++) {
      users.push({
        id: i,
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.lorem.words(3).toLocaleLowerCase().replace(/ /g, '-'),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      })
    }

    await User.createMany(users)
  }
}
