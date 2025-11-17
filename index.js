const byIngredientsButton = document.getElementById("by-ingredients");
const byCuisineButton = document.getElementById("by-cuisine");
const dietaryRestrictionsButton = document.getElementById("dietary-restrictions");
const recipeResultsHeader = document.querySelector(".recipe-results-header");
const findRecipesButton = document.getElementById("find-recipes-button");
let valueTextInByIngredientSearchForm = document.getElementById("find-recipes");
let activeSearchType = "ingredient";

// Ingredient buttons
const ingredients = ["chicken", "pasta", "tomato", "cheese", "garlic"].map(
  (i) => document.getElementById(`ingredient-${i}`));
  console.log("Ingredients: ", ingredients);

// Cuisine buttons
const cuisines = [
  "italian",
  "mexican",
  "asian",
  "american",
  "indian",
  "mediterranean",
].map((c) => document.getElementById(`cuisine-${c}`));

// Dietary buttons
const dietaries = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
].map((d) => document.getElementById(`dietary-${d}`));

// API Key Storage
const apiKeyEntry = document.getElementById("apiKeyEntry");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
let userApiKey = localStorage.getItem("spoonacularApiKey") || "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (userApiKey) {
  apiKeyEntry.style.display = "none";
}

function storeApiKey() {
  const key = apiKeyInput.value.trim();
  console.log("key: ", key);
  if (!key) {
    alert("Please enter your Spoonacular API key.");
    return;
  }

  userApiKey = key;
  console.log("userApiKey: ", userApiKey);
  localStorage.setItem("spoonacularApiKey", key);
  apiKeyEntry.style.display = "none";

  //   apiKeyEntry.addEventListener(
  //     "transitionend",
  //     () => {
  //       apiKeyEntry.style.display = "none";
  //     },
  //     {
  //       once: true,
  //     }
  //   );
  //   apiKeyEntry.classList.add("hidden");
}

saveApiKeyBtn.addEventListener("click", storeApiKey);

// Favorites Variables
let favoritesCount = 0;
const favoritesCountElement = document.getElementById("favoritesCount");
const favoriteRecipesHeader = document.querySelector(".favorite-recipes-header");
const favoriteRecipesSection = document.querySelector(".favorite-recipes");

// Load favorites from local storage
document.addEventListener("DOMContentLoaded", loadFavoritesFromLocalStorage);

function loadFavoritesFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoritesCount = Number(localStorage.getItem("favoritesCount")) || 0;
  favoritesCountElement.textContent = favoritesCount;
  favoriteRecipesHeader.style.display = favoritesCount > 0 ? "block" : "none";


  favorites.forEach((meal) => {
    addToFavorites(meal);
  });
}

// Save favorites to local storage
function saveFavoritesToLocalStorage() {
  const favorites = [
    ...favoriteRecipesSection.querySelectorAll(".recipe-card"),
  ].map((card) => ({
    id: card.dataset.id,
    title: card.querySelector("h5").textContent,
    image: card.querySelector("img").src,
    readyInMinutes: Number(card.dataset.minutes),
    servings: Number(card.dataset.servings),
    calories: Number(card.dataset.calories),
    healthScore: Number(card.dataset.healthscore),
  }));

  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("favoritesCount", favorites.length);
}


// Add Favorite Card
function addToFavorites(meal, countUpdate = true) {
  // Prevent duplicates
  if (document.getElementById(`favorite-${meal.id}`)) {
    return;
  }

  const calories =
    meal.calories ||
    Math.floor(
      meal.nutrition?.nutrients?.find((n) => n.name === "Calories")?.amount || 0
    );

    const healthScore =
      meal.healthScore ||
      meal.nutrition?.nutrients?.find((n) => n.name === "Health Score")
        ?.amount ||
      meal.healthScore ||
      0;

  const div = document.createElement("div");
  div.classList.add("card", "recipe-card");
  div.id = `favorite-${meal.id}`;
  div.dataset.id = meal.id;
  div.dataset.minutes = meal.readyInMinutes || 0;
  div.dataset.servings = meal.servings || 1;
  div.dataset.calories = calories;
  div.dataset.healthscore = healthScore;

  div.innerHTML = `
        <img src=${meal.image} alt=${meal.title} width="312" height="231"/>
        <h5>${meal.title}</h5>
        <div class="recipe-card-info">
            <p><i class="fa-solid fa-clock"></i>${
              meal.readyInMinutes
            } minutes</p>
            <p><i class="fa-solid fa-people-group"></i>${
              meal.servings
            } servings</p>
            <p><i class="fa-solid fa-weight-scale"></i>${calories} calories</p>
            <p><i class="fa-solid fa-notes-medical"></i>${healthScore
            } / 100</p>
            <div class="favorite-and-view-recipe">
            <button class="remove-favorite-btn"><i class="fa-solid fa-xmark"></i>Remove</button>
            <button class="view-recipe-btn"><i class="fa-solid fa-eye"></i>View</button>
            </div>
        </div>
    `;

  const removeFavBtn = div.querySelector(".remove-favorite-btn");
  removeFavBtn.addEventListener("click", () => {
    const cardHeart = document.querySelector(
      `.recipe-results [data-id="${meal.id}"] .fa-heart`
    );
    
    syncFavoriteState(meal);

    favoritesCountElement.textContent = favoritesCount;

    if (favoritesCount === 0) {
      favoriteRecipesHeader.style.display = "none";
    }
  });

  const viewBtn = div.querySelector(".view-recipe-btn");
  viewBtn.addEventListener("click", () => openRecipeModal(meal));

  favoriteRecipesSection.appendChild(div);
  if (countUpdate) {
    saveFavoritesToLocalStorage();
  }
}

