const service = require("./theaters.service.js");



const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function theaterExists(req, res, next) {
  const { theater_id } = req.params;
  const foundTheater = await service.read(theater_id);

  if (foundTheater.length > 0) {
    res.locals.theater = foundTheater[0];
    next();
  } else {
    next({status: 404, message: `No theater found with id: ${theater_id}`});
  }
}


async function list(req, res) {
  let theaters = req.params.movie_id ? (await service.listForMovie(req.params.movie_id)) : (await service.listAll());
  res.json({ data: theaters });
}


async function read(req, res) {
  res.json({ data: res.locals.theater });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [theaterExists, asyncErrorBoundary(read)],
};