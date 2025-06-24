const API_KEY = '91bb7e68831763126c91807afa8cdd9e'
const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovie = async() => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}
export const searchMovies = async(query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}}`)
    const data = await response.json()
    return data.results
}