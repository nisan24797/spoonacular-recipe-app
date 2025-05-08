import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeDetails } from "../api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoMealsIcon from "@mui/icons-material/NoMeals";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getRecipeDetails(id);
      setRecipe(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) return <Typography align="center">Recipe not found.</Typography>;

  return (
    <Box maxWidth="900px" mx="auto" mt={4} mb={6} px={2}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        aria-label="Go back to search results"
      >
        Back
      </Button>

      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={recipe.image}
          alt={`Image of ${recipe.title}`}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {recipe.title}
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
            {recipe.vegan && (
              <Chip icon={<NoMealsIcon />} label="Vegan" color="success" />
            )}
            {recipe.dairyFree && (
              <Chip icon={<NoMealsIcon />} label="Dairy-Free" color="warning" />
            )}
            {recipe.veryHealthy && (
              <Chip label="Very Healthy" color="primary" />
            )}
            {recipe.glutenFree && (
              <Chip label="Gluten-Free" color="secondary" />
            )}
            {recipe.readyInMinutes && (
              <Chip
                label={`Ready in ${recipe.readyInMinutes} mins`}
                variant="outlined"
              />
            )}
            {recipe.servings && (
              <Chip label={`Serves: ${recipe.servings}`} variant="outlined" />
            )}
          </Box>

          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <ul aria-labelledby="ingredients-heading">
            {recipe.extendedIngredients.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>

          <Typography variant="h6" gutterBottom mt={3}>
            Instructions
          </Typography>
          <Box
            aria-labelledby="instructions-heading"
            sx={{ mt: 1 }}
            dangerouslySetInnerHTML={{
              __html: recipe.instructions || "<i>No instructions provided.</i>",
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetail;
