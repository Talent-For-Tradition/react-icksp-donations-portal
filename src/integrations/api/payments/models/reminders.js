const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateById,
  remove
};

function add(reminder) {
  return db("reminders").insert(reminder, "id");
}

function remove(id) {
  return db("reminders")
    .del()
    .where({ id });
}

function findById(id) {
  return db("reminders")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("reminders")
    .where(filter);
}

function find() {
  return db("reminders") // returns all reminders
}

function updateById(updates, id) {
  return db("reminders")
    .update(updates)
    .where({ id });
}