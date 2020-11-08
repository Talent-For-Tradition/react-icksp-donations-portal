
exports.up = function(knex) {
  return knex.schema.createTable("donations", tbl => {
    tbl.increments("id");
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.integer("member_id").unsigned();
    tbl.foreign("member_id")
      .references("members.id")
    tbl.integer("amount")
      .notNullable();
    tbl.boolean("recurring").defaultTo(false);
    tbl.integer("day")
      .notNullable();
    tbl.integer("week")
      .notNullable();
    tbl.timestamp('firstdonation');
    tbl.timestamp('lastdonation');
  })
};

exports.down = function(knex) {
  knex.schema.dropTable("donations");
};
