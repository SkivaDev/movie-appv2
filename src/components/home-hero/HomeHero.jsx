import React, { useEffect, useState } from 'react'

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Modal, { ModalContent } from '../modal/Modal';
import YouTube from "react-youtube";

function HomeHero() {

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1}

      try {
         const response = await tmdbApi.getMoviesList(movieType.popular, {params});
          setMovieItems(response.results.slice(1,9));
          console.log(response);
      } catch {
        console.log("ERROR")
      }
    }

    getMovies();
  }, [])
  

  return (
    <div className='homeHero'>
      <div>HOLI:3</div>
      {/* <HomeHeroItem/> */}
      {
        movieItems.map((item, i) => (
          <p key={i}>{item.title}</p>
        ))
      }

    </div>
  )
}
/*
const HomeHeroItem = props => {

  return (
    <div className={`homeHero__item ${props.className}`}>
      <div className='homeHero__item__content '>
        <div className='homeHero__item__content__background'>

        </div>
        <div className='homeHero__item__content__info'>
          <div className='homeHero__item__datas'>
            <div className="data__star">
             <span>★</span>{selectedMovie.vote_average} 
            </div>
            •
            <p className="data__num">{minString(selectedMovie.runtime)}</p>
            •
            <div className="data__category">TRENDING</div>
          </div>
          <div className='homeHero__item__texts'>
            <h2 className="data__title">
            {selectedMovie.title}
            </h2>
            <p className="data__overview">
              {selectedMovie.overview}
            </p>
          </div>
          <div className="homeHero__item__buttons">
            <button className="PlayTrailer__button">
              <span>{">"}</span>
              <p>PLAY TRAILER</p>
            </button>
            <button className="GoDatails__button">
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
    <Modal>
      <ModalContent>
        {renderTrailer()}
      </ModalContent>
    </Modal>
  )
}
*/
export default HomeHero