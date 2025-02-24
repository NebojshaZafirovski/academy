
fetch("https://dummyjson.com/recipes")
  .then(response => response.json())
  .then(data => {
    
    const recipes = data.recipes;
    console.log("All Recipes Data:", recipes);

    // All Dessert recipes.
    const desserts = recipes.filter(r => r.category && r.category.toLowerCase() === "dessert");
    console.log("Dessert Recipes:", desserts);

    // The names of recipes with more than 30 reviews.
    const namesWithMoreThan30Reviews = recipes
      .filter(r => r.reviews > 30)
      .map(r => r.title);
    console.log("Recipes with > 30 Reviews (Names):", namesWithMoreThan30Reviews);

    // Recipes that use Cinnamon as an ingredient.
    const recipesWithCinnamon = recipes.filter(r =>
      r.ingredients && r.ingredients.some(i => i.toLowerCase().includes("cinnamon"))
    );
    console.log("Recipes with Cinnamon:", recipesWithCinnamon);

    // Recipes that are served as both Lunch and Dinner.
    const lunchAndDinnerRecipes = recipes.filter(r =>
      r.mealTypes && r.mealTypes.includes("Lunch") && r.mealTypes.includes("Dinner")
    );
    console.log("Recipes Served as Lunch and Dinner:", lunchAndDinnerRecipes);

    // The ingredients needed for "Mango Salsa Chicken" dish.
    const mangoSalsaChicken = recipes.find(r => r.title === "Mango Salsa Chicken");
    if(mangoSalsaChicken) {
      console.log("Ingredients for Mango Salsa Chicken:", mangoSalsaChicken.ingredients);
    } else {
      console.log("Recipe 'Mango Salsa Chicken' not found.");
    }

    // The average number of calories for all American cuisine recipes.
    const americanRecipes = recipes.filter(r => 
      r.cuisine && r.cuisine.toLowerCase() === "american" && typeof r.calories === "number"
    );
    const avgCaloriesAmerican = americanRecipes.reduce((acc, r) => acc + r.calories, 0) / (americanRecipes.length || 1);
    console.log("Average Calories for American Cuisine:", avgCaloriesAmerican);

    //The average cooking time of all pasta recipes.
    const pastaRecipes = recipes.filter(r => 
      r.category && r.category.toLowerCase() === "pasta" && typeof r.cookingTime === "number"
    );
    const avgCookingTimePasta = pastaRecipes.reduce((acc, r) => acc + r.cookingTime, 0) / (pastaRecipes.length || 1);
    console.log("Average Cooking Time for Pasta Recipes:", avgCookingTimePasta);

    //Find the recipe with the lowest number of reviews.
    const lowestReviewsRecipe = recipes.reduce((min, r) => r.reviews < min.reviews ? r : min, recipes[0]);
    console.log("Recipe with the Lowest Number of Reviews:", lowestReviewsRecipe);
  })
  .catch(err => console.error("Error fetching recipes:", err));