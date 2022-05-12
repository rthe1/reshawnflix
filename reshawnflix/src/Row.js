import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "http://image.tmdb.org/t/p/original/"

function Row({ title, fetchURL, isLargeRow }) {

const [movies, setMovies] = useState([]);
const [trailerUrl, setTrailerUrl] = useState("");

useEffect(() => {

  async function fetchData() {

    const request = await axios.get(fetchURL);
    setMovies(request.data.results)
    return request;

  }

  fetchData();

}, [fetchURL])

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay:1,
  },
}

const handleClick = (movie) => {
  if(trailerUrl){
    setTrailerUrl('');
  } else {
    movieTrailer(movie?.title || "")
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
      console.log(trailerUrl)
    })
    .catch( (err)=> console.log(err))
  }
}

  return (
    <div className="row">
    <h2>{title}</h2>

    <div className="row_posters">

    {movies.map(movie =>(

      <img
      onClick={() => handleClick(movie)}
      key={movie.id}
      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
      alt={movie.name}
      />

    ))}

    </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} 
    </div>

  )
}

export default Row