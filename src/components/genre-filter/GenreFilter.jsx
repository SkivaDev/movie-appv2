import React, { useEffect, useState } from 'react'

import tmdbApi from '../../api/tmdbApi';

import './genre-filter.scss'

function GenreFilter(props) {

  const [genres, setGenres] = useState([]);
  const [clickedGenre, setClickedGenre] = useState(false)


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
    highlightSelection(newGenreId);
  }

  const highlightSelection = () => {
    const tag = document.querySelectorAll(".genreFilter__btn");
    tag.forEach(tag => {
      tag.classList.remove('highlight')
    })

    const selectedGenresX = [...props.selectedGenres];
    if(props.selectedGenres !== 0) {
      props.selectedGenres.forEach(id => {
        const hightlightedTag = document.getElementById(id);
        hightlightedTag.classList.add('highlight');
      })
    }
  }


  return (
    <div className='genreFilter'>
      {
        genres.map((gen, i) => 
          <button
            className={`genreFilter__btn`}
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