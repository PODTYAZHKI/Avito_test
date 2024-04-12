import axios from 'axios';

export function getMovieById(id: number) {
	const link = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
	const headers = {
	  'X-API-KEY': process.env.TOKEN
	};
  
	return axios.get(link, { headers });
  }


  export function getPostersById(id: number) {
	const link = 'https://api.kinopoisk.dev/v1.4/image';
	const headers = {
	  'X-API-KEY': process.env.TOKEN
	};
  
	return axios.get(link, { headers, params: {movieId: id} });
  }

  export function getSeasonsById(id: number) {
	const link = 'https://api.kinopoisk.dev/v1.4/season';
	const headers = {
	  'X-API-KEY': process.env.TOKEN
	};
  
	return axios.get(link, { headers, params: {movieId: id} });
  }
  