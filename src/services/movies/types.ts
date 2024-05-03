export interface IMovieResponse {
    adult:             boolean;
    backdrop_path:     string;
    genres:            Genres[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    tagline:           string;
    popularity:        number;
    poster_path:       string;
    release_date:      string;
    runtime:           string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export interface Genres {
    id:   number;
    name: string;
}
