import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import tmdbApi from '../../api/tmdbApi';

import './genre-filter.scss'

function GenreFilter(props) {

  const [t] = useTranslation("global");

  const [genres, setGenres] = useState([]);
  const [clickedGenre, setClickedGenre] = useState(false)


  useEffect(() => {
    const getGenres = async () => {
      let response = null;
      const params = {language: `${t("lang.langAPI")}`};
      response = await tmdbApi.genres({params});
      setGenres(response.genres);
    }
    getGenres();
  }, [t])

  const filterGenre = (e) => {
    const newGenreId = e.target.id;
    const selectedGenresX = [...props.selectedGenres];

    if(selectedGenresX.length === 0) {
      selectedGenresX.push(newGenreId);
    } else {
      if(selectedGenresX.includes(newGenreId)){
        selectedGenresX.forEach((id, idx) => {
           if(id === newGenreId) {
            selectedGenresX.splice(idx, 1);
         }
         })
      } 
      else {
        selectedGenresX.push(newGenreId)
      }
    }
    props.setSelectedGenres(selectedGenresX);
    highlightSelection(selectedGenresX);
  }

  const highlightSelection = (selectedGenres) => {
    const tag = document.querySelectorAll(".genreFilter__btn");
    tag.forEach(tag => {
      tag.classList.remove('highlight')
    })

    if(selectedGenres !== 0) {
      selectedGenres.forEach(id => {
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