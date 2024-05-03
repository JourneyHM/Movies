export interface IMovieCard {
    /*
     * The title of the movie
    */
    title: string;
    /*
     * The genre id of the movie
    */
    genreId: number;
    /*
     * The id of the movie
    */
    movieId: number;
    /*
     * The average rating of the movie
    */
    voteAverage: number;
    /*
     * The path to the movie poster
    */
    posterPath: string;
}