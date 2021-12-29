export function up (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.timestamp('created_at', { precision: 3 })
      .defaultTo(knex.fn.now(3))
      .notNullable()
    table.timestamp('updated_at', { precision: 3 })
      .defaultTo(knex.fn.now(3))
      .notNullable()
  })
};

export function down (knex) {
  return knex.schema.dropTable('user')
};
