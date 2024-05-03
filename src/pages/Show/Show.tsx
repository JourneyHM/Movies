import React, { useEffect, useState } from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import { getMovieDetails } from '../../services/movies/getMovieDetails';
import { getMovieRecommendations } from '../../services/movies/getMovieRecommendations';
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from '../../services/movies/types';
import {Group, Time, Calendar, Star, Graph} from '../../assets';
import { Pill } from '../../components/Pill';
import classNames from 'classnames';

const Show: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const ButtonClass = classNames({
        'text-white font-bold text-center p-2 border-2 rounded-lg w-fit h-fit': true,
        'bg-blue-700 hover:bg-blue-900 border-blue-300': !isFavorite,
        'bg-rose-700 hover:bg-rose-900 border-rose-300': isFavorite,
    })
    
    const handleOnClick = () => {
        setIsFavorite(!isFavorite);
    }

    const titleValue = isFavorite ? '♥︎ Remove from favorites' : '♥︎ Add to favorites';
    
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [details, setDetails] = useState<IMovieResponse>();
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const [errorDetails, setErrorDetails] = useState<boolean>(false);

    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(false);
    const [errorRecommendations, setErrorRecommendations] = useState<boolean>(false);
   
    const goBack = () => {
        navigate(-1);
    };

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
        setLoadingDetails(true);
        setLoadingRecommendations(true);
        getDetails();
        getRecommendations(); 
    }, []);

    return (
        <div>
            <div className='flex'>
                {loadingDetails && <div>Loading...</div>}
                {errorDetails && <div>Error...</div>}
                <div className='flex-none w-1/4 h-fit overflow-hidden shadow-xl rounded-lg mx-3 my-3'>{details?.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`} alt={details?.title} /> }</div>
                <div className='shrink flex-col-5 w-3/4 justify-between space-y-10 mr-5'>
                    <div className='text-5xl text-gray-800 font-semibold mx-4 mt-16'>{location.state.title}</div>
                    <div className='flex h-0'>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Group} alt='people'></img>
                                <div className='mx-1'>{details?.adult === true && '18+'}{details?.adult === false && '18-'}</div>
                            </div>
                        </div>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Time} alt='time'></img>
                                <div className='text-md font-medium'>{details?.runtime} min.</div>
                            </div>
                        </div>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Calendar} alt='calendar'></img>
                                <div className='mx-1'>{details?.release_date}</div>
                            </div>
                        </div>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Star} alt='star'></img>
                                <div className='text-md font-medium'>{details?.vote_average}</div>
                            </div>
                        </div>
                        <div className='text-md font-medium mx-4'>
                            <div className='flex h-6'>
                                <img src={Graph} alt='graph'></img>
                                <div className='text-md font-medium'>{details?.vote_count}</div>
                            </div>
                        </div>
                    </div>
                    <div className='text-md font-light mx-4'>
                        "{details?.tagline}"
                        <br></br>
                        {details?.overview}
                    </div>
                    <div className='flex w-auto'>
                        <div className='grid'>
                            <div className='text-lg font-semibold h-5 mx-4'>Genres</div>
                            <div className='flex space-x-2 mx-4'>
                                {details?.genres && details?.genres.map((genre) => (
                                <Pill title={genre.name}color={details?.vote_average > 6 ? 'green' :details?.vote_average > 5 && details?.vote_average < 6 ? 'yellow' : 'red'}></Pill>))}
                            </div>
                        </div>
                        <div className='grid mx-20'>
                            <div className='text-lg font-semibold'>Favorite</div>
                            <button onClick={handleOnClick} className={ButtonClass}>{titleValue}</button>
                        </div>
                    </div>
                    <button className=" bg-indigo-700 hover:bg-indigo-900 border-2 border-indigo-200 text-white font-bold p-2 h-fit rounded-md mx-4 mb-5" onClick={goBack}>⏎ Ir atrás</button>
                </div>
            </div>
            <div className='text-4xl text-gray-800 font-bold mx-12 my-5'>RECOMMENDATIONS</div>
            {loadingRecommendations && <div>Loading...</div>}
            {errorRecommendations && <div>Error...</div>}
            <div className='overflow-x-scroll flex -space-x-5 hide-scrollbar'>
                {recommendations?.length > 0 && recommendations.map((movie) => (
                    <div><MovieCard 
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