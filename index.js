const apiKeyEntry = document.getElementById("apiKeyEntry");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
let userApiKey = localStorage.getItem("spoonacularApiKey") || "";

let favoritesCountElement = document.getElementById("favoritesFoundCount");
let favoritesCount = 0;

const byIngredientsButton = document.getElementById("by-ingredients");
const byCuisineButton = document.getElementById("by-cuisine");
const dietaryRestrictionsButton = document.getElementById(
  "dietary-restrictions"
);
const generalSearchButton = document.getElementById("general-search");
const valueTextInGenSearchForm = document.getElementById("find-recipes-gen");
const valueTextInByIngredientSearchForm =
  document.getElementById("find-recipes");
const chicken = document.getElementById("ingredient-chicken");
const pasta = document.getElementById("ingredient-pasta");
const tomato = document.getElementById("ingredient-tomato");
const cheese = document.getElementById("ingredient-cheese");
const garlic = document.getElementById("ingredient-garlic");
const italianButton = document.getElementById("cuisine-italian");
const mexicanButton = document.getElementById("cuisine-mexican");
const asianButton = document.getElementById("cuisine-asian");
const americanButton = document.getElementById("cuisine-american");
const indianButton = document.getElementById("cuisine-indian");
const mediterraneanButton = document.getElementById("cuisine-mediterranean");
const recipeResultsHeader = document.querySelector(".recipe-results-header");
const findRecipesButton = document.getElementById("find-recipes-button");

byIngredientsButton.addEventListener("click", displayByIngredients);
byCuisineButton.addEventListener("click", displayByCuisine);
dietaryRestrictionsButton.addEventListener("click", displayByDietary);
generalSearchButton.addEventListener("click", displayByGeneral);
valueTextInGenSearchForm.addEventListener("click", clearInput);
findRecipesButton.addEventListener("click", getRecipesByIngredient);
chicken.addEventListener("click", addInput);
pasta.addEventListener("click", addInput);
tomato.addEventListener("click", addInput);
cheese.addEventListener("click", addInput);
garlic.addEventListener("click", addInput);
italianButton.addEventListener("click", () => getRecipesByCuisine("italian"));
mexicanButton.addEventListener("click", () => getRecipesByCuisine("mexican"));
asianButton.addEventListener("click", () => getRecipesByCuisine("asian"));
americanButton.addEventListener("click", () => getRecipesByCuisine("american"));
indianButton.addEventListener("click", () => getRecipesByCuisine("indian"));
mediterraneanButton.addEventListener("click", () => getRecipesByCuisine("mediterranean"));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (userApiKey)
{
    apiKeyEntry.style.display = "none";
}

function storeApiKey()
{
    const key = apiKeyInput.value.trim();
    console.log("key: ", key);
    if (!key)
    {
        alert("Please enter your Spoonacular API key.");
        return;
    }

    userApiKey = key;
    console.log("userApiKey: ", userApiKey);
    localStorage.setItem("spoonacularApiKey", key);
    apiKeyEntry.style.display = "block";

    apiKeyEntry.addEventListener("transitionend", () =>
    {
        apiKeyEntry.style.display = "none";
    }, 
    {
        once: true
    });
    apiKeyEntry.classList.add("hidden");
}

saveApiKeyBtn.addEventListener("click", storeApiKey);

function displayByIngredients() {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  const generalRow = document.querySelector(".find-recipes-general");

  byIngredientsButton.classList.add("find-recipe-button-active");
  byCuisineButton.classList.remove("find-recipe-button-active");
  dietaryRestrictionsButton.classList.remove("find-recipe-button-active");
  generalSearchButton.classList.remove("find-recipe-button-active");

  ingredientRow.style.display = "block";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "none";
  generalRow.style.display = "none";

  valueTextInByIngredientSearchForm.value = "";
}

function displayByCuisine() {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  const generalRow = document.querySelector(".find-recipes-general");

  byIngredientsButton.classList.remove("find-recipe-button-active");
  byCuisineButton.classList.add("find-recipe-button-active");
  dietaryRestrictionsButton.classList.remove("find-recipe-button-active");
  generalSearchButton.classList.remove("find-recipe-button-active");

  ingredientRow.style.display = "none";
  cuisineRow.style.display = "flex";
  dietaryRow.style.display = "none";
  generalRow.style.display = "none";
}

