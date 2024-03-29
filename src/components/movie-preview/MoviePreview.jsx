import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import { OutlineButton } from '../button/Button';
import MovieList from '../movie-list/MovieList'

import "./movie-preview.scss"

function MoviePreview(props) {

  const [t] = useTranslation("global");
  
  return (
    <div className='moviePreview'>
      <div className="moviePreview__section section mb-3">
        <div className="moviePreview__section__header mb-2">
          <h2 className='section__title'>{props.title}</h2>
          {props.category !== "similar" && (        
          <Link to={props.redirect}>
            <OutlineButton className="small">
              {`${t("lang.seeAll")}`}
            </OutlineButton>
          </Link>
          )}
        </div>
        <MovieList category={props.category} id={props.id}/> 
      </div>
    </div>
  )
}

export default MoviePreview