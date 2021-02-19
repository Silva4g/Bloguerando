import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Post from './Post'

export default class User extends BaseModel {
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({
    prepare: (value: string) => Encryption.encrypt(value),
  })
  public password: string

  @column()
  public isActive: boolean

  @column()
  public profilepic: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>
}
