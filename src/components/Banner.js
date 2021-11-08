import axios from '../axios'
import React, { useState, useEffect } from 'react'
import requests from '../request'
import './Banner.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

function Banner() {
    const [movie, setMovie] = useState([])
    const [trailerUrl, settrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            console.log(request.data.results) //get all netflix originals

            // to select randomly one movie form array
            console.log(Math.floor(Math.random() * request.data.results.length - 1))
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
        }

        fetchData()
    }, [])

    console.log("A random movie==>", movie)

    // it will cut the string if it is more than n
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            settrailerUrl('')
        }
        else {
            // movieTrailer => is npm module it take movie name and search for the trailer.
            movieTrailer(movie?.name || '') //to handle name = undefine so empty ''
                .then(url => {
                    // in url which we get from movieTrailer, it contain full url:
                    // https://www.youtube.com/watch?v=XtMThy8QKqU&t=9585s;
                    // but we need only value of v => XtMThy8QKqU

                    const urlParams = new URLSearchParams(new URL(url).search); // URL(url).search; here we get all after '?' i.e. v=XtMThy8QKqU&t=9585s
                    // URLSearchParams() give us ability to search for particular keyword

                    settrailerUrl(urlParams.get('v'));

                }).catch((error) => console.log(error))
        }
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // ref link to play yt videos: https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }

    }

    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
                    // movie?.backdrop_path => if movie is not undefine then get backdrop path
                    backgroundPosition: "center center"
                }}
            >
                <div className="banner__contents">
                    {/* title */}
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                    {/* div > two buttons */}
                    <div className="banner__buttons">
                        <button className="banner__button" onClick={() => {
                            handleClick(movie)
                        }}>Play</button>
                        <button className="banner__button">My List</button>
                    </div>

                    {/* description */}
                    <h1 className="banner__description">
                        {truncate(movie?.overview, 150)}
                    </h1>
                </div>

                <div className="banner__fadeBottom" />
            </header>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Banner
