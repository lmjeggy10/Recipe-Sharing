import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        axios.get('http://localhost:8000/recipes/')
            .then(response => {
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div>
            <nav className="nav"> {/* Apply the 'nav' class for styling */}
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </nav>
            {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeList;
