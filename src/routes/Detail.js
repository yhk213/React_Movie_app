import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    // console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} />
          <h2>Title : {movie.title} </h2>
          <h3>Year : {movie.year}</h3>
          <h3>Runtime : {movie.runtime} min</h3>
          <h3>Rating : {movie.rating} {JSON.stringify(movie.rating) >= 8.8 ? <span>✨</span> : null}</h3>
          <h3>Download count : {movie.download_count}</h3>
          <h3>Like count : {movie.like_count}</h3>
          <h3>Language : {movie.language}</h3>
          <p>{movie.description_full}</p>
          <ul>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
