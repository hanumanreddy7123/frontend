import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Playlist.css'

function Playlist() {
    const id = localStorage.getItem("userid");
    const [playlistData, setPlaylistData] = useState(null);
    const navigate = useNavigate('');
    const header = localStorage.getItem('token');

    useEffect(() => {
        if(!header)
        {
            alert("No access")
            navigate('/home')
        }
        axios.get(`http://localhost:5050/getplaylist/${id}`)
            .then((res) => {
                console.log(res.data);
                setPlaylistData(res.data.result);
            })
            .catch((error) => {
                console.error("Error fetching playlist:", error);
            });
    }, [id]);

    const handleRemoveFromPlaylist = async (movieId) => {
        try {
            const userId = localStorage.getItem("userid");
            await axios.delete(`http://localhost:5050/remove/${userId}/${movieId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
           
            setPlaylistData(prevData => ({
                ...prevData,
                movie: prevData.movie.filter(movie => movie.id !== movieId)
            }));
        } catch (error) {
            console.error("Error removing movie from playlist:", error);
        }
    };

    useEffect(() => {
        if (playlistData && playlistData.movie.length === 0) {
            navigate('/movies');
            alert("Playlist is empty and will be directed to ADD favoutites")
        }
    }, [playlistData, navigate]);

    return (
        <div className="grid-container">
            <div className="grid"> 
                <div>
                    {playlistData && (
                        <div>
                            {playlistData.movie.map((ele, index) => (
                                <div className="list1" key={index}>
                                    <div className="max-w-sm">
                                        <img alt="poster" src={ele.poster} className="im" style={{ maxWidth: '40%', height: 200 }} />
                                        <div className="data1">
                                            <div className="title1">Title: {ele.title}</div><br/>
                                            <div className="rating1">Year: {ele.year}</div>
                                            <div>
                                                <button className="playlist1" value="Remove From Playlist" title="Click To Remove From Playlist" onClick={() => handleRemoveFromPlaylist(ele.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
