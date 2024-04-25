import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    // Construct the image path without the extra '/media' prefix
    const imagePath = recipe.image.startsWith('/media/') ? recipe.image.slice(7) : recipe.image;

    return (
        <div className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
                <img src={imagePath} alt={recipe.title} />
            </Link>
            <div>
                <Link to={`/recipes/${recipe.id}`}>
                    <h2>{recipe.title}</h2>
                </Link>
                <p>{recipe.ingredients}</p>
                <p>Cook Time: {recipe.cook_time} minutes</p>
                <p>Prep Time: {recipe.prep_time} minutes</p>
                {/* Add more fields as necessary */}
            </div>
        </div>
    );
}

export default RecipeCard;
