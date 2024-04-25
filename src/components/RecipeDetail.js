import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = useParams();

    useEffect(() => {
        // Fetch recipe details on component mount
        axios.get(`http://localhost:8000/recipes/${id}/`)
            .then(response => {
                setRecipe(response.data);
                setLoading(false); // Update loading state
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
                setLoading(false); // Update loading state in case of error
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Recipe not found.</div>; // Handle case where recipe is not found
    }

    // Construct the image path without the extra '/media' prefix
    const imagePath = recipe.image.startsWith('/media/') ? recipe.image.slice(7) : recipe.image;

    return (
        <div>
            {/* Container for image and recipe details */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {/* Image */}
                <img src={imagePath} alt={recipe.title} style={{ maxWidth: '40%', maxHeight: '400px' }} />

                {/* Recipe details */}
                <div style={{ marginLeft: '20px' }}>
                    <h2>{recipe.title}</h2>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                    <p>Prep Time: {recipe.prep_time}</p>
                    <p>Cook Time: {recipe.cook_time}</p>
                    {/* Render other fields as necessary */}
                </div>
            </div>

            {/* "Edit Recipe" button */}
            <Link to={`/recipes/${id}/edit`} style={{ textDecoration: 'none', marginRight: '10px' }}>
                <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit Recipe</button>
            </Link>
        </div>
    );
}

export default RecipeDetail;
