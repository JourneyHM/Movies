import React, {useEffect, useState} from "react";
import { MovieCard } from "../../components/MovieCard";
import { getNowPlayingMovies } from "../../services/movies/getNowPlayingMovies";
import classNames from "classnames";
import './Nowplaying.css';

const Nowplaying: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const titleClass = classNames({
    'title': true,
  })
  const pageClass = classNames({
    'page-str': true,
  })

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
    .then((res) => {
      if (res && res.data) {
        console.log(res.data.results, "res");
        setMovies(res.data.results);
      }
    }) 
    .catch((err) => {
      setErrorMovies(true);
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getNowPlaying();
  }, []);
  return (
    <div>
      <h1 className={titleClass}>NOW PLAYING</h1>
      {loading && <div>Loading...</div>}
      {errorMovies && <div>Error...</div>}
      <div className={pageClass}>
      {movies?.length > 0 && 
        movies.map((movie) => (
          <div key={movie.id}><MovieCard
            key={movie.id}
            movieId={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            genreId={movie.genre_ids[0]}
            voteAverage={movie.vote_average}
          /></div>
        ))
      }
      </div>
    </div>
  );
}

export default Nowplaying;