// Remove favorite card
function removeFromFavorites(mealId) {
  const card = document.getElementById(`favorite-${mealId}`);
  if (card) {
    card.remove();
  }

  favoritesCountElement.textContent = favoritesCount;

  favoriteRecipesHeader.style.display = favoritesCount > 0 ? "block" : "none";
  saveFavoritesToLocalStorage();
}

// GET RECIPES FUNCTION WILL NEED TO GO HERE
async function getRecipes({ type, value }) {
  if (!userApiKey) {
    alert("Please enter your Spoonacular API key first.");
    return;
  }

  if (!value) {
    alert("Please enter or select a search term.");
    return;
  }

  let endpoint = "";
  let url = "";

  switch (type) {
    case "ingredient":
      endpoint = "findByIngredients";
      url = `https://api.spoonacular.com/recipes/${endpoint}?ingredients=${encodeURIComponent(
        value
      )}&number=12&addRecipeNutrition=true&apiKey=${userApiKey}`;
      break;
    case "cuisine":
      endpoint = "complexSearch";
      url = `https://api.spoonacular.com/recipes/${endpoint}?cuisine=${encodeURIComponent(
        value
      )}&number=12&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${userApiKey}`;
      break;
    case "dietary":
      endpoint = "complexSearch";
      url = `https://api.spoonacular.com/recipes/${endpoint}?diet=${encodeURIComponent(
        value
      )}&number=12&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${userApiKey}`;
      break;
    default:
        console.error("Unknown recipe type:", type);
  }

  try {
    await sleep(1200);
    recipeResultsHeader.style.display = "block";
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Recipes found: ", jsonResponse);
      const results = type === "ingredient" ? jsonResponse : jsonResponse.results;

      if (type === "ingredient")
      {
        const detailed = await Promise.all(results.map(m => fetch(`https://api.spoonacular.com/recipes/${m.id}/information?includeNutrition=true&apiKey=${userApiKey}`).then(r => r.json())));
        displayRecipes(detailed);
      }
      else
      {
        displayRecipes(results);
      }
    }
  } catch (error) {
    console.log(error);
    alert("Failed to fetch recipes. Please check API key or try again tomorrow.");
  }
}

function syncFavoriteState(meal) {
  // Find the card heart (recipe results)
  const cardHeart = document.querySelector(
    `.recipe-results [data-id="${meal.id}"] .fa-heart`
  );

  // Find modal heart if modal is open
  const modalHeart = document.querySelector("#modalBody .fa-heart");

  const isAlreadyFavorite = document.getElementById(`favorite-${meal.id}`);


  if (isAlreadyFavorite) {
    // REMOVE FAVORITE
    removeFromFavorites(meal.id);
    favoritesCount--;
    favoritesCountElement.textContent = favoritesCount;

    // Update visual states
    if (cardHeart) {
      cardHeart.classList.remove("fa-solid");
      cardHeart.classList.add("fa-regular");
    }
    if (modalHeart) {
      modalHeart.classList.remove("fa-solid");
      modalHeart.classList.add("fa-regular");
    }
  } else {
    // ADD FAVORITE
    addToFavorites(meal);
    favoritesCount++;
    favoritesCountElement.textContent = favoritesCount;

    // Update visual states
    if (cardHeart) {
      cardHeart.classList.remove("fa-regular");
      cardHeart.classList.add("fa-solid");
    }
    if (modalHeart) {
      modalHeart.classList.remove("fa-regular");
      modalHeart.classList.add("fa-solid");
    }
  }

  favoriteRecipesHeader.style.display = favoritesCount > 0 ? "block" : "none";
  saveFavoritesToLocalStorage();
}



