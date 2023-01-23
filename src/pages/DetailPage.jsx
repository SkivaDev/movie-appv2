import React from 'react'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import MovieDetail from '../components/movie-detail/MovieDetail'
import MoviePreview from '../components/movie-preview/MoviePreview'

function DetailPage() {

  const { id } = useParams();
  const [t] = useTranslation("global");

  return (
    <div className="detailPage">
      <MovieDetail/>
      <div className='max-center mt-30'>
        <MoviePreview title={`${t("lang.similarMovies")}`} 
        category={"similar"} id={id}/>
      </div>
    </div>
  )
}

export default DetailPage