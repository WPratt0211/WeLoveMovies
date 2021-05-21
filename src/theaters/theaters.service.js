const knex = require("../db/connection");

function listAll() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*","mt.*", "m.*")
    .then(data => {
      
      let resultsObj = {};
      data.forEach(row => {
        if (resultsObj[row.theater_id]) {
          if (row.movie_id) {
            const movie = {
              rating: row.rating,
              runtime_in_minutes: row.runtime_in_minutes,
              title: row.title,
              is_showing: row.is_showing
            }
            resultsObj[row.theater_id].movies.push(movie);
          }
        } else {
          resultsObj[row.theater_id] = {
            address_line_1: row.address_line_1,
            address_line_2: row.address_line_2,
            city: row.city,
            name: row.name,
            state: row.state,
            zip: row.zip,
            movies: []
          }

          if (row.movie_id) {
            const movie = {
              rating: row.rating,
              runtime_in_minutes: row.runtime_in_minutes,
              title: row.title,
              is_showing: row.is_showing
            }
            resultsObj[row.theater_id].movies.push(movie);
          }
        }
      });

      
      const resultsArr = Object.values(resultsObj);
      return resultsArr;
    })
}

function listForMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ movie_id });
}

function read(theater_id) {
  return knex("theaters")
    .select("*")
    .where({ theater_id });
}

module.exports = {
  listAll,
  listForMovie,
  read,
};