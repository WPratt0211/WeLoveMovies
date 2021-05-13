if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const criticsRouter = require("./critics/critics.router");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theaterssRouter = require("./theaters/theaters.router");


const app = express();
app.use(express.json());


app.use(cors());


app.use("/critics", criticsRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theaterssRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;