// Display Recipes
function displayRecipes(results) {
  const recipeResultsSection = document.querySelector(".recipe-results");
  recipeResultsSection.innerHTML = "";
  const recipesCount = document.getElementById("recipesFoundCount");
  recipesCount.textContent = results.length;

  if (!results || results.length === 0) {
    recipeResultsSection.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  results.forEach((meal) => {

    const title = meal.title || "Untitled Recipe";
    const image =
      meal.image || "https://via.placeholder.com/312x231?text=No+Image";

    const readyIn = meal.readyInMinutes || "N/A";
    const servings = meal.servings || "N/A";
    const healthScore = meal.healthScore ?? "N/A";
    const calories = Math.floor(
      meal?.nutrition?.nutrients?.find((n) => n.name === "Calories")?.amount ||
        0
    );

    // Create recipe card
    const div = document.createElement("div");
    div.classList.add("recipe-card");
    div.dataset.id = meal.id;
    div.dataset.minutes = readyIn;
    div.dataset.servings = servings;
    div.dataset.calories = calories;
    div.dataset.healthscore = healthScore;

    div.innerHTML = `
        <img src=${image} alt=${title} width="312" height="231"/>
        <h5>${title}</h5>
        <div class="recipe-card-info">
            <p><i class="fa-solid fa-clock"></i>${readyIn} minutes</p>
            <p><i class="fa-solid fa-people-group"></i>${servings} servings</p>
            <p><i class="fa-solid fa-weight-scale"></i>${calories} calories</p>
            <p><i class="fa-solid fa-notes-medical"></i>${healthScore} / 100</p>
            <div class="favorite-and-view-recipe">
                <i class="fa-regular fa-heart" data-id="${meal.id}"></i>
                <button class="view-recipe-btn"><i class="fa-solid fa-eye"></i>View Recipe</button>
            </div>
        </div>
        `;

    const heart = div.querySelector(".fa-heart");
    const viewButton = div.querySelector(".view-recipe-btn");

    heart.addEventListener("click", () => {
      syncFavoriteState(meal);
    });

    viewButton.addEventListener("click", () => {
      openRecipeModal(meal);
    });

    recipeResultsSection.appendChild(div);
  });
}

// Open Recipe Modal
async function openRecipeModal(meal) {
  const modal = document.getElementById("recipeModal");
  const modalBody = document.getElementById("modalBody");

  let fullMeal = meal;
  if (!meal.extendedIngredients)
  {
    try
    {
        const response = await fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?includeNutrition=true&apiKey=${userApiKey}`);

        if (response.ok)
        {
            fullMeal = await response.json();
        }
        else
        {
            console.error("Failed to fetch full recipe info");
        }
    }
    catch (error)
    {
        console.error("Error fetching full recipe info: ", error);
    }
  }

  const ingredientList = fullMeal.extendedIngredients
    ? fullMeal.extendedIngredients.map((i) => `<li>${i.original}</li>`).join("")
    : "<li>No ingredients listed.</li>";

    const isFav = document.getElementById(`favorite-${meal.id}`) !== null;

  modalBody.innerHTML = `
        <div class="modal-header">
          <h2>${fullMeal.title}</h2>
          <div class="modal-header-buttons">
            <button id="favoriteButton">
              <i class="${
                isFav ? "fa-solid" : "fa-regular"
              } fa-heart pop-up-button"></i>
              Favorite
            </button>
            <button id="closeModal">
              <i class="fa-solid fa-xmark pop-up-button"></i>Close
            </button>
          </div>
        </div>
        <div class="modal-image-info">
          <img src="${fullMeal.image}" alt="${
    fullMeal.title
  }" width="312" height="231" />
          <div class="info-paragraphs">
            <p>Prep/Cook: ${fullMeal.readyInMinutes} minutes</p>
            <p>Serves: ${fullMeal.servings} people</p>
            <p>Calories: ${Math.floor(
              fullMeal.nutrition?.nutrients.find((n) => n.name === "Calories")
                .amount
            )}</p>
            <p>Health Score: ${fullMeal.healthScore} / 100</p>
          </div>
        </div>
        <div class="modal-ingredients-instructions">
          <div class="modal-ingredients-div-ingredients">
            <h4>Ingredients</h4>
            <ul>${ingredientList}</ul>
          </div>
          <div class="modal-ingredients-div-instructions">
            <h4>Recipe Summary</h4>
            <p>${fullMeal.summary || "No summary available."}</p>
          </div>
        </div>
    `;

    const modalHeart = modalBody.querySelector(".fa-heart");
    const favoriteButton = modalBody.querySelector("#favoriteButton");
    const isAlreadyFavorite = document.getElementById(`favorite-${meal.id}`) !== null;

    favoriteButton.addEventListener("click", () =>
    {
        syncFavoriteState(meal);
    });

    modalHeart.addEventListener("click", () => {
        syncFavoriteState(meal);
    });

    const closeModalBtn = document.getElementById("closeModal");

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
  });

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  modal.style.display = "block";
}

function addInput(event) {
  const ingredient = event.target.textContent.trim();
  valueTextInByIngredientSearchForm.value = ingredient;
}

function displayByIngredients() {
    activeSearchType = "ingredient";
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");

  ingredientRow.style.display = "block";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "none";

  byIngredientsButton.classList.add("find-recipe-button-active");
  byCuisineButton.classList.remove("find-recipe-button-active");
  dietaryRestrictionsButton.classList.remove("find-recipe-button-active");

  //   valueTextInByIngredientSearchForm.value = "";
}

function displayByCuisine() {
    activeSearchType = "cuisine";
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");

  ingredientRow.style.display = "none";
  cuisineRow.style.display = "flex";
  dietaryRow.style.display = "none";

  byIngredientsButton.classList.remove("find-recipe-button-active");
  byCuisineButton.classList.add("find-recipe-button-active");
  dietaryRestrictionsButton.classList.remove("find-recipe-button-active");
}

function displayByDietary() {
    activeSearchType = "dietary";
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");

  ingredientRow.style.display = "none";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "flex";

  byIngredientsButton.classList.remove("find-recipe-button-active");
  byCuisineButton.classList.remove("find-recipe-button-active");
  dietaryRestrictionsButton.classList.add("find-recipe-button-active");
}

byIngredientsButton.addEventListener("click", displayByIngredients);
byCuisineButton.addEventListener("click", displayByCuisine);
dietaryRestrictionsButton.addEventListener("click", displayByDietary);
findRecipesButton.addEventListener("click", () => {
  getRecipes({
    type: "ingredient",
    value: valueTextInByIngredientSearchForm.value,
  });
});

ingredients.forEach((btn) => {
  btn.addEventListener("click", addInput);
});

cuisines.forEach((btn) =>
  btn.addEventListener("click", () =>
    getRecipes({ type: "cuisine", value: btn.id.split("-")[1] })
  )
);
dietaries.forEach((btn) =>
  btn.addEventListener("click", () =>
    getRecipes({ type: "dietary", value: btn.id.split("-")[1] })
  )
);

document.addEventListener("DOMContentLoaded", () => {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  byIngredientsButton.classList.add("find-recipe-button-active");
  ingredientRow.style.display = "block";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "none";
  valueTextInByIngredientSearchForm.value = "";
  displayByIngredients();
  recipeResultsHeader.style.display = "none";
  if (favoritesCount === 0) {
    favoriteRecipesHeader.style.display = "none";
  }
});


// function getRecipesByIngredient() {
//   const value = valueTextInByIngredientSearchForm.value.trim();
//   getRecipes({ type: "ingredient", value });
// }

// function getRecipesByCuisine(cuisine) {
//   getRecipes({ type: "cuisine", value: cuisine });
// }

// function getRecipesByDietary(diet) {
//   getRecipes({ type: "dietary", value: diet });
// }

// chicken.addEventListener("click", addInput);
// pasta.addEventListener("click", addInput);
// tomato.addEventListener("click", addInput);
// cheese.addEventListener("click", addInput);
// garlic.addEventListener("click", addInput);

// const cuisineButtons = document.querySelectorAll(
//   ".find-recipes-cuisine-row button"
// );

// function setActiveCuisine(cuisineChoice) {
//   cuisineButtons.forEach((btn) => {
//     btn.classList.toggle(
//       "find-recipes-cuisine-row-button-active",
//       btn.id === `cuisine-${cuisineChoice}`
//     );
//   });
// }

// const dietaryButtons = document.querySelectorAll(
//   ".find-recipes-dietary button"
// );

// function setActiveDietary(dietaryChoice) {
//   dietaryButtons.forEach((btn) => {
//     btn.classList.toggle(
//       "find-recipes-dietary-button-active",
//       btn.id === `dietary-${dietaryChoice}`
//     );
//   });
// }
