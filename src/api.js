import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (
  query,
  cuisine = "",
  offset = 0,
  minServings = "",
  maxReadyTime = "",
  diet = ""
) => {
  const params = {
    query,
    number: 5,
    offset: Number(offset),
    apiKey: API_KEY,
  };

  if (cuisine) params.cuisine = cuisine;
  if (minServings) params.minServings = Number(minServings);
  if (maxReadyTime) params.maxReadyTime = Number(maxReadyTime);
  if (diet) params.diet = diet; 
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}/information`, {
    params: {
      apiKey: API_KEY,
    },
  });
  return response.data;
};
