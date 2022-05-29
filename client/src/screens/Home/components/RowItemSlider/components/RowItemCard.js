import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import loadImg from "../../../../../assets/Home/catalogue/download.jfif";
import { getImageData } from "../../../../../Api/Api";
import "./RowItemCard.css";
import { modelActions } from "../../../../../store/movieModel-slice";
import { useDispatch, useSelector } from "react-redux";
export default function RowItemCard({ id, name, data }) {
  const [imgSrc, setImgSrc] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchImg = async () => {
      const movieData = await getImageData(id);
      data.poster_path = movieData.movie_results[0].poster_path;
      data.backdrop_path = movieData.movie_results[0].backdrop_path;
      if (movieData.movie_results.length > 0) {
        setImgSrc(
          (prev) =>
            (prev = `https://image.tmdb.org/t/p/w500/${movieData.movie_results[0].poster_path}`)
        );
      }
    };

    fetchImg();
  }, [id, name]);
  const clickHandler = () => {
    dispatch(modelActions.setShowModelState());
    dispatch(modelActions.setModelMovieData(data));
    
  };
  const movieData = useSelector((state) => {
    return {
      show_model: state.showModel.show_model,
      model_data: state.showModel.movieData,
    };
  });
  return (
    <React.Fragment>
      {typeof imgSrc !== undefined ? (
        <div
          className="rowitemcard__container"
          onClick={clickHandler}
          // style={{
          //   display: `${typeof imgSrc === "undefined" ? "none" : "block"}`,
          // }}
        >
          <div className="rowitemcard__img">
            <LazyLoadImage
              effect="blur"
              src={imgSrc} 
              alt={name}
              width="250px"
              height="300px"
              placeholderSrc={loadImg}
            />
          </div>
          <div className="rowitemcard__overlay"></div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
