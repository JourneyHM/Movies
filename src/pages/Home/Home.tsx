import React, {useEffect, useState} from "react";
import { MovieCard } from "../../components/MovieCard";
import { movies } from "../../constants/moviesMock";
import { getPopularMovies } from "../../services/movies/getPopularMovies";
import { getTopRatedMovies } from "../../services/movies/getTopRatedMovies";
import { getNowPlayingMovies } from "../../services/movies/getNowPlayingMovies";

const Home = () => {
  const [popmovies, setPopularMovies] = useState<any[]>([]);
  const [loadingpop, setLoadingPop] = useState<boolean>(false);
  const [poperrorMovies, setPopErrorMovies] = useState<boolean>(false);

  const [topmovies, setTopMovies] = useState<any[]>([]);
  const [loadingtop, setLoadingTop] = useState<boolean>(false);
  const [toperrorMovies, setTopErrorMovies] = useState<boolean>(false);

  const [nowmovies, setNowMovies] = useState<any[]>([]);
  const [loadingnow, setLoadingNow] = useState<boolean>(false);
  const [nowerrorMovies, setNowErrorMovies] = useState<boolean>(false);

  const getPopular = async () => {
    await getPopularMovies()
    .then((res) => {
      if (res && res.data) {

        setPopularMovies(res.data.results);
      }
    }) 
    .catch((err) => {
      setPopErrorMovies(true);
    });
    setLoadingPop(false);
  };

  useEffect(() => {
    setLoadingPop(true);
    getPopular();
  }, []);

  const getTopRated = async () => {
    await getTopRatedMovies()
    .then((res) => {
      if (res && res.data) {

        setTopMovies(res.data.results);
      }
    }) 
    .catch((err) => {
      setTopErrorMovies(true);
    });
    setLoadingTop(false);
  };

  useEffect(() => {
    setLoadingTop(true);
    getTopRated();
  }, []);

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
    .then((res) => {
      if (res && res.data) {

        setNowMovies(res.data.results);
      }
    }) 
    .catch((err) => {
      setNowErrorMovies(true);
    });
    setLoadingNow(false);
  };

  useEffect(() => {
    setLoadingPop(true);
    getNowPlaying();
  }, []);

  return (
    <div className="grid grid-cols-1 mx-1">
      <h1 className="text-3xl text-gray-800 font-semibold my-6 mx-10">POPULAR</h1>
      {loadingpop && <div>Loading...</div>}
      {poperrorMovies && <div>Error...</div>}
        <div className='overflow-x-scroll flex -space-x-5 hide-scrollbar'>
        {popmovies?.length > 0 && 
        popmovies.map((movie) => (
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
        <br></br>
        <h1 className="text-3xl text-gray-800 font-semibold my-6 mx-10">TOP RATED</h1>
        {loadingtop && <div>Loading...</div>}
      {toperrorMovies && <div>Error...</div>}
        <div className='overflow-x-scroll flex -space-x-5 hide-scrollbar'>
        {topmovies?.length > 0 && 
        topmovies.map((movie) => (
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
        <br></br>
        <h1 className="text-3xl text-gray-800 font-semibold my-6 mx-10">NOW PLAYING</h1>
        {loadingnow && <div>Loading...</div>}
      {nowerrorMovies && <div>Error...</div>}
        <div className='overflow-x-scroll flex -space-x-5 hide-scrollbar'>
        {nowmovies?.length > 0 && 
        nowmovies.map((movie) => (
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

export default Home;
