const express = require("express");
const {
  httpSearchMovies,
  httpGetComments,
  httpPostComment,
} = require("./movie.controller");

const movieRouter = express.Router();

movieRouter.post("/search", httpSearchMovies);
movieRouter.get("/comments/:movie_id/:user_id", httpGetComments);
movieRouter.post("/comments/:movie_id/:user_id", httpPostComment);
module.exports = movieRouter;
