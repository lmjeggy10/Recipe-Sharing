// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value); // Pass the search query to the parent component
    };

    return (
        <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={handleChange}
        />
    );
}

export default SearchBar;
