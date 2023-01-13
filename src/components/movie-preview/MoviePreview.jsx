import React from 'react'
import { Link } from 'react-router-dom';

import { OutlineButton } from '../button/Button';
import MovieList from '../movie-list/MovieList'
import "./movie-preview.scss"

function MoviePreview(props) {
  return (
    <div className='moviePreview'>
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>{props.title}</h2>
          <Link to={props.redirect}>
            <OutlineButton className="small">SEE ALL</OutlineButton>
          </Link>
        </div>
        <MovieList category={props.category}/> 
      </div>
    </div>
  )
}

export default MoviePreview