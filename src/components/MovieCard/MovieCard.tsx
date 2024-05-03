import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { Pill } from '../Pill';
import genres from '../../constants/genres.json';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

interface Genre {
  id: number;
  name: string;
}

const MovieCard: React.FC<IMovieCard> = ({
  title,
  genreId,
  movieId,
  voteAverage,
  posterPath,
}) => {
  const navigate = useNavigate();
  // states
  const poster = IMAGE_SOURCE + posterPath;

  const getGenre = (genreId: number): string => {
    const genre: Genre | undefined = genres.genres.find(
      (genre: Genre) => genre.id === genreId
    );
    return genre ? genre.name : genreId.toString();
  };

  const navigateMovies = (id: number, title: string) => {
    navigate(`${ROUTES.SHOW}${id}`, {state: {title}});
  };
  
  return (
    <div className='bg-white w-64  h-96 float-left overflow-hidden block mx-3 mb-8 mr-7 relative shadow-xl rounded-lg' onClick={() => navigateMovies(movieId, title)}>
      <div className=' bg-blue-950 shadow-xl relative float-none'>
        <img
          className='transition duration-1000 scale-100 overflow-hidden w-64 h-96 relative max-w-none ml-0 hover:scale-125 hover:opacity-40'
          src={poster} alt='poster'/>
      </div>
      <div className='rounded-lg shadow-xl absolute bottom-0 left-0 w-full h-auto opacity-100 transition-all bg-gradient-to-t from-black to-transparent'>
        <div className=' text-white mx-2 mb-6'>
          <div>
            <Pill
              title={getGenre(genreId)}
              color='red'
            />
          </div>
          <div className='text-lg font-bold'>{title}</div>
          <div className='text-xs my-3'>★ {voteAverage} / 10</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
