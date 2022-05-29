const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
    required: true,
  },
});

const movieInfoSchema = new mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  comments: [userReviewSchema],
});

module.exports = mongoose.model("movieDetail", movieInfoSchema);