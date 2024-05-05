import React, {useEffect, useState} from "react";
import { MovieCard } from "../../components/MovieCard";
import { getTopRatedMovies } from "../../services/movies/getTopRatedMovies";
import { ITopRatedMovies } from "./types";
import classNames from "classnames";
import './Toprated.css';

const Toprated: React.FC = () => {
  const [movies, setMovies] = useState<ITopRatedMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const titleClass = classNames({
    'title': true,
  })
  const pageClass = classNames({
    'page-str': true,
  })

  const getTopRated = async () => {
    await getTopRatedMovies()
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
    getTopRated();
  }, []);
  return (
    <div>
      <h1 className={titleClass}>TOP RATED</h1>
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

export default Toprated;
