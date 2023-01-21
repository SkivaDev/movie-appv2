import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import TrailerModal from '../trailer-modal/TrailerModal';

import Modal, { ModalContent } from '../modal/Modal';
import YouTube from "react-youtube";

import { BsFillPlayFill } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import "./home-hero.scss";

import { formatRunTime, formatVoteAverage } from '../../utils/utils'

function HomeHero() {

  const [movieItems, setMovieItems] = useState([]);
  const [movieItem, setMovieItem] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);


  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1}

      try {
         const response = await tmdbApi.getMoviesList(movieType.popular, {params});
          setMovieItems(response.results.slice(1,9));

          function getIndexRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
          }
          const randomMovie = await tmdbApi.detail(response.results[getIndexRandom(0,9)]["id"]);
          setMovieItem(randomMovie);
          console.log(response);
          console.log(randomMovie);
      } catch {
        console.log("ERROR")
      }
    }

    getMovies();
  }, [])
  


  return (
    <div className='homeHero'>
      <HomeHeroItem 
      key={0} 
      item={movieItem} 
      setPlayTrailer={setPlayTrailer}
      />
      {/* {
        playTrailer 
        ? <TrailerModal item={movieItem} setPlayTrailer={setPlayTrailer}/> 
        : null
      } */}
      {
        playTrailer 
        ? <TrailerModal item={movieItem} setPlayTrailer={setPlayTrailer} playTrailer={playTrailer}/> 
        : null
      }

      {/* <TrailerModal item={movieItem} setPlayTrailer={setPlayTrailer} playTrailer={playTrailer}/>  */}

    </div>
  )
}

const HomeHeroItem = props => {

  // let hisrory = useHis();

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`)

    const videos = await tmdbApi.getVideos(item.id, {});
  }

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
                PLAY TRAILER
              </p>
            </button>
            <Link className="goDetails__button" to={link}>
              <AiFillInfoCircle className='goDetails__button__icon'/>
              <p className='goDetails__button__text'>DETAILS</p>
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
/*
const TrailerModal = props => {

  const item = props.item;

  // const onClose = () => 

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer")
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key

    return (
      <YouTube 
        videoId={key}
        className={"youtube-container"}
        containerClassName={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0
          },
        }}
      />
    )
  }
  

  return (
    <Modal id={`modal_${item.id}`}>
      <ModalContent>
        {renderTrailer()}
      </ModalContent>
    </Modal>
  )
}
*/
export default HomeHero