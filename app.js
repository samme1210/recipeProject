const recipeResults = document.querySelector('#recipes');
const apiKey = "apiKey=f0be80267acc4b1da34a6b913d0918a8";
const queryURL = "https://api.spoonacular.com/recipes/";
window.onload = onloadRecipies();

/*
main function fetches requested data from spoonacular api transforms the promise into readable data, 
the uses this data to amend the html accordingly 
*/

async function main(input) {
    console.log(input)
    const recipies = await fetch(queryURL + input + "&number=6&addRecipeInformation=true");
    const recipeData = await recipies.json();
    console.log(recipies)
    console.log(recipeData)
    recipeResults.innerHTML = (recipeData.results || recipeData.recipes).map((recipe) => recipeHTML(recipe)).join("");
}

/*
on load of food.html function will load recipes based on the user input from either index.html or food.html, 
otherwise load random rercipes in the event of no user input from index.html
*/

function onloadRecipies() {
    const urlParams = new URLSearchParams(window.location.search);
    const userInput = urlParams.get("userInput"); 
    let searchType;

    if (userInput) {
        searchType = "complexSearch?";
    } else {
        searchType = "random?";
    }

    const input = searchType + apiKey + (userInput ? `&query=${userInput}` : '');
    main(input);
}

function recipeFilter() {
    const cardThree = document.querySelector('#recipes div:nth-child(3)');
    console.log(cardThree)
    const filterModalActivate = cardThree.classList += ' .filter__modal';
}

/*
this function is called by main and provides a html template for the variables to be inserted,
allowing the data from spoonacular api to be customised using css
*/

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

function toggleMenu() {
    const targetMenuBTN = document.querySelector('.menu__toggle');
    const targetMenuBG = document.querySelector('.menu__backdrop');
    targetMenuBTN.classList.toggle("toggled");
    targetMenuBG.classList.toggle("toggled")
    document.body.classList.toggle("toggled")

    targetMenuBTN.addEventListener('click', function toggleAnimation() {
        if (targetMenuBG.classList.contains('.slideInFromRightAnime')) {
            targetMenuBG.classList.remove('.slideInFromRightAnime');
            targetMenuBG.classList.add('.slideOutFromLeftAnime');
        } else if (targetMenuBG.classList.contains('.slideOutFromLeftAnime')) {
            targetMenuBG.classList.remove('.slideOutFromLeftAnime');
            targetMenuBG.classList.add('.slideInFromRightAnime');
        } else {
            targetMenuBG.classList.add('.slideInFromRightAnime');
        }
    })
}

//function triggerLoadingState(event) {
//    const 
//}
//
//onclick="location.href='${recipe.sourceUrl}'