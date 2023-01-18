import React from 'react'
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/movie-detail/MovieDetail'
import MoviePreview from '../components/movie-preview/MoviePreview'

function DetailPage() {

  const { id } = useParams();

  return (
    <div className="detailPage">
      <MovieDetail/>
      <div className='max-center mt-30'>
        <MoviePreview title={"Similar movies"} redirect={"/trending"} 
        category={"similar"} id={id}/>
      </div>
    </div>
  )
}

export default DetailPage