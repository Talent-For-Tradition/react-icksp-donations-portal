const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateById,
  remove
};

function add(donation) {
  const o = Object(donation);
  if (o.id === null) {
    delete o["id"]
    return db("donations").insert(o, "id");
  }
  console.log("donation with id " + o.id + "exists... todo: update")
}

function remove(id) {
  return db("donations")
    .del()
    .where({ id });
}

function findById(id) {
  return db("donations")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("donations")
    .where(filter);
}

function find() {
  return db("donations") // returns all donations
}

function updateById(updates, id) {
  return db("donations")
    .update(updates)
    .where({ id });
}