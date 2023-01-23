import React, { useCallback, useEffect, useRef, useState } from 'react'
import tmdbApi, { category } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next'
import MovieCard from '../movie-card/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';


import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "./movie-grid.scss";

function MovieGrid(props) {

  const [t] = useTranslation("global");

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(parseInt(1));
  const [totalPage, setTotalPage] = useState(0);
  
  const [paginationMode, setPaginationMode] = useState("pagination");

  useEffect(() => {
   setPage(parseInt(1))
   setItems([])
  }, [props.category, props.selectedGenres, props.keyword, t])
  

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (props.keyword === undefined) {
          const params = {
            page: page,
            language: `${t("lang.langAPI")}`,
          };
          // setChangePaginationPage(page);
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
            case "categories":
              console.log("HOla?")
              const stringGenres = props.selectedGenres.join(",");
              response = await tmdbApi.getMoviesByCategory(stringGenres, {params});
              console.log(response)
              break;
          }
      } else {
          const params = {
              page: page,
              query: props.keyword,
              language: `${t("lang.langAPI")}`,
          }
          response = await tmdbApi.search({params});
      }
      console.log("que pasa", response)
      if ( paginationMode === "infinite scroll") {
        setItems(prevItems => {
          return [...new Set([...prevItems, ...response.results])]
        })
      } else {
        setItems(response.results);
      }
      setHasMore(response.page < response.total_pages);
      setTotalPage((response.total_pages > 500) ? 500 : response.total_pages);
    }
    getList();
    changeScreenMode();

  }, [props.category, props.keyword, props.selectedGenres, t, page])

  const loadMore = async () => {
    setLoading(true)
    setError(false)
    let response = null;
    try {
      if (props.keyword === undefined) {
        const params = {
          page: page + 1,
          language: `${t("lang.langAPI")}`,
        };
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
          case "categories":
            const stringGenres = props.selectedGenres.join(",");
            response = await tmdbApi.getMoviesByCategory(stringGenres, {params});
            break;
        }
      } else {
        const params = {
          language: `${t("lang.langAPI")}`,
          page: page + 1,
          query: props.keyword
        }
        response = await tmdbApi.search({params});
      }
    } catch (error) {
      setError(true)
    }
    setItems(prevItems => {
      return [...new Set([...prevItems, ...response.results])]
    })
    setPage(parseInt(page + 1));
    setHasMore(response.results.lenght > 0);
    setLoading(false);
  }

  //
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)


    const getPaginatedMovies = async (newPage) => {
    let response = null;
    if (props.keyword === undefined) {
      const params = {
        language: `${t("lang.langAPI")}`,
        page: newPage
      };
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
        case "categories":
          const stringGenres = props.selectedGenres.join(",");
          response = await tmdbApi.getMoviesByCategory(stringGenres, {params});
          console.log("New list page cat", response);
          break;
      }
    } else {
      const params = {
        language: `${t("lang.langAPI")}`,
        page: newPage,
        query: props.keyword
      }
      response = await tmdbApi.search({params});
    }
    console.log("wasss")
    console.log("response", response)
    setPage(parseInt(newPage));
    setItems(response.results);
  }

//
  const changeScreenMode = () => {
    const {
      clientWidth
    } = document.documentElement;
    if(clientWidth > 1024) {
      setPaginationMode("pagination")
    } else {
      setPaginationMode("infinite scroll")
    }
  }
  window.addEventListener("resize", changeScreenMode);

  const handlePagination = (newPage) => {
    setPage(parseInt(newPage))
  }
  const handleInfiniteScrolling = () => {
    setPage(prevPage => prevPage + 1)
  }

  // 

  let theme = createTheme({
    palette: {
      primary:{
	main: `#E13C2F`,
      }
    },
    components: {
      MuiPagination: {
	styleOverrides: {
	  ul: {
	    justifyContent: 'center',
	    marginBlockStart: '1.6rem'

	  }
	}
      },
      MuiPaginationItem: {
	styleOverrides: {
	  root:{
	    color: "#fff",
	    fontSize: '17rem'
	  },
	  icon: {
	    width: '17rem',
	    height: '17rem'
	  }
	}
      }
    }
  })

  return (

    <>
        {
          (paginationMode === "infinite scroll")
          ? <InfiniteScroll
          dataLength={items.length}
          next={handleInfiniteScrolling}
          hasMore={hasMore}
          loader={
          <ThemeProvider theme={theme}>
            <CircularProgress className='circularProgress'/>
          </ThemeProvider>
          }
          > 
          <div className="movie-grid">
            {
              items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
            }
          </div>
          </InfiniteScroll>
          : <div className="movie-grid">
            {
              items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
            }
          </div>
        }
      
       
      <div className='movie-grid__pagination'>
        {
          (paginationMode === "pagination")
          ? <ThemeProvider theme={theme}>
              <Pagination 
                count={totalPage} 
                variant="outlined" 
                shape="rounded" 
                color="primary"
                size='large'
                siblingCount={4}
                page={page}
                onChange={
                  (event) => {
                    const newPage = event.target.innerText;
                    handlePagination(newPage);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                          });
                  }
                }
              />
            </ThemeProvider>
          : null
        }
      </div>
    </>
  )
}

export default MovieGrid

