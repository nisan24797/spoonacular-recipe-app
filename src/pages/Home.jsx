import React, { useState, useEffect } from "react";
import { searchRecipes } from "../api";
import SearchIcon from "@mui/icons-material/Search";
import RecipeFilter from "../components/RecipeFilter";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Skeleton,
  Container,
  Box,
} from "@mui/material";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [minServings, setMinServings] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");
  const [diet, setDiet] = useState("");

  const fetchRecipes = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setNoResults(false);
    const offset = currentPage * 5;
    try {
      const data = await searchRecipes(
        searchTerm,
        selectedCuisine,
        offset,
        minServings,
        maxReadyTime,
        diet
      );
      setRecipes(data.results);
      setTotalResults(data.totalResults);
      if (data.totalResults === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  return (
    <Container
      maxWidth="lg"
      className="home"
      role="main"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f5f7fa, #e0f7fa)",
        paddingTop: "40px",
        paddingBottom: "60px",
        borderRadius: "12px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <RestaurantIcon
          style={{
            fontSize: 50,
            color: "#ffffff",
            backgroundColor: "#ef5350",
            borderRadius: "50%",
            padding: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            marginBottom: 10,
          }}
        />
        <Typography
          variant="h3"
          gutterBottom
          style={{
            fontFamily: "'Pacifico', 'Playfair Display', serif",
            fontWeight: 700,
            color: "#1a237e",
            marginTop: 10,
          }}
        >
          Recipe Finder
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ fontStyle: "italic", maxWidth: 600, margin: "0 auto" }}
        >
          Discover delicious recipes by ingredients, time, and dietary needs!
        </Typography>
      </div>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 2,
          background: "linear-gradient(to right, #e3f2fd,rgb(192, 231, 246))",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          marginBottom: 3,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipes();
          }}
          aria-label="Recipe search form"
        >
          <div className="search-section">
            <div className="search-container">
              <TextField
                label="Enter Ingredients "
                variant="outlined"
                fullWidth
                required
                aria-label="Search recipes by keyword"
                size="small"
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2,
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
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchRecipes()}
              />
              <RecipeFilter
                selectedCuisine={selectedCuisine}
                setSelectedCuisine={setSelectedCuisine}
                minServings={minServings}
                setMinServings={setMinServings}
                maxReadyTime={maxReadyTime}
                setMaxReadyTime={setMaxReadyTime}
                diet={diet}
                setDiet={setDiet}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              aria-label="Search for recipes"
              onClick={fetchRecipes}
              disabled={loading || !searchTerm.trim()}
              className="search-button"
              style={{ textTransform: "none" }}
              startIcon={<SearchIcon />}
              size="large"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>
      </Box>
      {loading && !recipes.length && (
        <div className="loading-spinner">
          <CircularProgress size={50} color="primary" />
        </div>
      )}

      {noResults && !loading && (
        <Typography variant="h6" color="error" aria-live="polite">
          No recipes found for that searched item. Please try another search.
        </Typography>
      )}
      <div>
        {loading ? (
          <div className="recipe-container">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={345}
                    animation="wave"
                    height={200}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
            </Box>
          </div>
        ) : (
          <div className="recipe-container">
            {recipes.length > 0 && (
              <Typography variant="subtitle1" style={{ margin: "20px 0" }}>
                Showing {recipes.length} of {totalResults} recipes
              </Typography>
            )}
            <div className="recipe-card-container">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
      {totalResults > 5 && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={setCurrentPage}
        />
      )}
    </Container>
  );
};

export default Home;
