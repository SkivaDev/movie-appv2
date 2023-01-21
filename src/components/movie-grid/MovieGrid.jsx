import React, { useEffect, useState } from 'react'
import tmdbApi, { category } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next'
import MovieCard from '../movie-card/MovieCard';

import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "./movie-grid.scss";

function MovieGrid(props) {

  const [t] = useTranslation("global");

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(parseInt(1));
  const [totalPage, setTotalPage] = useState(0);


  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (props.keyword === undefined) {
          const params = {
            page: 1,
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
              query: props.keyword
          }
          response = await tmdbApi.search({params});
      }
      setItems(response.results);
      setPage(parseInt(1));
      setTotalPage((response.total_pages > 500) ? 500 : response.total_pages);
    }
    getList();
    window.scrollTo({top: 0, behavior: 'smooth',});

  }, [props.category, props.keyword, props.selectedGenres, t])

  const loadMore = async () => {
    let response = null;
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
    setItems([...items, ...response.results]);
    setPage(parseInt(page + 1));
  }

  const infiniteScroll = () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      clientWidth
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100);
    const pageIsNotMax = page < totalPage;
    const isTablet = clientWidth <= 1024;

    if (scrollIsBottom && pageIsNotMax  && isTablet) {
      console.log("scroll se activo");
      setTimeout(() => {
        loadMore();
      }, 2000);
    }
  }
  window.addEventListener('scroll', infiniteScroll)



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



  // console.log("changePaginationPage: ", changePaginationPage);

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
      <div className="movie-grid">
        {
          items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
        }
      </div>
      {/* {
        page < totalPage ? (
          <div className="movie-grid__loadmore">
            <button className="small" onClick={loadMore}>
              Load more
            </button>
          </div>
        ) : null
      } */}
      <div className='movie-grid__pagination'>
        <ThemeProvider theme={theme}>
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
                getPaginatedMovies(newPage);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                      });
              }
            }
          />
        </ThemeProvider>
      </div>
      
    </>
  )
}

export default MovieGrid

