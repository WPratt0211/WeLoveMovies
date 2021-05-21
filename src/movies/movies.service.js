const knex = require("../db/connection");


function listAll() {
  return knex("movies")
    .select("*");
}


function listShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*")
    .where({ "is_showing": true})
    .groupBy("movies.movie_id");
}


function read(movie_id) {
  return knex("movies")
    .select("*")
    .where({ movie_id });
}

module.exports = {
  listAll,
  listShowing,
  read,
};