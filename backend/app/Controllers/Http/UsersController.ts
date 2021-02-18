import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'app/Models/User'

export default class UsersController {
  public async show({ params }: HttpContextContract) {
    const user = await User.find(params.userId)

    return user
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'profilepic'])

    const user = await User.create(data)

    return user
  }

  public async login({ request, auth }) {
    const loginUser = request.only(['email', 'password'])
    await auth.attempt(loginUser)
  }
}
