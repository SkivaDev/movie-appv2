import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import tmdbApi from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next'

import { MdOutlineCloseFullscreen } from 'react-icons/md'
import './trailer-modal.scss'

function TrailerModal(props) {
  
  const [t] = useTranslation("global");

  const item = props.item;
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      // const params = {language: "es-MX"}
      const params = {language: `${t("lang.langAPI")}`}
      const res = await tmdbApi.getVideos(item.id, {params});
      console.log("VIDEO3", res)
      const trailer = res.results.find(vid => 
        vid.name.toLowerCase().includes("official trailer") 
        || vid.name.toLowerCase().includes("tráiler oficial") 
        || vid.name.toLowerCase().includes("trailer oficial"));
      // const trailer = res.results.find(vid => vid.name.toLowerCase().includes() === "Official Trailer" || "Tráiler Oficial");
      const key = trailer ? trailer.key : res.results[0].key;
      setTrailerKey(key);
    }
    getVideo();
  }, [item, t]);

  return (
    <div className={`trailerModal ${props.playTrailer ? "active" : ""}`}>
      <div className='trailerModal__content'>
        {/* <div className={"youtube-container"}>
        </div> */}
        {
          trailerKey 
          ? <YouTube
              videoId={trailerKey}
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
          : <div className='message-noTrailer'>{`${t("lang.noTrailer")}`}</div>
        }
        
        <button 
          className={`trailerModal__content_close ${props.playTrailer ? "active" : ""}`} 
          onClick={() => props.setPlayTrailer(false)}
        >
          <MdOutlineCloseFullscreen className='icon'/>
        </button>
      </div>
    </div>
  )
}

export default TrailerModal