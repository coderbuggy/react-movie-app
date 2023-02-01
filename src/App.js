import './App.css';
import { useEffect, useState } from 'react'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = "http://omdbapi.com?apikey=a6134bf2"

function App() {

  //^ Setting Movies with UseState

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  //^ Getting Movies from API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);
  }


//^ Getting Movies when Page Loaded
useEffect(() => {
  searchMovies('Godfather')
}, []);

  return (
    <div className='app'>
      <h1>Movies App</h1>

      <div className='search'>
        <input 
          placeholder='Search movies...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
        alt='search'
        src={SearchIcon}
        onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : 
        (
          <div className='empty'>
            <h2>No movies found!</h2>
          </div>
        )

      }



    </div>
  );
}

export default App;
