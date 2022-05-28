import React from "react";
import "./App.css";

import { useSelector } from "react-redux";
import Landing from "./screens/Home/components/Landing/Landing";
import Home from "./screens/Home/Home";
import Navbar from "./shared/Navbar/Navbar";
import Signin from "./screens/Signin/Signin";
import MovieSearch from "./screens/MovieSearch/MovieSearch";
import SimilarMovies from "./screens/MovieSearch/SimilarMovies";
import { Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const loggedInstate = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <Navbar />
              {loggedInstate ? <Home /> : <Landing />}
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/search/:movie"
          element={
            <>
              <Navbar />
              <MovieSearch />
            </>
          }
        />
        <Route
          path="/similar-results/:movie"
          element={
            <>
              {" "}
              <Navbar />
              <SimilarMovies />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
