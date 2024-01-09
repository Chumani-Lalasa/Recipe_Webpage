let searchBar = document.getElementById('search')
let searchBtn = document.getElementById('searchBtn')
let div = document.querySelector('.recipeMainContainer')
let randomContainer = document.getElementById('random')
let ingredientsDiv = document.getElementById('ingredientsDiv')
let category2 = document.getElementById('category2')
searchBtn.onclick = () =>{
    if(searchBar.value!=""){
        category2.style.display = "block"
        getData(searchBar.value);
    }else{
        return;
    }
    searchBar.value = "";
    getRandomRecipe();
    
}
function getData(inputData){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
    .then((res) => res.json())
    .then((data) =>{
        displayData(data.meals)
    } )
}
function displayData(mealsArray){
    let recipeIdArray = []
    div.innerHTML = "";
    console.log(mealsArray[0]);
    for(let i=0;i<mealsArray.length;++i){
        recipeIdArray.push(mealsArray[i]) 
        div.innerHTML +=
    `   
    <div class="recipeContainer">
            <div><img src="${mealsArray[i].strMealThumb}" id="${mealsArray[i].idMeal}"  alt="" /></div>
            <div><h2>${mealsArray[i].strMeal}</h2></div>
          </div>
    `
    }
    console.log("recipeIdArray",recipeIdArray);
}
function getRandomRecipe(){
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data)=>{
        let randomRecipeData = data.meals;
        displayRandomRecipe(randomRecipeData)
    })
}
getRandomRecipe();

function displayRandomRecipe(recipe){
    let mealObject = recipe[0];
    console.log(mealObject);
    randomContainer.innerHTML = `
    <div id="category"><h2>Random Recipe</h2></div>
    <div id="recipeImage"><img src="${recipe[0].strMealThumb}" id="${recipe[0].idMeal}" alt="" /></div>
    <div id="recipeName"><h2>${recipe[0].strMeal}</h2></div>
    `
    
        randomContainer.onclick = () => {
        ingredientsDiv.innerHTML="";
        displayRandomIngredients(mealObject)
    }
       
    }
function displayRandomIngredients(mealObject){
    let mealObjectIngredients = [];
    console.log(mealObject);
    for(key in mealObject){
        if(mealObject[key]!="" && mealObject[key]!=" " && mealObject[key]!=null){
            if(key.startsWith('strIngredient')){
                mealObjectIngredients.push(mealObject[key])
            }
        }
    }
    console.log(mealObjectIngredients);      
    displayPopUp(mealObjectIngredients); 
    
} 
 
function displayPopUp(ingredients){
    ingredientsDiv.innerHTML="";
    document.body.overflow = "fixed";
    document.getElementById('popup').style.display = 'flex';
    for(let i=0;i<ingredients.length;++i){
    ingredientsDiv.innerHTML += `<li>${ingredients[i]}</li>`
    }
}
document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
  });

