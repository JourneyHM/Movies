import { Meta, StoryFn } from '@storybook/react';
import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline:false,
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        title: {control: 'text'},
        genreId: {control: 'number'},
        movieId: {control: 'number'},
        voteAverage: {control: 'number'},
        posterPath: {control: 'text'},
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;
/*
 * A default movie card with all the props
*/
export const Default = Template.bind({});
Default.args = {
    title: "The Super Mario Bros. Movie",
    genreId: 16,
    movieId: 502356,
    voteAverage: 7.5,
    posterPath: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
};