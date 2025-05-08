import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
