import React from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/page-header/PageHeader';
import MovieGrid from '../components/movie-grid/MovieGrid';

function CatalogPage() {

  const { category } = useParams();

  return (
    <div className={`padding-page max-center`}>
      
      <PageHeader category={category} />
      {/* {isCategories ? <GenreNav /> : null} */}

      <MovieGrid category={category}/>
    </div>
  )
}

export default CatalogPage