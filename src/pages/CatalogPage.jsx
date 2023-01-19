import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/page-header/PageHeader';
import MovieGrid from '../components/movie-grid/MovieGrid';
import GenreFilter from '../components/genre-filter/GenreFilter';


function CatalogPage() {

  const { category, keyword} = useParams();


  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div className={`padding-page max-center`}>
      
      <PageHeader category={category} keyword={keyword}/>
      {category === "categories" 
      ? <GenreFilter setSelectedGenres={setSelectedGenres} selectedGenres={selectedGenres}/> 
      : null}

      <MovieGrid category={category} keyword={keyword} selectedGenres={selectedGenres}/>
    </div>
  )
}

export default CatalogPage