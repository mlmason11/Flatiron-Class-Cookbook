// GLOBAL CONSTANTS

// EVENT LISTENERS 

// FUNCTIONS

// DEFAULT IMAGE RANDOMIZER 

// create a dropdown menu using select and options tags to feature meal types.
    // when meal type is selected, recipies list will render in recipie container

    // when receipe is clicked, populates card with receipe details and image

// when user submits form, comment populates comments section 
    // like button 

// global variables
let currentRecipe
let currentCategory

// global constants
const listParent = document.getElementById('list-parent')
const commentForm = document.getElementById('comment-form')
const commentContainer = document.getElementById("comment-container")
const title = document.getElementById('title')
const detailImage = document.getElementById('detail-image')
const description = document.getElementById('description')
const ingredients = document.getElementById('ingredients')
const instructions = document.getElementById('instructions')
const allergens = document.getElementById('allergens')
const rating = document.getElementById('rating')
const featuredImage = document.getElementById('featured-image')
const categoryMenu = document.getElementById('category-menu')

// optiona container 

//const optionsContainer = document.createElement('section')
//const listOptionsDiv = document.createElement('div')
//optionsContainer.append(listOptionsDiv)
//const categorySelect = document.createElement('select')
//listOptionsDiv.append(categorySelect)

// Comments form event listener to submit comments, and add them to the database for each recipe
commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('clicked')
    
    if (e.target.value != "") {


        fetch(`http://localhost:3000/recipes${currentRecipe.id}`, {
            'method': "POST",
            'header': {
                'Accept': 'applications/json',
                'Content-Type': 'applications/json'
            },
            'body': JSON.stringify({
                'comment': e.target.value
            })   
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => alert(error))


        const parentBlock = document.createElement('div')
        parentBlock.className = "parent-block"
        commentContainer.append(parentBlock)

        //targeting selectors (name + comment)
        const newName = document.querySelector('#new-name')
        const newComment = document.querySelector('#new-comment')

        const userName = document.createElement('small')
        userName.textContent = newName.value
        userName.style.alignContent = 'left'

        const userComment = document.createElement('p')
        userComment.textContent = newComment.value

        const heart = document.createElement('i')
        heart.classList.add('fa-regular' ,'fa-heart')

        // Heart Button event listener
        
        heart.addEventListener('click', () => {
            console.log('click')
            if (heart.classList.contains('fa-solid')) {
                heart.classList.remove('fa-solid' , 'fa-heart')
                heart.classList.add('fa-regular' , 'fa-heart')
            }
            else if (heart){
                heart.classList.contains('fa-regular' ,'fa-heart')
                heart.classList.add('fa-solid', 'fa-heart')
            }
        })
        const userIcon =  document.createElement("div")
        userIcon.className = "col-2"
        

        parentBlock.prepend(userName, userComment, heart, userIcon)

        form.reset()
    }
})

// Populates the recipe card with the details of the clicked recipe
// Takes in a recipe object and uses its data to fill in the card
function populateDetails(recipeObj) {
    title.innerHTML=''
    detailImage.innerHTML=''
    description.innerHTML=''
    ingredients.innerHTML=''
    instructions.innerHTML=''
    allergens.innerHTML=''
    rating.innerHTML=''
    
    currentRecipe = recipeObj

    const recipeName = document.createElement('h1')
    recipeName.textContent = recipeObj.name
    title.append(recipeName)

    const image = document.createElement('img')
    image.src = recipeObj.image
    detailImage.append(image)

    const descr = document.createElement('p')
    descr.textContent = recipeObj.description
    description.append(descr)

    const ingr = document.createElement('p')
    ingr.textContent = recipeObj.ingredients
    ingredients.append(ingr)

    const instr = document.createElement('p')
    instr.textContent = recipeObj.steps
    instructions.append(instr)

    const allerg = document.createElement('p')
    allerg.textContent = recipeObj.allergens
    allergens.append(allerg)

    const stars = document.createElement('p')
    stars.textContent = recipeObj.rating
    rating.append(stars)
}

// Function to add one recipe to the list
function addOneRecipe(recipeObj) {
    const recipeItem = document.createElement('li')
    recipeItem.textContent = recipeObj.name
    recipeItem.addEventListener('click', e => {
        e.preventDefault()
        populateDetails(recipeObj)
    })
    listParent.append(recipeItem)    
}

// fetch(`http://localhost:3000/recipes`)
// .then(response => response.json())
// .then(recipeArray => {
//     recipeArray.forEach(recipeObj => addOneRecipe(recipeObj))
// }).catch(error => alert(error))

categoryMenu.addEventListener ('change', e => {
    currentCategory = e.target.value
    listParent.innerHTML=""
    fetch(`http://localhost:3000/recipes`)
    .then(response => response.json())
    .then(recipeArray => {
        
        recipeArray.forEach(recipeObj => {
            if (recipeObj.category === currentCategory) {
                addOneRecipe(recipeObj)
            }
        })
    }).catch(error => alert(error))
})
