const byIngredientsButton = document.getElementById("by-ingredients");
const byCuisineButton = document.getElementById("by-cuisine");
const dietaryRestrictionsButton = document.getElementById("dietary-restrictions");
const generalSearchButton = document.getElementById("general-search");
const valueTextInForm = document.getElementById("find-recipes-gen");
const findRecipeInput = document.getElementById("find-recipes");
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
valueTextInForm.addEventListener("click", clearInput);
findRecipesButton.addEventListener("click", getRecipes);
chicken.addEventListener("click", addInput);
pasta.addEventListener("click", addInput);
tomato.addEventListener("click", addInput);
cheese.addEventListener("click", addInput);
garlic.addEventListener("click", addInput);

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

  findRecipeInput.value = "";
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
  findRecipeInput.value = "";
//   recipeResultsHeader.style.display = "none";
});


function clearInput()
{
    valueTextInForm.value = "";
    valueTextInForm.style.color = "black";
}

function addInput(event)
{
    const ingredient = event.target.textContent.trim();
    findRecipeInput.value = ingredient;
}

async function getRecipes()
{
    const url = "https://www.themealdb.com/api/json/v1/1/filter.php";
    try
    {
        const response = await fetch();
        if (response.ok)
        {
            const jsonResponse = await response.json();
            // Code to execute here
        }
    }
    catch (error)
    {
        console.log(error);
    }
}