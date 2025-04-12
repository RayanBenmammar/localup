import vine from '@vinejs/vine'

export const listingValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(100),
    description: vine.string().trim().minLength(10).maxLength(1000),
    price: vine.number().positive(),
    category: vine.string().trim().minLength(5).maxLength(100),
  })
)
