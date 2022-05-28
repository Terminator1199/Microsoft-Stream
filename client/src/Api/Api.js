export const getRecommendationData = async (api) => {
  const recRes = await fetch(api);
  const recData = await recRes.json();

  await recData.map(async (movie) => {
    const imgRes = await fetch(
      `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=0f4d4c6bde3c63f5c0b597cadf14745b&language=en-US&external_source=imdb_id`
    );
    const imgResData = await imgRes.json();

    try {
      movie["poster_path"] = imgResData.movie_results[0].poster_path;
    } catch (err) {
      console.log(err);
    }
  });

  return recData;
};

export const getImageData = async (id) => {
  const imgRes = await fetch(
    `https://api.themoviedb.org/3/find/${id}?api_key=0f4d4c6bde3c63f5c0b597cadf14745b&language=en-US&external_source=imdb_id`
  );
  return await imgRes.json();
};
