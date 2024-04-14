import axios from 'axios';


export function getPossibleValuesByField(field: string) {
  const link = "https://api.kinopoisk.dev/v1/movie/possible-values-by-field";
  const headers = {
    'X-API-KEY': process.env.TOKEN,
  };

  return axios.get(link, { headers, params: { field: field } });
}


export function getMovieByName(page = 1, limit = 10, name: string) {
  const link = "https://api.kinopoisk.dev/v1.4/movie/search";
  const headers = {
    'X-API-KEY': process.env.TOKEN,
  };
  const params = {
    page: String(page),
    limit: String(limit),
    query: name,
  }
  return axios.get(link, { headers, params });
}