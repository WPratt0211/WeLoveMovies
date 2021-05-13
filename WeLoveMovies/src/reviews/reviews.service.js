const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})

function listSpecific(movie_id) {
  return knex("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie_id })
    .then(data => {
      return data.map(row => addCritic(row));
    })
}

function listAll() {
  return knex("reviews as r")
    .select("r.*")
}

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id });
}

function destroy(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .del();
}

function update(updatedReview, review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*")
    .then(unneeded => {
      return knex("reviews")
        .select("*")
        .where({review_id})
        .join("critics as c", "c.critic_id", "reviews.critic_id")
        .select("reviews.*", "c.*")
        .then(data => addCritic(data[0]))
    })
  }

module.exports = {
  listAll,
  listSpecific,
  read,
  destroy,
  update,
};