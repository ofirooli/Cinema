import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Watched from './watched'; // Import the Watched component

const MovieItem = ({ movie, handleDelete }) => {
    const handleDeleteClick = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${movie.Name}?`);
        if (confirmDelete) {
            handleDelete(movie._id);
        }
    };

    return (
        <div style={{ display: 'flex', border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <div style={{ marginRight: '20px', flex: '1' }}>
                <h4>{movie.Name}</h4>
                <p><strong>Year Premiered:</strong> {movie.YearPremiered}</p>
                <p><strong>Genres:</strong> {Array.isArray(movie.Genres) ? movie.Genres.join(', ') : ''}</p>
                <img
                    src={movie.imageUrl}
                    alt={`${movie.Name} Poster`}
                    style={{ width: '200px', height: 'auto', marginBottom: '10px' }}
                />
                <div>
                    <Link to={`/editMovie/${movie._id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={handleDeleteClick} style={{ marginLeft: '10px' }}>Delete</button>
                </div>
            </div>
            <div style={{ flex: '1', border: '1px solid black', padding: '10px' }}>
                <Watched movieId={movie._id} /> {/* Pass movieId to Watched component */}
            </div>
        </div>
    );
};

export default MovieItem;
