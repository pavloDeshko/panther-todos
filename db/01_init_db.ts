import {Knex} from 'knex'

export const up = (k:Knex)=>{
  return k.schema.createTable('todos', t=>{
    t.uuid('todoId').primary()
    t.uuid('userId').index()
    t.string('text').notNullable()
    t.boolean('done').notNullable()
    t.integer('priority')
    t.timestamp('timeStamp').notNullable()
  })
}

export const down = (knex:Knex)=>{
  return knex.schema.dropTable('todos')
}