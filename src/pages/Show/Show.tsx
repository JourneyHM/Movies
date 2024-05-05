import React, { useEffect, useState } from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import { getMovieDetails } from '../../services/movies/getMovieDetails';
import { getMovieRecommendations } from '../../services/movies/getMovieRecommendations';
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from '../../services/movies/types';
import {Group, Time, Calendar, Star, Graph} from '../../assets';
import { Pill } from '../../components/Pill';
import classNames from 'classnames';
import './Show.css';

const Show: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");
    
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [details, setDetails] = useState<IMovieResponse>();
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const [errorDetails, setErrorDetails] = useState<boolean>(false);

    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(false);
    const [errorRecommendations, setErrorRecommendations] = useState<boolean>(false);

    const statsClass = classNames({
        'stats-str': true,
    })
    const buttonAddClass = classNames({
        'button-add-favorites': true,
    })
    const buttonRemoveClass = classNames({
        'button-remove-favorites': true,
    })
    const buttonBackClass = classNames({
        'button-go-back': true,
    })
    const carruselClass = classNames({
        'carrusel': true,
    })
   
    const goBack = () => {
        navigate(-1);
    };

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const getDetails = async () => {
        await getMovieDetails(id)
        .then((res) => {
            setDetails(res);
        }) 
        .catch((err) => {
          setErrorDetails(true);
        });
        setLoadingDetails(false);
    };

    const getRecommendations = async () => {
        await getMovieRecommendations(id)
        .then((res) => {
            setRecommendations(res.data.results);
        }) 
        .catch((err) => {
          setErrorRecommendations(true);
        });
        setLoadingRecommendations(false);
    };

    useEffect(() => {
        const favs = localStorage.getItem('favorites') || '';
        setFavorites(favs);
        if( favs.includes(String(id))) {
            setIsFavorite(true);
        }
    }, []);
    
    useEffect(() => { 
        setLoadingDetails(true);
        setLoadingRecommendations(true);
        getDetails();
        getRecommendations(); 
    }, [id])

    return (
        <div>
            <div className='flex'>
                {errorDetails && <div>Error...</div>}
                <div className='flex-none w-1/4 h-fit overflow-hidden shadow-xl rounded-lg mx-3 my-3'>{details?.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`} alt={details?.title} /> }</div>
                <div className='shrink flex-col-5 w-3/4 justify-between space-y-10 mr-5'>
                    <div className='text-5xl text-white font-semibold mx-4 mt-16'>{location.state.title}</div>
                    <div className='flex h-0'>
                        <div className={statsClass}>
                            <div className='flex h-6'>
                                <img src={Group} alt='people' className='filter brightness-0 invert'></img>
                                <div className='text-white mx-1'>{details?.adult === true && '18+'}{details?.adult === false && '18-'}</div>
                            </div>
                        </div>
                        <div className={statsClass}>
                            <div className='flex h-6'>
                                <img src={Time} alt='time' className='filter brightness-0 invert'></img>
                                <div className='text-md text-white font-medium'>{details?.runtime} min.</div>
                            </div>
                        </div>
                        <div className={statsClass}>
                            <div className='flex h-6'>
                                <img src={Calendar} alt='calendar' className='filter brightness-0 invert'></img>
                                <div className='text-white mx-1'>{details?.release_date}</div>
                            </div>
                        </div>
                        <div className={statsClass}>
                            <div className='flex h-6'>
                                <img src={Star} alt='star' className='filter brightness-0 invert'></img>
                                <div className='text-md text-white font-medium'>{details?.vote_average}</div>
                            </div>
                        </div>
                        <div className={statsClass}>
                            <div className='flex h-6'>
                                <img src={Graph} alt='graph' className='filter brightness-0 invert'></img>
                                <div className='text-md text-white font-medium'>{details?.vote_count}</div>
                            </div>
                        </div>
                    </div>
                    <div className='text-md text-white font-light mx-4'>
                        "{details?.tagline}"
                        <br></br>
                        {details?.overview}
                    </div>
                    <div className='flex w-auto'>
                        <div className='grid'>
                            <div className='text-lg text-white font-semibold h-5 mx-4'>Genres</div>
                            <div className='flex space-x-2 mx-4'>
                                {details?.genres && details?.genres.map((genre) => (
                                <Pill title={genre.name}color={details?.vote_average > 6 ? 'green' :details?.vote_average > 5 && details?.vote_average < 6 ? 'yellow' : 'red'}></Pill>))}
                            </div>
                        </div>
                        <div className='grid mx-20'>
                            <div className='text-lg text-white font-semibold'>Favorite</div>
                            {isFavorite ? (
                                <div>
                                     <button className={buttonRemoveClass} onClick={removeFavorite}>♥︎ Remove from favorites</button>
                                </div>
                            ) : (
                                <div>
                                    <button className={buttonAddClass} onClick={addFavorite}>♥︎ Add to favorites</button>
                                   
                                </div>
                            )}
                        </div>
                    </div>
                    <button className={buttonBackClass}onClick={goBack}>⏎ Ir atrás</button>
                </div>
            </div>
            <div className='text-4xl text-white font-bold mx-12 my-5'>RECOMMENDATIONS</div>
            {loadingRecommendations && <div>Loading...</div>}
            {errorRecommendations && <div>Error...</div>}
            <div className={carruselClass}>
                {recommendations?.length > 0 && recommendations.map((movie) => (
                    <div><MovieCard
                    key={movie.id} 
                    title={movie.title}
                    genreId={movie.genre_ids?.length > 0 && movie.genre_ids[0]} 
                    movieId={movie.id} 
                    voteAverage={movie.vote_average} 
                    posterPath={movie.poster_path}>
                    </MovieCard></div>
                ))}
            </div>
            
        </div>
    );
};

export default Show;