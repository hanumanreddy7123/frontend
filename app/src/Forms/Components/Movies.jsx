import React from "react";
import axios from "axios";
import './Movies.css'
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Movies()

{
    const[poster,Setposter]=useState('')
    const[data,Setdata]=useState([])
    const[playlist,SetPlaylist]=useState({movie:[]})
    const[searchvalue,setSearchvalue]=useState('')
    const navigate=useNavigate('')
    const header=localStorage.getItem('token')
    const handleSearchvalue=(e)=>
    {
        setSearchvalue(e.target.value)
        // handlegetMovies()
    }
    const handlegetMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchvalue}&apikey=fed34f50`,{header});
    
            Setdata(response.data.Search);
            const { Poster } = response.data;
            Setposter(Poster);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handlePlaylist = async (data) => {
        const isMovieInPlaylist = data && playlist.movie.some(movie => movie.id === data.imdbID);
        if(header)
        {
        if (isMovieInPlaylist) {
            alert("Movie Trying To Add Already Exists In Playlist");
        } else {
            const list = {
                title: data.Title,
                year: data.Year,
                id: data.imdbID,
                poster: data.Poster
            };
            const data1 = {
                id: localStorage.getItem("userid"),
                paly: list
            };
    
            try {
                const response = await axios.post("http://localhost:5050/playlist", data1,{header});
    
                SetPlaylist(prevPlaylist => ({ ...prevPlaylist, movie: [...prevPlaylist.movie, list] }));
                console.log(response.data);
            } catch (err) {
                console.log("something error occurred");
            }
        }
    }
    else{
        alert ("Login/Register to add movies")
    }
    };
    
    const handlegetPlaylist=()=>
    {
        console.log("In getplaylist function")
        navigate('/playlist')
    }
    const handleLogout=()=>
    {
        localStorage.clear()
        navigate('/home')
    }
    return (
        <div className="backgroundmovie">
            <nav className="navbar">
                <div className="navbar-heading">Blog Application</div>
                <div className="navbar-links">
                <div className="navbar-search">
                    <input
                        type="text"
                        title="Movie Name"
                        placeholder="Movie"
                        value={searchvalue}
                        onChange={handleSearchvalue}
                    />
                    <button onClick={handlegetMovies}>Search</button>
                </div>
                    <div className="navbar-link" onClick={handlegetPlaylist}>Playlist</div>
                    <div className="navbar-link" onClick={handleLogout}>Logout</div>
                </div>
            </nav>
            <div>
            <div className="content-container">
                <marquee className="scrolling-text">Search For Movies Add Make your Playlist</marquee>
            </div   >
            </div>
            <div className="grid-container">
    {data && data.map((ele) => (
        <div className="list" key={ele.imdbID}>
            <div className="image ">
                <img alt="poster" src={ele.Poster} className="im"  style={{ maxWidth: '40%', height:200}}/>
                <div className="data">
                    <div className="title">Title: {ele.Title}</div><br/>
                    <div className="rating">Year: {ele.Year}</div><br/>
                    <div>
                        <button className="t" value="Add To Playlist" title="Click To Make your Favourite" onClick={() => handlePlaylist(ele)}> Add</button>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

        </div>
    );
}

export default Movies;

