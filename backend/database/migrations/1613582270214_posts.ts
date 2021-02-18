import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamps(true)
      table.increments('id')
      table.integer('userId')
      table.string('title')
      table.string('subtitle')
      table.text('text')
    })
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
