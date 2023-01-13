import React from 'react'
import HomeHero from '../components/home-hero/HomeHero'
import MoviePreview from '../components/movie-preview/MoviePreview' 

function HomePage() {
  return (
    <div className='homePage'>
      <HomeHero/>
      <div className='max-center'>
        <MoviePreview title={"Trending"} redirect={"/trending"} 
        category={"trending"}/>
        <MoviePreview title={"Popular"} redirect={"/popular"} 
        category={"popular"}/>
        <MoviePreview title={"Upcoming"} redirect={"/upcoming"} 
        category={"upcoming"}/>
      </div>
    </div>
  )
}

export default HomePage