function displayByDietary() {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  const generalRow = document.querySelector(".find-recipes-general");

  byIngredientsButton.classList.remove("find-recipe-button-active");
  byCuisineButton.classList.remove("find-recipe-button-active");
  dietaryRestrictionsButton.classList.add("find-recipe-button-active");
  generalSearchButton.classList.remove("find-recipe-button-active");

  ingredientRow.style.display = "none";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "flex";
  generalRow.style.display = "none";
}

function displayByGeneral() {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  const generalRow = document.querySelector(".find-recipes-general");

  byIngredientsButton.classList.remove("find-recipe-button-active");
  byCuisineButton.classList.remove("find-recipe-button-active");
  dietaryRestrictionsButton.classList.remove("find-recipe-button-active");
  generalSearchButton.classList.add("find-recipe-button-active");

  ingredientRow.style.display = "none";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "none";
  generalRow.style.display = "flex";

  valueTextInForm.value =
    "Search for any recipe (e.g. chocolate cake, beef stew, etc.)";
  valueTextInForm.style.color = "rgb(187, 185, 185)";
}

document.addEventListener("DOMContentLoaded", () => {
  const ingredientRow = document.querySelector(".find-recipes-ingredient-row");
  const cuisineRow = document.querySelector(".find-recipes-cuisine-row");
  const dietaryRow = document.querySelector(".find-recipes-dietary");
  const generalRow = document.querySelector(".find-recipes-general");
  byIngredientsButton.classList.add("find-recipe-button-active");
  ingredientRow.style.display = "block";
  cuisineRow.style.display = "none";
  dietaryRow.style.display = "none";
  generalRow.style.display = "none";
  valueTextInByIngredientSearchForm.value = "";
  recipeResultsHeader.style.display = "none";
});

function clearInput() {
  valueTextInForm.value = "";
  valueTextInForm.style.color = "black";
}

function addInput(event) {
  const ingredient = event.target.textContent.trim();
  valueTextInByIngredientSearchForm.value = ingredient;
}

