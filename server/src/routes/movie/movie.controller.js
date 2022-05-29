const {
  getSearchedMovie,
  getMovieComments,
  postMovieComment,
} = require("../../models/movies/movies.model");

const httpSearchMovies = async (req, res) => {
  const searchedMovie = req.body;
  console.log(searchedMovie);

  const data = await getSearchedMovie(searchedMovie);

  res.status(200).json({
    message: "ok",
    movieResults: data.slice(0, 5),
  });
};
const httpGetComments = async (req, res) => {
  const movie_id = req.params.movie_id;
  const user_id = req.params.user_id;

  console.log(movie_id, user_id);

  const data = await getMovieComments(movie_id, user_id);

  res.status(200).json({
    message: "ok",
    movieReviews: data,
  });
};

const httpPostComment = async (req, res) => {
  const movie_id = req.params.movie_id;
  const user_id = req.params.user_id;
  const user_review = req.body;

  const user_resData = await postMovieComment(movie_id, user_id, user_review);

  res.status(200).json({
    message: "ok",
    posted_comment: user_resData,
  });
};
module.exports = {
  httpSearchMovies,
  httpGetComments,
  httpPostComment,
};
