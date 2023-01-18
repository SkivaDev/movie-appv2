import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { BiArrowBack } from "react-icons/bi"

import './movie-detail.scss'

function MovieDetail() {

  const { category, id } = useParams();

  const [movieItem, setMovieItem] = useState({});

  console.log("IDDD", id);
  useEffect(() => {
    const getDetail = async () => {
      const params = {}

      try {

        const response = await tmdbApi.detail( id, {params});
        setMovieItem(response);

     } catch {
       console.log("ERROR MOVIEDETAIL")
     }
    }

    getDetail();
    window.scrollTo({top: 0, behavior: 'smooth',});

  }, [category, id])
  

  return (
    <div className='movieDetail'>
      <MovieDetailItem key={0} item={movieItem} category={category}/>
    </div>
  )
}

const MovieDetailItem = props => {

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const poster = apiConfig.originalImage(item.poster_path ? item.poster_path : item.backdrop_path);


  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)

    const videos = await tmdbApi.getVideos(item.id, {});
  }

  const navigate = useNavigate();

  const returnBack = () => {
    navigate(-1);
  }

  return (
    <div className='movieDetail__item max-center'>
      <div className='movieDetail__item__content'>
        <div 
          className='movieDetail__item__content__background'
          style={{backgroundImage: `url(${background})`}}
        >
        </div>
        <div 
          className='movieDetail__item__content__poster'
          style={{backgroundImage: `url(${poster})`}}
        >
        </div>
        <div className='movieDetail__item__content__info'>
          <div className='movieDetail__item__datas'>
            <div className="data__star">
             <span>★</span>{item.vote_average} 
            </div>
            •
            <p className="data__num">{item.runtime}</p>
            •
            <div className="data__category">{props.category}</div>
          </div>
          <div className='movieDetail__item__texts'>
            <h2 className="data__title">
            {item.title}
            </h2>
            <p className="data__overview">
              {item.overview}
            </p>
            <h5 className="data__released">
              <marker>Released: </marker>{item.release_date}
            </h5>
          </div>
          <div className="movieDetail__item__buttons">
            <button className="playTrailer__button">
              <span>{">"}</span>
              <p>PLAY TRAILER</p>
            </button>
          </div>
          <div className="movieDetail__item__genres">
            <h3 className='genre__text'>Categories</h3>        
              {/* <SentionBUTTON/> */}
          </div>
          <div className={`movieDetail__item__btn-back`}>
            <button className={`button`} onClick={returnBack}>
              <BiArrowBack className={`button-icon`} />
              <p className={`button-text`}>GO BACK</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail