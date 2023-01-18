import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper";



import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.category !== 'similar') {
                switch(props.category) {
                  case "upcoming":
                    response = await tmdbApi.getMoviesList("upcoming", {params});
                    break;
                  case "popular":
                    response = await tmdbApi.getMoviesList("popular", {params});
                    break;
                  case "trending":
                    response = await tmdbApi.getTrendingMovieList({params});
                    break;
                }
            } else {
                response = await tmdbApi.similar(props.id, {params});
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                modules={[Scrollbar]}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
}

export default MovieList;