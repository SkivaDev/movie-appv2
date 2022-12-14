import React, { useEffect, useState } from 'react'

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Modal, { ModalContent } from '../modal/Modal';
import YouTube from "react-youtube";

import "./home-hero.scss";

function HomeHero() {

  const [movieItems, setMovieItems] = useState([]);
  const [movieItem, setMovieItem] = useState({});

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
      {/* {
        movieItems.map((item, i) => (
          <HomeHeroItem key={i} item={item}/>
        ))
      } */}

      <HomeHeroItem key={0} item={movieItem}/>
  
      {/* {
        movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
      } */}
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

  return (
    <div className={`homeHero__item`}>
      <div className='homeHero__item__content max-center'>
        <div 
          className='homeHero__item__content__background'
          style={{backgroundImage: `url(${background})`}}
        >
        </div>
        
        {/* <img src={background} alt="xd" className='homeHero__item__content__background2'/> */}
        <div className='homeHero__item__content__info'>
          <div className='homeHero__item__datas'>
            <div className="data__star">
             <span>???</span>{item.vote_average} 
            </div>
            ???
            <p className="data__num">{item.runtime}</p>
            ???
            <div className="data__category">TRENDING</div>
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
              <span>{">"}</span>
              <p>PLAY TRAILER</p>
            </button>
            <button className="goDetails__button">
              <span>?</span>
              <p>DETAILS</p>
            </button>
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