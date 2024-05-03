import React, {useEffect, useState} from "react";
import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";
import { getTopRatedMovies } from "../../services/movies/getTopRatedMovies";

const Toprated = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

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
      <h1 className="text-3xl text-gray-800 font-semibold my-6 mx-7">TOP RATED</h1>
      {loading && <div>Loading...</div>}
      {errorMovies && <div>Error...</div>}
      <div className='grid grid-cols-5 mx-5'>
      {movies?.length > 0 && 
        movies.map((movie) => (
          <div className=""><MovieCard
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