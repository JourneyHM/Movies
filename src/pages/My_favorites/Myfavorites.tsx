import React, { useEffect, useState } from "react";
import { IMovieDetail } from "./types";
import { MovieCard } from "../../components/MovieCard";
import { getMovieDetails } from "../../services/movies/getMovieDetails";

const Myfavorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<IMovieDetail[]>([]);
  const favorites: string = localStorage.getItem('favorites') || "";

  const runGetFavorites = async () => {
    if(favorites.length){
      console.log('entr{e')

      const favoritesArray = JSON.parse(favorites);
      const newShow = await  Promise.all(
        favoritesArray.map(async (favoriteId: string) => {
          console.log(favoriteId, 'favoriteId')
          return getMovieDetails(favoriteId)
          .then((res) => {
            if(res){
              console.log(res, 'data')
              return res;
            }
          }).catch((err) => {
            console.log(err, 'ERROR');
          });        
        })
      );
      console.log(newShow, 'newShow')
      setShows(newShow);
      setLoading(false);
    }
  } 

  useEffect(() => {
    setLoading(true);
    runGetFavorites();
  }, []);

  return (
    <div>
        {!loading ? (
          <div>
            <h1 className="text-3xl text-gray-800 font-semibold my-6 mx-10">MY FAVORITES</h1>
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
                  <div>Error fetching movies...</div>
                )}
              </div>
            ): (
              <p className=" text-2xl font-bold mx-10">Oops... it seems this is empty. Explore more movies and add them to your favorites!</p>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
    </div>  
  );
}

export default Myfavorites;
