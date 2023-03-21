const recipeResults = document.querySelector('#recipes');
const apiKey = "apiKey=f0be80267acc4b1da34a6b913d0918a8";
const queryURL = "https://api.spoonacular.com/recipes/";

window.onload = onloadRecipies();

const loadingElements = document.querySelectorAll(".img__wrapper, .search__button");
const allLoadingElements = document.querySelectorAll(".buffer__wrapper, .search__button, .img__wrapper");

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
    removeLoading();
}

function triggerLoading() {
    if (window.document.title == "SUMYUM-RECIPES") {
        const recipeElems = document.querySelectorAll(".buffer__wrapper, .search__button")
        recipeElems.forEach((element) => element.classList.add("loading"));
    }
}

function searchEvent() {
    loadingElements.forEach((element) => element.classList.add("loading"));
    setTimeout(() => {
        window.location = 'food.html'
    },2500);
}

function removeLoading() {
  allLoadingElements.forEach((element) => element.classList.remove("loading"));
}

/*
on load of food.html function will load recipes based on the user input from either index.html or food.html, 
otherwise load random rercipes in the event of no user input from index.html
*/

function onloadRecipies() {
    triggerLoading();

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

/*
this function is called by main and provides a html template for the variables to be inserted,
allowing the data from spoonacular api to be customised using css
*/

function recipeHTML(recipe) {
    return `<div class="recipe__card--wrapper">
        <div class="card__img--wrapper">
            <img class="card__imgs" src="${recipe.image}" alt="Image Not Available"></img>
        </div>
        <div class="card__text--wrapper">
            <div class="card__title--wrapper">
                <h3 class="card__title">${recipe.title}</h3>
            </div>
            <div class="card__tags">
                <div id="1" class="card__tag--wrapper">
                    <h4 class="card__tag">${refine(recipe.cuisines[0])}</h4>
                </div>
                <div id="dishTypes" class="card__tag--wrapper">
                    <h4 class="card__tag">${refine(recipe.dishTypes[0])}</h4>
                </div>
                <div class="card__tag--wrapper">
                    <h4 class="card__tag">${recipe.readyInMinutes}m</h4>
                </div>
                <div class="card__tag--wrapper">
                    <h4 class="card__tag">Serves: ${recipe.servings}</h4>
                </div>
            </div>
            <div class="card__link--wrapper">
                <a class="card__link" target="_blank" href="${recipe.spoonacularSourceUrl}">
                    <i class="fa-solid fa-link card__link--icon"></i>
                    <h5 class="card__link--title">${recipe.sourceUrl}</h5>
                </a>
            </div>
        </div>
    </div>`
}

function refine(input) {
    console.log(input)
    if (input !== undefined) {
        return input;
    } 
}

function toggleMenu() {
    document.body.classList.toggle("toggled");
}

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function contact(event) {
   event.preventDefault();
   const loading = document.querySelector('.modal__overlay--loading');  
   const success = document.querySelector('.modal__overlay--success');
   loading.classList.add("modal__overlay--visible");
    emailjs
        .sendForm(
            'service_k0gqyht',
            'template_buv38uz',
            event.target,
            'atXaPAG5EvldD1P_r'
         )
         .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at Samme1210@gmail.com"
      );
    });
}

function toggleModal() {
    document.body.classList.toggle("modal--open");
}