import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import tmdbApi from '../../api/tmdbApi';

import { MdOutlineCloseFullscreen } from 'react-icons/md'
import './trailer-modal.scss'

function TrailerModal(props) {

  const item = props.item;
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      const params = {}
      const res = await tmdbApi.getVideos(item.id, params);
      const trailer = res.results.find(vid => vid.name === "Official Trailer");
      const key = trailer ? trailer.key : res.results[0].key;
      setTrailerKey(key);
    }
    getVideo();
  }, [item]);

  return (
    <div className={`trailerModal ${props.playTrailer ? "active" : ""}`}>
      <div className='trailerModal__content'>
        {/* <div className={"youtube-container"}>
        </div> */}
        <YouTube
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