async function getRecipesByIngredient() {
  const ingredient = valueTextInByIngredientSearchForm.value.trim();

  if (!ingredient) {
    alert("Please enter or select an ingredient first.");
    return;
  }

  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;

  const searchParam = new URLSearchParams({
    query: ingredient,
    addRecipeInformation: true,
    addRecipeNutrition: true,
    number: 12,
    apiKey: userApiKey
  });
  console.log("searchParam: ", searchParam);
  const url = `${baseUrl}?${searchParam.toString()}`;

  console.log("Fetching from: ", url);

  try {
    await sleep(1200);
    recipeResultsHeader.style.display = "block";
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Recipes found: ", jsonResponse);
      displayRecipesByIngredient(jsonResponse.results);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayRecipesByIngredient(results) {
  const recipeResultsSection = document.querySelector(".recipe-results");
  recipeResultsSection.innerHTML = "";
  const recipesCount = document.getElementById("recipesFoundCount");
  recipesCount.innerHTML = results.length;

  if (!results || results.length === 0) {
    recipeResultsSection.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  const modal = document.getElementById("recipeModal");
  const modalBody = document.getElementById("modalBody");

  results.forEach((meal) => {
    // Create recipe card
    const div = document.createElement("div");
    div.classList.add("recipe-card");
    div.innerHTML = `
      <img src=${meal.image} alt=${meal.title} width="312" height="231"/>
      <h5>${meal.title}</h5>
      <div class="recipe-card-info">
        <p><i class="fa-solid fa-clock"></i>${meal.readyInMinutes} minutes</p>
        <p><i class="fa-solid fa-people-group"></i>${meal.servings} servings</p>
        <p><i class="fa-solid fa-weight-scale"></i>${Math.floor(
          meal.nutrition.nutrients.find((n) => n.name === "Calories").amount
        )} calories</p>
        <p><i class="fa-solid fa-notes-medical"></i>${
          meal.healthScore
        } / 100</p>
        <div class="favorite-and-view-recipe">
          <i class="fa-regular fa-heart"></i>
          <button class="view-recipe-btn"><i class="fa-solid fa-eye"></i>View Recipe</button>
        </div>
      </div>
    `;

    // Select elements
    const favoriteHeart = div.querySelector(".fa-heart");
    const viewButton = div.querySelector(".view-recipe-btn");

    // Toggle function
    function toggleFavorite(element) {
      const isFavorited = element.classList.toggle("fa-solid");
      element.classList.toggle("fa-regular", !isFavorited);
      favoritesCount += isFavorited ? 1 : -1;
      favoritesCountElement.textContent = favoritesCount;

      // Sync the other heart if it exists
      if (element === favoriteHeart && modal.querySelector(".fa-heart")) {
        const modalHeart = modal.querySelector(".fa-heart");
        modalHeart.classList.toggle("fa-solid", isFavorited);
        modalHeart.classList.toggle("fa-regular", !isFavorited);
      }
      if (element !== favoriteHeart) {
        favoriteHeart.classList.toggle("fa-solid", isFavorited);
        favoriteHeart.classList.toggle("fa-regular", !isFavorited);
      }
    }

    // Add listener to card heart
    favoriteHeart.addEventListener("click", () =>
      toggleFavorite(favoriteHeart)
    );

    // Show modal on click
    viewButton.addEventListener("click", () => {
      const ingredientList = meal.nutrition.ingredients
        .map((ing) => `<li>${ing.name} - ${ing.amount} ${ing.unit || ""}</li>`)
        .join("");

      // Populate modal
      modalBody.innerHTML = `
        <div class="modal-header">
          <h2>${meal.title}</h2>
          <div class="modal-header-buttons">
            <button id="favoriteButton">
              <i class="${
                favoriteHeart.classList.contains("fa-solid")
                  ? "fa-solid"
                  : "fa-regular"
              } fa-heart pop-up-button"></i>
              Add to Favorites
            </button>
            <button id="closeModal">
              <i class="fa-solid fa-xmark pop-up-button"></i>Close
            </button>
          </div>
        </div>
        <div class="modal-image-info">
          <img src="${meal.image}" alt="${meal.title}" />
          <div class="info-paragraphs">
            <p>Prep/Cook: ${meal.readyInMinutes} minutes</p>
            <p>Serves: ${meal.servings} people</p>
            <p>Calories: ${Math.floor(
              meal.nutrition.nutrients.find((n) => n.name === "Calories").amount
            )}</p>
            <p>Health Score: ${meal.healthScore} / 100</p>
          </div>
        </div>
        <div class="modal-ingredients-instructions">
          <div class="modal-ingredients-div-ingredients">
            <h4>Ingredients</h4>
            <ul class="ingredient-list">${ingredientList}</ul>
          </div>
          <div class="modal-ingredients-div-instructions">
            <h4>Recipe Summary</h4>
            <p>${meal.summary}</p>
          </div>
        </div>
      `;

      modal.style.display = "block";

      // Grab modal elements
      const closeModal = document.getElementById("closeModal");
      const favoriteButton = document.getElementById("favoriteButton");
      const modalHeart = favoriteButton.querySelector(".fa-heart");

      // Event listeners
      closeModal.addEventListener(
        "click",
        () => (modal.style.display = "none")
      );
      favoriteButton.addEventListener("click", () =>
        toggleFavorite(modalHeart)
      );
    });

    // Append card
    recipeResultsSection.appendChild(div);
  });
}



async function getRecipesByCuisine(cuisineChoice) {
  const cuisineSelection = cuisineChoice;

  const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;

  const searchParam = new URLSearchParams({
    cuisine: cuisineSelection,
    addRecipeInformation: true,
    addRecipeNutrition: true,
    number: 12,
    apiKey: userApiKey,
  });
  console.log("searchParam: ", searchParam);
  const url = `${baseUrl}?${searchParam.toString()}`;

  console.log("Fetching from: ", url);

  try {
    await sleep(1200);
    recipeResultsHeader.style.display = "block";
    const response = await fetch(url);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Recipes found: ", jsonResponse);
      displayRecipesByCuisine(jsonResponse.results);
    }
  } catch (error) {
    console.log(error);
  }
}