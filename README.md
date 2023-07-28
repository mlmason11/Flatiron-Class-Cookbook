RECIPES BLOG:

This is a simple recipe blog that allows users to select a meal type from a dropdown menu. When a meal type is selected, a list of recipes for that category will be displayed below the dropdown. Clicking on a recipe in the list will populate a recipe card with details of your chosen recipe and an image of that meal. Users can also submit comments for each recipe, like comments, and rate a dish.

HOW TO USE:

1. Clone the repository and open the index.html file in your web browser.
2. Choose a meal type from the dropdown menu.
3. Click on a recipe from the displayed list to view its details and image in the recipe card.
4. You can submit a comment for the selected recipe using the comment form.
5. You can like or unlike comments by clicking on the heart icon attached above each posted comment in the comments container

CODE DETAILS: 

Notable Global variables: 

- currentRecipe: This variable stores the currently selected recipe object, which is used to display recipe details and comments.

- currentCategory: This variable stores the currently selected meal type (category) from the dropdown menu.

Functions: 

- populateDetails(recipeObj): This function takes a recipe object as input and populates the recipe card with the details of the selected recipe. It updates the HTML elements with information like the recipe name, image, description, ingredients, instructions, allergens, and any ratings. It also fetches and displays the comments related to the selected recipe in the comments container.

- addOneComment(commentObj): This function takes a comment object as input and adds a new comment to the comment container associated with the recipe chosen. It creates a new div element for each comment, displaying the username, comment text, and a heart icon for liking the comment.

- addOneRecipe(recipeObj): This function takes a recipe object as input and adds a new recipe list item to the listParent element. It sets up a click event listener on the list item to display the details of the clicked recipe using the populateDetails function.

Event Listeners:

- categoryMenu: When the meal type is selected from the dropdown menu, this event listener fetches the recipes for the selected category and populates the listParent with the recipe names.

- commentForm: This event listener triggers when the user submits a comment. It fetches the API to add the new comment to the database and then calls the addOneComment function to display the new comment on the recipe card.

NOTE (to self mostly): 

Please ensure that you have a local server running to handle the API requests. The server should respond with data in the expected format (recipes and comments in json) to make the blog work correctly.

Enjoy using the Recipe Blog! If you have any questions or feedback, feel free to ask questions/reach out.

Happy cooking! 🍳🥗🍰