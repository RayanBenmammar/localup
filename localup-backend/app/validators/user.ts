import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8).confirmed(),
    name: vine.string().maxLength(20),
  })
)
export const deleteUserValidator = vine.compile(
  vine.object({
    id: vine.string().exists({ table: 'users', column: 'id' }),
    email: vine.string().email(),
    password: vine.string().minLength(8).confirmed(),
  })
)
