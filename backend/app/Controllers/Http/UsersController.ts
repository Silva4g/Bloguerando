import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async show({ params }: HttpContextContract) {
    const user = await User.find(params.userId)

    return user
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const signUp = request.only(['name', 'email', 'password'])

    if (!signUp.name && !signUp.email && !signUp.password) {
      return response.status(405).send({ message: 'Missing information' })
    }

    const verify = await User.query().where({ email: signUp.email }).first()

    if (verify) {
      return response.status(401).send({ message: 'Email already registered' })
    }

    const user = await User.create(signUp)

    const token = await auth.use('api').attempt(signUp.email, signUp.password)

    const tokenJson = token.toJSON()

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: tokenJson,
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const loginUser = request.only(['email', 'password'])
    try {
      await auth.attempt(loginUser.email, loginUser.password)

      return response.redirect('/')
    } catch (error) {
      return response.redirect('back')
    }
  }
}
