import React, { useEffect, useState } from 'react'

import tmdbApi from '../../api/tmdbApi';

import './genre-filter.scss'

function GenreFilter(props) {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      let response = null;
      const params = {};
      response = await tmdbApi.genres({params});
      setGenres(response.genres);
    }
    getGenres();
  }, [])

  const filterGenre = (e) => {
    const newGenreId = e.target.id;
    const selectedGenresX = [...props.selectedGenres];
    if(selectedGenresX.length === 0) {
      props.setSelectedGenres([newGenreId])
    } else {
      if(selectedGenresX.includes(newGenreId)){
        selectedGenresX.forEach((id, idx) => {
           if(id === newGenreId) {
            selectedGenresX.splice(idx, 1);
            console.log( "xas" , selectedGenresX)
            props.setSelectedGenres(selectedGenresX)
         }
         })
      } 
      else {
         props.setSelectedGenres([...selectedGenresX, newGenreId])
      }
    }
    console.log(props.selectedGenres)
  }

  return (
    <div className='genreFilter'>
      {
        genres.map((gen, i) => 
          <button
            key={i}
            id={gen.id}
            onClick={filterGenre}
          >
            {gen.name}
          </button>
        )
      }
    </div>
  )
}

export default GenreFilter