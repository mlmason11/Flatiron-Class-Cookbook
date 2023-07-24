// GLOBAL CONSTANTS

// EVENT LISTENERS 

// FUNCTIONS

// DEFAULT IMAGE RANDOMIZER 

// create a dropdown menu using select and options tags to feature meal types.
    // when meal type is selected, recipies list will render in recipie container

    // when receipe is clicked, populates card with receipe details and image

// when user submits form, comment populates comments section 
    // like button 


const form = document.querySelector('#comment-form')
const commentContainer = document.querySelector("#comment-container")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('clicked')
    
    
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

})

