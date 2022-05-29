const movieDetail = require("./movies.mongo");
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const csv = require("csv-parser");

const getSearchedMovie = async (searchQuery) => {
  const queryWord = String(String(searchQuery.name).toLowerCase());

  let searchResults = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "..", "data", "movies_metadata.csv")
    )
      .pipe(csv())
      .on("data", function (row) {
        const title = String(row.original_title).toLowerCase();

        if (title.includes(queryWord)) {
          searchResults.push(row);
        }
      })
      .on("end", function () {
        console.log("end of searching");
        resolve(searchResults);
        // TODO: SAVE users data to another file
      });
  });
  //   searchMoviesPromise.then(() => {
  //     return searchResults;
  //   });
};
const getMovieComments = async (movie_id, user_id) => {
  try {
    return await movieDetail.find({ movie_id: String(movie_id) });
  } catch (err) {
    console.log(`Could not find movie reviews ${err}`);
  }
};

const postMovieComment = async (movie_id, user_id, user_review) => {
  const commentObj = {
    user_id,
    ...user_review.comments,
  };

  try {
    await movieDetail.updateOne(
      {
        movie_id: String(movie_id),
      },
      {
        title: user_review.title,
        $push: {
          comments: commentObj,
        },
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not save user data ${err}`);
  }

  return commentObj;
};
module.exports = {
  getSearchedMovie,
  getMovieComments,
  postMovieComment,
};
