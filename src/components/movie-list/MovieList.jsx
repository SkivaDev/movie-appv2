import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { SwiperSlide, Swiper } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper";

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button from '../button/Button';
import MovieCard from '../movie-card/MovieCard';

import './movie-list.scss';

const MovieList = props => {

    const [t] = useTranslation("global");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {language: `${t("lang.langAPI")}`};

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
    }, [t]);

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
