import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecipeCreateForm() {
    const [recipe, setRecipe] = useState({ title: '', ingredients: '', instructions: '', prep_time: '', cook_time: '', image: '' });
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

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

        axios.post('http://localhost:8000/recipes/', formData)
          .then(response => {
            console.log('Recipe created successfully:', response.data);
            navigate('/recipes/');
          })
          .catch(error => {
            console.error('Error creating recipe:', error);
          });
    };

    return (
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
            </label>
            <button type="submit">Create Recipe</button>
        </form>
    );
}

export default RecipeCreateForm;
