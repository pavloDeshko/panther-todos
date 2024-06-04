module.exports.up = (k)=>{
  return k.schema.createTable('todos', (t)=>{
    t.uuid('todoId').primary()
    t.uuid('userId').index()
    t.string('text').notNullable()
    t.boolean('done').notNullable()
    t.integer('priority')
    t.timestamp('created').notNullable().defaultTo(k.fn.now())
    t.timestamp('modified').notNullable().defaultTo(k.fn.now())
  })
}

module.exports.down = (knex)=>{
  return knex.schema.dropTable('todos')
}