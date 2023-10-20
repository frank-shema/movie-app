import React, { useEffect, useState } from 'react';
import './App.css';
import SearcHIcon from './assets/search.svg';
import MovieCardd from './MovieCardd';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // State to store search input


  const API_KEY = '3f731439'; 
  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>Movieland</h1>
      <div className="search">
        <input
          type="text"
          placeholder='Search for movies'
          value={searchInput} // Bind input value to state
          onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
        />
        <img src={SearcHIcon} alt="search" onClick={() => searchMovies(searchInput)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCardd key={movie.imdbID} movie={movie} /> // Added a unique key
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
