const apiKeyEntry = document.getElementById("apiKeyEntry");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
let userApiKey = localStorage.getItem("spoonacularApiKey") || "";

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

  if (!results) {
    recipeResultsSection.innerHTML = "<p>No recipes found.</p>";
    return;
  }
  console.log("results: ", results);

  results.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("recipe-card");
    div.innerHTML = `
        <img src=${meal.image} alt=${meal.title} width="270" height="200"/>
        <p>${meal.title}</p>
        <p>${meal.readyInMinutes}</p>
        <p>${meal.servings}</p>
        `;
    recipeResultsSection.appendChild(div);
  });
}
