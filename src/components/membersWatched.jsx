import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MembersWatched = ({ memberId }) => {
    const [watchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        const fetchWatchedMovies = async () => {
            try {
                // Fetch movies and subscriptions data
                const moviesResponse = await axios.get('http://localhost:3000/movies');
                const subsResponse = await axios.get('http://localhost:3000/subs');

                // Filter subscriptions for the current member
                const memberSubs = subsResponse.data.filter(sub => sub.MemberID === memberId);

                // Map MovieIDs to corresponding movie titles
                const watchedList = await Promise.all(memberSubs.map(async (sub) => {
                    // Find the movie object that matches the MovieID in subscriptions
                    const movieId = sub.MovieID;
                    const movieResponse = await axios.get(`http://localhost:3000/movies/${movieId}`);
                    const movie = movieResponse.data;

                    return {
                        MovieTitle: movie ? movie.Name : 'Unknown Movie',
                        watchedDate: sub.Date
                    };
                }));

                setWatchedMovies(watchedList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchWatchedMovies();
    }, [memberId]);

    return (
        <div>
            <h5>Movies watched</h5>
            <button><a href="/addMemberSub/:id">Add a subscription</a></button>
            <ul>
                {watchedMovies.map((movie, index) => (
                    <li key={index}>
                        <strong>{movie.MovieTitle}</strong> - {movie.watchedDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MembersWatched;
