import React from 'react';

import { BsFillCollectionPlayFill } from "react-icons/bs"

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + props.category + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <>
            {(item.poster_path)
                ? <Link to={link}>
                    <div 
                    className="movie-card" 
                    style={{backgroundImage: `url(${bg})`}}>
                    <Button>
                        <BsFillCollectionPlayFill/>
                    </Button>
                   </div>
                   <h3 className='movie-card__title'>
                    {item.title || item.name}
                   </h3>
                   </Link>
                : null
            }
        </>
    );
}

export default MovieCard;
