import React, { useEffect, useState } from "react";
import { IMovieDetail } from "./types";
import { MovieCard } from "../../components/MovieCard";
import { getMovieDetails } from "../../services/movies/getMovieDetails";
import classNames from "classnames";
import './Myfavorites.css';

const Myfavorites: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<IMovieDetail[]>([]);
  const favorites: string = localStorage.getItem('favorites') || "";

  const titleClass = classNames({
    'title': true,
  })
  const messageClass = classNames({
    'message': true,
  })

  const runGetFavorites = async () => {
    if(favorites.length){
      const favoritesArray = JSON.parse(favorites);
      const newShow = await  Promise.all(
        favoritesArray.map(async (favoriteId: string) => {
          return getMovieDetails(favoriteId)
          .then((res) => {
            if(res){
              return res;
            }
          }).catch((err) => {
          });        
        })
      );
      setShows(newShow);
      setLoading(false);
    }
  } 

  useEffect(() => {
    setLoading(true);
    runGetFavorites();
  }, []);

  return (
    <div className=" h-screen">
        {!loading ? (
          <div>
            <h1 className={titleClass}>MY FAVORITES</h1>
            {favorites && favorites.length > 0 ? (
              <div>
                {shows && shows.length > 0 ? (
                  <div>
                    {shows.map((show: IMovieDetail) => (
                      <MovieCard
                        key={show.id}
                        title={show.title}
                        genreId={show.genres[0].id}
                        movieId={show.id}
                        voteAverage={show.vote_average}
                        posterPath={show.poster_path} />
                    ))}
                  </div>
                ): (
                  <p className={messageClass}>Oops... it seems this is empty. Explore more movies and add them to your favorites!</p>
                )}
              </div>
            ): (
              <div className={messageClass}>Error fetching movies...</div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
    </div>  
  );
}

export default Myfavorites;
