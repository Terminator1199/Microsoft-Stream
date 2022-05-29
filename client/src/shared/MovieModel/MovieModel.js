import React, { useState, useEffect, useRef } from "react";
import "./MovieModel.css";
import { useSelector, useDispatch } from "react-redux";
import { modelActions } from "../../store/movieModel-slice";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Rating } from "@mui/material";
// import MovieRating from "../MovieRating";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MovieModel() {
  const [comments, setComments] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  const [rating, setRating] = useState(0);

  const movieData = useSelector((state) => {
    return {
      show_model: state.showModel.show_model,
      model_data: state.showModel.movieData,
    };
  });
  const userInfo = useSelector((state) => state.userInfo);

  const { backdrop_path, poster_path, title } = movieData.model_data;

  const dispatch = useDispatch();
  const closeModelHandler = () => {
    dispatch(modelActions.hideModelState());
  };

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedRes = await fetch(
        `http://localhost:8000/api/movie/comments/${movieData.model_data.imdbId}/${userInfo.userId}`
      );
      const fetchedResData = await fetchedRes.json();
      setComments(fetchedResData.movieReviews[0].comments);
    };
    fetchComments();
  }, [movieData, refreshData]);

  const commentInputRef = useRef();

  const SubmitCommentHandler = () => {
    const postComment = fetch(
      `http://localhost:8000/api/movie/comments/${movieData.model_data.imdbId}/${userInfo.userId}`,
      {
        method: "POST",
        body: JSON.stringify({
          movie_id: movieData.model_data.imdbId,
          title: movieData.model_data.title,
          comments: {
            user_id: userInfo.userId,
            user_name: userInfo.name,
            review: commentInputRef.current.value,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(setRefreshData(true));
    postComment();
  };

  return (
    <div className="movie__model-backdrop flex__center">
      <div className="movie__model-wrapper" onClick={closeModelHandler}></div>
      <div className="movie__model-container">
        <div className="movie__model-left">
          <div className=" movie__model_overlay"></div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt=""
          />
          {/* <div className="movie__model_rating">
            <MovieRating />
          </div> */}
        </div>
        <div className="movie__model-right">
          <h1 className="movie__model-header">{title} movie reviews :</h1>
          <div className="movie__model-comments">
            <div className="movie__model-comment-container">
              {comments.map((review) => {
                return (
                  <div className="movie__model-comment">
                    <h2 className="movie__model-comment-user">
                      {" "}
                      {review.user_name}
                    </h2>
                    <p>{review.review}</p>

                    {/* {user_id === review.user_id && (
                      <div className="model__comment-delete">
                        <DeleteIcon />
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>
            <div className="movie__model-add-comment">
              <InputGroup className="movie__model-comment-input">
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  placeholder="add your comment"
                  ref={commentInputRef}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={SubmitCommentHandler}
                >
                  Add Review
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>

        {/* <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" /> */}
      </div>
    </div>
  );
}
