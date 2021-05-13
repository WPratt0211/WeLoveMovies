const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.use("/:movie_id/theaters", controller.movieExists, theatersRouter);
router.use("/:movie_id/reviews", controller.movieExists, reviewsRouter);

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movie_id").get(controller.read).all(methodNotAllowed);

module.exports = router;