const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateById,
  remove
};

function add(data) {
  console.log('add member to db')
  return db("members").insert(data, "id");
}

function remove(id) {
  return db("members")
    .del()
    .where({ id });
}

function findById(id) {
  return db("members")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("members")
    .where(filter);
}

function find() {
  return db("members") // returns all members
}

function updateById(updates, id) {
  return db("members")
    .update(updates)
    .where({ id });
}