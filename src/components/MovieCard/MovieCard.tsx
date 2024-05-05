import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { Pill } from '../Pill';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import genres from '../../constants/genres.json';
import './MovieCard.css';
import classNames from 'classnames';

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
  const poster = IMAGE_SOURCE + posterPath;

  const boxClass = classNames({
    'show-box': true,
  });
  const imageClass = classNames({
    'image-container': true,
  });
  const transitionClass = classNames({
    'show-thumb': true,
  });
  const infoShowClass = classNames({
    'info-show': true,
  });


  const getGenre = (genreId: number): string => {
    const genre: Genre | undefined = genres.genres.find(
      (genre: Genre) => genre.id === genreId
    );
    return genre ? genre.name : genreId.toString();
  };

  const navigateMovies = (id: number, title: string) => {
    navigate(`${ROUTES.SHOW}${id}`, { state: { title } });
  };

  return (
    <div className={boxClass} onClick={() => navigateMovies(movieId, title)}>
      <div className={imageClass}>
        <img className={transitionClass} src={poster} alt='poster' />
      </div>
      <div className={infoShowClass}>
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
