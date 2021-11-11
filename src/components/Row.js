import React, {useState, useEffect} from 'react'
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
  let [movies, setMovies] = useState([]);
  let [trailerUrl, setTrailerUrl] = useState();

  // run this code whenever this component mounts
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(movie);
    if(trailerUrl) {
      setTrailerUrl(false);
    }else {
      movieTrailer(movie?.name || movie?.title || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {
          // display each movies 
          movies.map((movie) => {
          return <img 
          key={movie.id} 
          onClick={() => handleClick(movie)} 
          className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={!isLargeRow ? baseUrl+movie.backdrop_path : baseUrl+movie.poster_path} alt={movie.title || movie.name} />
          })
        }
      </div>
      {trailerUrl && < Youtube videoId={trailerUrl} opts={opts} /> }
    </div>
  )
}

export default Row
