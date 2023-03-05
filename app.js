const recipeResults = document.querySelector('#recipes');
const apiKey = "apiKey=f0be80267acc4b1da34a6b913d0918a8";
const queryURL = "https://api.spoonacular.com/recipes/";
window.onload = onloadRecipies();

async function main(input) {
    try {
        const recipies = await fetch(queryURL + input + "&number=6&addRecipeInformation=true");
        if (!recipies.ok) {
            throw new Error('Error retrieving recipe data');
        }
        const recipeData = await recipies.json();
        console.log(recipeData)
        recipeResults.innerHTML = (recipeData.results || recipeData.recipes).map((recipe) => recipeHTML(recipe)).join("");
    } catch (error) {
        console.error(error);
        console.log(recipeData);
        recipes.innerHTML = '<div class="error">An error occurred while retrieving recipe data.</div>'
    }
}

function recipeHTML(recipe) {
    return `<div class="recipe__card--wrapper">
    <div class="card__img--wrapper">
        <img class="card__img" src="${recipe.image}" alt="Not Available"></img>
    </div>
    <div class="card__text--wrapper">
        <div class="card__title--wrapper">
            <h3 class="card__title">${recipe.title}</h3>
        </div>
        <div class="card__tags">
            <div class="card__tag--wrapper">
                <h4 class="card__tag">${recipe.type}</h4>
            </div>
            <div class="card__tag--wrapper">
                <h4 class="card__tag">${recipe.dishTypes['breakfast', "lunch", 'dinner']}</h4>
            </div>
            <div class="card__tag--wrapper">
                <h4 class="card__tag">${recipe.readyInMinutes}m</h4>
            </div>
            <div class="card__tag--wrapper">
                <h4 class="card__tag">Serves: ${recipe.servings}</h4>
            </div>
        </div>
        <div class="card__button--wrapper">
            <button class="card__button btn">
                <i class="fa-solid fa-link card__link--icon"></i>
                <h5 class="card__button--title">${recipe.sourceUrl}</h5>
            </button>
        </div>
    </div>
    </div>`
}

//on load of food.html function will load recipes based on the user input from index.html 
//or load random rercipes in the event of no user input from index.html

function onloadRecipies() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInput = urlParams.get('userInput');
    const queryType = '&query=' + userInput;
    let searchType;

    if (!userInput) {
        searchType = "complexSearch?";
        let input = searchType + apiKey + queryType;
        main(input);
    } else {
        searchType = "random?";
        let input = searchType + apiKey;
        main(input);
    }
}

function getFoodInput() {
    const userInput = document.querySelector('input').value
    const searchType = "complexSearch?";
    const queryType = `&query=${userInput}`;
    let input = searchType + apiKey + queryType;
    main(input)
}

function recipeFilter() {
    const cardThree = '#recipes div:nth-child(3)'
    console.log(cardThree)
    const targetCardThree = document.querySelector(cardThree)
    const filterModalActivate = targetCardThree.classList += ' .filter__modal'
    return filterModalActivate
}

//function triggerLoadingState(event) {
//    const 
//}
//
//onclick="location.href='${recipe.sourceUrl}'