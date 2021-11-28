import axios from 'axios';

const key = '7c9dd50606a07df965d51fc9621e1448';

const fetchMovies = (searchOption, query) => {
  if (query) {
    return axios
    .get(
      `https://api.themoviedb.org/3${searchOption}?api_key=${key}&query=${query}`
    )
    .then(data => data.data.results)
  }
  return axios
    .get(
      `https://api.themoviedb.org/3${searchOption}?api_key=${key}`
    )
    .then(data => {
      if (data.status !== 200) {
        alert('Not found')
        return
      }
      return data.data
    })
    
}

export default fetchMovies