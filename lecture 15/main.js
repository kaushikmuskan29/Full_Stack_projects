const apiKey = "f5c4e809aec34782942fe588fdf3dbe4";

    async function searchRecipe() {
      const recipeName = document.getElementById("recipeInput").value.trim();
      const resultDiv = document.getElementById("result");

      if (!recipeName) {
        resultDiv.innerHTML = "<p>Please enter a recipe name.</p>";
        return;
      }

      resultDiv.innerHTML = "<p>Loading...</p>";

      const originalURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipeName}&number=1&addRecipeInformation=true&fillIngredients=true`;
      const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalURL)}`;

      try {
        const response = await fetch(proxyURL);
        if (!response.ok) throw new Error("Proxy or API error");

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          resultDiv.innerHTML = "<p>No recipes found for that search term.</p>";
          return;
        }

        const recipe = data.results[0];
        localStorage.setItem(recipe.title, JSON.stringify(recipe));
        displayRecipe(recipe);
      } catch (err) {
        resultDiv.innerHTML = "<p>Failed to fetch recipe. Try again later.</p>";
      }
    }

    function displayRecipe(recipe) {
      const resultDiv = document.getElementById("result");

      const {
        title = "No Title",
        image = "",
        readyInMinutes = "N/A",
        servings = "N/A",
        healthScore = "N/A",
        summary = "No summary available.",
        extendedIngredients = [],
        sourceUrl = "#"
      } = recipe;

      resultDiv.innerHTML = `
        <div class="recipe-card">
          <h2>${title}</h2>
          <img src="${image}" alt="${title}" />
          <div class="details">
            <div>⏱<br>${readyInMinutes} min</div>
            <div>👥<br>${servings} people</div>
            <div>⭐<br>${healthScore}/100</div>
          </div>
          <p>${summary.replace(/<[^>]*>/g, "").slice(0, 200)}...</p>
          <h3>Ingredients</h3>
          <ul>
            ${extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}
          </ul>
          <a href="${sourceUrl}" target="_blank">View Full Recipe</a>
        </div>
      `;
    }

    window.addEventListener("DOMContentLoaded", () => {
      const savedRecipe = localStorage.getItem("lastRecipe");
      if (savedRecipe) {
        displayRecipe(JSON.parse(savedRecipe));
      }
    });