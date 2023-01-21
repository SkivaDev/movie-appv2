import React from 'react'
import { useTranslation } from 'react-i18next'
import HomeHero from '../components/home-hero/HomeHero'
import MoviePreview from '../components/movie-preview/MoviePreview' 

function HomePage() {
  const [t] = useTranslation("global");
  return (
    <div className='homePage'>
      <HomeHero/>
      <div className='max-center'>
        <MoviePreview title={`${t("lang.trending")}`} redirect={"/trending"} 
        category={"trending"}/>
        <MoviePreview title={`${t("lang.popular")}`} redirect={"/popular"} 
        category={"popular"}/>
        <MoviePreview title={`${t("lang.upcoming")}`} redirect={"/upcoming"} 
        category={"upcoming"}/>
      </div>
    </div>
  )
}

export default HomePage