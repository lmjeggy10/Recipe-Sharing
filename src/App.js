import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeCreateForm from './components/RecipeCreateForm';
import RecipeEditForm from './components/RecipeEditForm';
import './style.css'; // Import your CSS file for styling

function Navigation() {
    return (
        <nav className="nav"> {/* Apply the 'nav' class for styling */}
            <Link to="/">Home</Link>
            <Link to="/recipes/new/">New Recipe</Link>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <Navigation /> {/* Include the Navigation component */}
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/recipes/new/" element={<RecipeCreateForm />} />
                <Route path="/recipes/:id/edit" element={<RecipeEditForm />} />
                <Route path="/recipes/:id/" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
