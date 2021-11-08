import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import axios from '../axios'
import './Row.css'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original"

// destructuring the PROPS
function Row({ title, fetchUrl, isLarge }) {
    const [movies, setmovies] = useState([])
    const [trailerUrl, settrailerUrl] = useState("") //initially it is blank string; it contain yt video url

    // code which run based on specific condition/variable
    useEffect(() => {
        async function fetchdata() {
            const request = await axios.get(fetchUrl);
            // baseUrl + fetchUrl
            // https://apithemoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US

            // append it to movies array
            setmovies(request.data.results)
            return request
        }

        fetchdata()
    }, [fetchUrl]) // if [] means run only when page reload i.e one times.
    // In this case; whenever you use varible outside useEffect in our case "fetchUrl-> line 5 as (props); then you have to put in useEffect, because whenever that fetch url change we need our fucntion to run and change data accordingly." 


    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // ref link to play yt videos: https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }

    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            // means trailer is already open. so set to empty i.e close.
            settrailerUrl('')
        }
        else{
            // movieTrailer => is npm module it take movie name and search for the trailer.
            movieTrailer(movie?.name || '') //to handle name = undefine so empty ''
            .then(url =>{
                // in url which we get from movieTrailer, it contain full url:
                // https://www.youtube.com/watch?v=XtMThy8QKqU&t=9585s;
                // but we need only value of v => XtMThy8QKqU

                const urlParams = new URLSearchParams(new URL(url).search); // URL(url).search; here we get all after '?' i.e. v=XtMThy8QKqU&t=9585s
                // URLSearchParams() give us ability to search for particular keyword

                settrailerUrl(urlParams.get('v'));

            }).catch((error)=>console.log(error))
        }
    }

    return (
        <div className="row">
            {/* STRUCTURE.. */}

            {/* title */}
            <h2>{title}</h2>

            <div className="row__posters">
                {/* Container -> Posters */}
                {movies.map((movie) => (
                    <img key={movie.id} src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row__poster ${isLarge && "row__posterLarge"}`}
                        // when user click on img onClick will send movie url
                        // reason for onClick{()=>{}} not onClick{handleClick(movie)}; because without arrow func sending all movies... with arrow func send only one which we click.

                        // because if you want to pass any value to fucntion then you need to use like arrow function only.
                        onClick={()=>{
                            handleClick(movie)
                        }} />
                    // row__poseter for all but if isLarge==true then additional class: row__posterLarge also
                ))}
            </div>

            {/* to play youtube trailer for that particular movie */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row
