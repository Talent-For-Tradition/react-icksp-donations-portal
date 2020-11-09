exports.up = function (knex) {
  return knex.schema.createTable("reminders", (tbl) => {
    tbl.increments("id");
    tbl.integer("member_id").unsigned();
    tbl.foreign("member_id").references("members.id");

    tbl.string("mobile").notNullable();;
    tbl.unique("mobile");

    tbl.string("hour", 255).notNullable();

    tbl.string("timezone", 255).notNullable();
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("reminders");
};
