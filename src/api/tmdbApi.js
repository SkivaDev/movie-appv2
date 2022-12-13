import axiosClient from "./axiosClient";

// export const category = {
//   movie: 'movie',
//   tv: 'tv'
// }

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
}

// export const tvType = {
//   popular: 'popular',
//   top_rated: 'top_rated',
//   on_the_air: 'on_the_air'
// }

const tmdbApi = {
  getMoviesList: (type, params) => {
      const url = 'movie/' + movieType[type];
      return axiosClient.get(url, params);
  },
  getTrendingMovieList: (params) => {
      const url = 'trending/movie/day'
      return axiosClient.get(url, params);
  },
  getVideos: (id, params) => {
      const url = 'movie/' + id + '/videos';
      return axiosClient.get(url, params);
  },
  search: (params) => {
      const url = 'search/movie';
      return axiosClient.get(url, params);
  },
  detail: (id, params) => {
      const url = 'movie/' + id;
      return axiosClient.get(url, params);
  },
  // credits: (cate, id) => {
  //     const url = category[cate] + '/' + id + '/credits';
  //     return axiosClient.get(url, {params: {}});
  // },
  similar: (id, params) => {
      const url = 'movie/' + id + '/similar';
      return axiosClient.get(url, params);
  },
  genres: (params) => {
    const url = 'genre/movie/list';
    return axiosClient.get(url, params);
  },
  getMoviesByCategory: (id, params) => {
    const url = 'discover/movie'
    return axiosClient.get(url, {...params, params: {with_genres: id}})
  }
}

export default tmdbApi;