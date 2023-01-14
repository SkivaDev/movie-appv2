import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';

import "./movie-grid.scss";

function MovieGrid(props) {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
          const params = {};
          switch(props.category) {
            case "upcoming":
              response = await tmdbApi.getMoviesList("upcoming", {params});
              break;
            case "popular":
              response = await tmdbApi.getMoviesList("popular", {params});
              break;
            case "trending":
              response = await tmdbApi.getTrendingMovieList({params});
              break;
          }
      } else {
          const params = {
              query: keyword
          }
          response = await tmdbApi.search({params});
      }
      setItems(response.results);
      console.log("Ya paso?")
      setTotalPage(response.total_pages);
    }
    getList();
  }, [props.category, keyword])
  

  return (
    <div className="movie-grid">
      {
        items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
      }
    </div>
  )
}

export default MovieGrid