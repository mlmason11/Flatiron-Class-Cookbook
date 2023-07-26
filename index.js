// new comment

// DEFAULT IMAGE RANDOMIZER 

// create a dropdown menu using select and options tags to feature meal types.
    // when meal type is selected, recipies list will render in recipie container

    // when receipe is clicked, populates card with receipe details and image

// when user submits form, comment populates comments section 
    // like button 

    
// global constants
const allergens = document.getElementById('allergens')
const categoryMenu = document.getElementById('category-menu')
const commentContainer = document.querySelector("#comment-container")
const commentForm = document.querySelector('#comment-form')
const description = document.getElementById('description')
const detailImage = document.getElementById('detail-image')
const featuredImage = document.getElementById('featured-image')
const ingredients = document.getElementById('ingredients')
const instructions = document.getElementById('instructions')
const listParent = document.getElementById('list-parent')
const newComment = document.querySelector('#new-comment')
const newName = document.querySelector('#new-name')
const rating = document.getElementById('rating')
const ratingForm = document.getElementById('rating-form')
const stars = document.getElementById('stars')
const title = document.getElementById('title')


// global variables
let currentRecipe
let currentCategory


function addOneComment(commentObj) {
    const parentBlock = document.createElement('div')
    parentBlock.className = "parent-block grid"
    commentContainer.append(parentBlock)

    //targeting selectors (name + comment)

    const userName = document.createElement('small')
    userName.setAttribute('class', 'user-name col-12')
    userName.style.alignContent = 'left'
    userName.textContent = commentObj.username

    const userComment = document.createElement('p')
    userComment.setAttribute('class', 'user-comment col-12')
    userComment.textContent = commentObj.comment

    const heart = document.createElement('i')
    heart.setAttribute('class', 'heart col-12')
    heart.classList.add('fa-regular' ,'fa-heart')

    // Heart Button event listener
    heart.addEventListener('click', e => {
        e.preventDefault()
        console.log('hearted')
        if (heart.classList.contains('fa-solid')) {
            heart.classList.remove('fa-solid' , 'fa-heart')
            heart.classList.add('fa-regular' , 'fa-heart')
        }
        else if (heart) {
            heart.classList.contains('fa-regular' ,'fa-heart')
            heart.classList.add('fa-solid', 'fa-heart')
        }
    })

    // const userIcon =  document.createElement("div")
    // userIcon.className = "col-2"
    
    parentBlock.append(heart, userName, userComment)
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
    commentContainer.innerHTML=''

    currentRecipe = recipeObj

    const recipeName = document.createElement('h1')
    recipeName.textContent = recipeObj.name
    title.append(recipeName)

    const image = document.createElement('img')
    image.src = recipeObj.image
    detailImage.append(image)

    const starNum = document.createElement('p')
    starNum.textContent = `${recipeObj.stars / recipeObj.ratings}`
    //stars.textContent = `${currentRecipe.stars / currentRecipe.ratings} Stars`
    rating.append(starNum)

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

    // fetch statement to get all the comments for recipeObj and display them in the comment container
    // in the fetch statement, we will use addOneComment recursively to add all comments for given recipeObj
    fetch(`http://localhost:3000/comments`)
    .then(r => r.json())
    .then(commentArray => {
        commentArray.forEach(commentObj => {
            if (currentRecipe.id === commentObj.refno) {
                addOneComment(commentObj)
            }
        })
    }).catch(error => alert(error))
}



categoryMenu.addEventListener ('change', e => {
    currentCategory = e.target.value
    console.log(currentCategory)
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

ratingForm.addEventListener('submit', e => {
    e.preventDefault()
    const ratingValue = e.target.value
    if (ratingValue >= 0 && ratingValue <= 5) {
        fetch(`http://localhost:3000/recipes${currentRecipe.id}`, {
            'method': "PATCH",
            'header': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'ratings': ++currentRecipe.ratings,
                'stars': currentRecipe.stars + ratingValue
            })   
        }).then(response => response.json())
        .then(data => {return(data)})
        .catch(error => alert(error))
    
        stars.textContent = `${currentRecipe.stars / currentRecipe.ratings} Stars`
    }
    else {
        console.log("Please enter a number between 0 and 5")
    }
})

// Comments form event listener to submit comments, and add them to the database for each recipe
commentForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('clicked')
    console.log(e.target.value)

    if (currentRecipe.id !== undefined) {
        fetch(`http://localhost:3000/comments`, {
            'method': "POST",
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'comment': e.target.comment.value,
                'username': e.target.username.value,
                'refno': currentRecipe.id
            })   
        }).then(response => response.json())
        .then(commentObj => addOneComment(commentObj))
        .catch(error => alert(error))
    }
    else {
        console.log(`Please select a recipe to comment on it`)
    }

    commentForm.reset()
})

fetch(`http://localhost:3000/recipes`)
.then(response => response.json())
.then(recipeArray => {
    recipeArray.forEach(recipeObj => addOneRecipe(recipeObj))
}).catch(error => alert(error))

// Display a random recipe upon loading page