import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'app/Models/User'

export default class UsersController {
  public async show({ request }: HttpContextContract) {
    const user = await User.all()

    return user
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'profilepic'])

    const user = await User.create(data)

    return user
  }
}
