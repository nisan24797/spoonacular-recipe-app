import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      <img
        src={recipe.image}
        alt={`Image of ${recipe.title}`}
        className="rounded animate__animated animate__fadeInUp"
      />
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{
          fontSize: {
            xs: "1.8rem",
            sm: "2.4rem",
            md: "3rem",
          },
        }}
      >
        {recipe.title}
      </Typography>
    </div>
  );
};

export default RecipeCard;
