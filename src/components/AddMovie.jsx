import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddMovie = () => {
    const [formData, setFormData] = useState({
        Name: '',
        YearPremiered: '',
        Genres: '',
        imageURL: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert Genres string to array (assuming comma-separated input)
            const genresArray = formData.Genres.split(',').map(genre => genre.trim());
            const movieData = {
                ...formData,
                Genres: genresArray
            };
            await axios.post('http://localhost:3000/movies', movieData);
            alert('Movie added successfully!');
            // Redirect to movies list
            window.location.href = '/movies';
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie. Please try again.'); // Inform user about the error
        }
    };

    return (
        <div>
            <h3>Add Movie</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Year Premiered:
                    <input
                        type="text"
                        name="YearPremiered"
                        value={formData.YearPremiered}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Genres (comma-separated):
                    <input
                        type="text"
                        name="Genres"
                        value={formData.Genres}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <div>
                    <button type="submit" style={{ marginRight: '10px' }}>Save</button>
                    <Link to="/movies">
                        <button type="button">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddMovie;
