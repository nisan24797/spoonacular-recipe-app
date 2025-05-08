import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";

const RecipeFilter = ({
  selectedCuisine,
  setSelectedCuisine,
  minServings,
  setMinServings,
  maxReadyTime,
  setMaxReadyTime,
  diet,
  setDiet,
}) => {
  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  const cuisines = [
    "",
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const inputStyle = {
    minWidth: 230,
    borderRadius: 2,
    backgroundColor: "#f9f9f9",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#90caf9",
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: "#42a5f5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1e88e5",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        "& > *": {
          flex: {
            xs: "1 1 100%",
            sm: "1 1 100%",
            md: 200,
          },
          mt: {
            sm: 2,
          },
        },
      }}
    >
      {/* Cuisine Selector */}
      <FormControl size="small" sx={inputStyle} md={{ minWidth: "200" }}>
        <InputLabel id="cuisine-label">Cuisine</InputLabel>
        <Select
          labelId="cuisine-label"
          id="cuisine-select"
          value={selectedCuisine}
          label="Cuisine"
          onChange={handleCuisineChange}
        >
          {cuisines.map((cuisine, index) => (
            <MenuItem key={index} value={cuisine}>
              {cuisine === "" ? "All Cuisines" : cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Min Servings */}
      <TextField
        label="Min Servings"
        type="number"
        value={minServings}
        onChange={(e) => setMinServings(e.target.value)}
        size="small"
        sx={inputStyle}
        inputProps={{ min: 1 }}
      />

      {/* Max Ready Time */}
      <TextField
        label="Max Ready Time (mins)"
        type="number"
        value={maxReadyTime}
        onChange={(e) => setMaxReadyTime(e.target.value)}
        size="small"
        sx={inputStyle}
        inputProps={{ min: 1 }}
      />

      {/* Diet */}
      <FormControl size="small" sx={inputStyle}>
        <InputLabel id="diet-label">Diet</InputLabel>
        <Select
          labelId="diet-label"
          value={diet}
          label="Diet"
          onChange={(e) => setDiet(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="vegetarian">Vegetarian</MenuItem>
          <MenuItem value="vegan">Vegan</MenuItem>
          <MenuItem value="gluten free">Gluten Free</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RecipeFilter;
