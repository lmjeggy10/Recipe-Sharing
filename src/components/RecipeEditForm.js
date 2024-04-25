import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeEditForm() {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState({ title: '', ingredients: '', instructions: '', prep_time: '', cook_time: '', image: '' });
    const [imageFile, setImageFile] = useState(null); // For handling image uploads
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/recipes/${id}/`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
                setError('Failed to fetch recipe details');
            });
    }, [id]);

    const handleChange = event => {
        setRecipe({ ...recipe, [event.target.name]: event.target.value });
    };

    const handleImageChange = event => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setRecipe({ ...recipe, image: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('ingredients', recipe.ingredients);
        formData.append('instructions', recipe.instructions);
        formData.append('prep_time', recipe.prep_time);
        formData.append('cook_time', recipe.cook_time);
        formData.append('image', imageFile);

        axios.put(`http://localhost:8000/recipes/${id}/`, formData)
          .then(response => {
            console.log('Recipe updated successfully:', response.data);
            navigate('/recipes/');
          })
          .catch(error => {
            console.error('Error updating recipe:', error);
            setError('Failed to update recipe');
          });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/recipes/${id}/`)
            .then(response => {
                console.log('Recipe deleted successfully');
                navigate('/recipes/');
            })
            .catch(error => {
                console.error('Error deleting recipe:', error);
                setError('Failed to delete recipe');
            });
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={recipe.title} onChange={handleChange} required />
                </label>
                <label>
                    Ingredients:
                    <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
                </label>
                <label>
                    Instructions:
                    <textarea name="instructions" value={recipe.instructions} onChange={handleChange} required />
                </label>
                <label>
                    Prep Time (minutes):
                    <input type="number" name="prep_time" value={recipe.prep_time} onChange={handleChange} required min="0" />
                </label>
                <label>
                    Cook Time (minutes):
                    <input type="number" name="cook_time" value={recipe.cook_time} onChange={handleChange} required min="0" />
                </label>
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {recipe.image && <img src={recipe.image} alt="Recipe" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                </label>
                <div style={{ marginTop: '20px' }}> {/* Add some space between buttons */}
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleDelete}>Delete Recipe</button>
                </div>
            </form>
        </div>
    );
}

export default RecipeEditForm;
