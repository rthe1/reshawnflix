import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests'


function Banner() {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals)

      setMovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ]
     )
    }
    fetchData();
  }, [])

  return (
    <header className="banner">
      <div className="banner_contents">

      <h1 className="banner_title" >{movie?.title || movie?.name || movie?.original}</h1>
      
       <button className="banner_button">
         Play
         </button> 
       <button className="banner_button">
         My List
         </button>    
      </div>

      <h1 className="banner_description">
    {movie?.overview}
      </h1> 
    </header>
  )
}

export default Banner