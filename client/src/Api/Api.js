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

// export async function trailer_url(title) {
//   const videoRes = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD1usMS7TpTDqP9apsERdvopjOSTeejpaI&type=video&q=${title}`
//   );
//   return await videoRes.json();
//   // videoData.json();

//   // const videoUrl = `https://www.youtube.com/embed/${videoData.items[0].id.videoId}`;
//   // console.log.apply(videoUrl);
//   // return videoUrl;
// }
//  trailer_url() export;
