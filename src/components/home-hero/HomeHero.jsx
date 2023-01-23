import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useTranslation } from 'react-i18next'
import { formatRunTime, formatVoteAverage } from '../../utils/utils'

import TrailerModal from '../trailer-modal/TrailerModal';

import YouTube from "react-youtube";

import { BsFillPlayFill } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import "./home-hero.scss";


function HomeHero() {

  const [t] = useTranslation("global");

  const [movieItems, setMovieItems] = useState([]);
  const [movieItem, setMovieItem] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);


  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1, language: `${t("lang.langAPI")}`}

      try {
         const response = await tmdbApi.getMoviesList(movieType.popular, {params});
          setMovieItems(response.results.slice(1,9));

          function getIndexRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
          }
          const randomMovie = await tmdbApi.detail(response.results[getIndexRandom(0,9)]["id"], {params});
          setMovieItem(randomMovie);
          console.log(response);
          console.log(randomMovie);
      } catch {
        console.log("ERROR")
      }
    }

    getMovies();
  }, [t])
  


  return (
    <div className='homeHero'>
      <HomeHeroItem 
      key={0} 
      item={movieItem} 
      setPlayTrailer={setPlayTrailer}
      />
      {
        playTrailer 
        ? <TrailerModal item={movieItem} setPlayTrailer={setPlayTrailer} playTrailer={playTrailer}/> 
        : null
      }
    </div>
  )
}

const HomeHeroItem = props => {

  const [t] = useTranslation("global");

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const link = '/popular/' + item.id;

  return (
    <div className={`homeHero__item`}>
      <div className='homeHero__item__content max-center'>
        <div 
          className='homeHero__item__content__background'
          style={{backgroundImage: `url(${background})`}}
        >
        </div>
        
        <div className='homeHero__item__content__info'>
          <div className='homeHero__item__datas'>
            <div className="data__star">
             <span>★</span>{formatVoteAverage(item.vote_average)} 
            </div>
            •
            <p className="data__num">{formatRunTime(item.runtime)}</p>
            •
            <div className="data__category">POPULAR</div>
          </div>
          <div className='homeHero__item__texts'>
            <h2 className="data__title">
            {item.title}
            </h2>
            <p className="data__overview">
              {item.overview}
            </p>
          </div>
          <div className="homeHero__item__buttons">
            <button className="playTrailer__button">
              <BsFillPlayFill className='playTrailer__button__icon'/>
              <p className='playTrailer__button__text' 
                onClick={()=> props.setPlayTrailer(true)}
              >
                {`${t("lang.playTrailer")}`}
              </p>
            </button>
            <Link className="goDetails__button" to={link}>
              <AiFillInfoCircle className='goDetails__button__icon'/>
              <p className='goDetails__button__text'>
                {`${t("lang.details")}`}
              </p>
            </Link>
          </div>
        </div>
        <div className='homeHero__item__content__poster'>
          <img src={``} alt="" />
        </div>
      </div>
    </div>
  )
}
export default HomeHero