exports.up = function (knex) {
  return knex.schema.createTable("members", (tbl) => {
    tbl.increments("id");
    tbl.string("fullname", 255).notNullable();
    tbl.string("country", 255).notNullable();
    tbl.string("addr1", 255).notNullable();
    tbl.string("addr2", 255);
    tbl.string("city", 255).notNullable();
    tbl.string("zip", 255).notNullable();
    tbl.string("state", 255).notNullable();
    tbl.string("email", 255).unique();
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("members");
};
