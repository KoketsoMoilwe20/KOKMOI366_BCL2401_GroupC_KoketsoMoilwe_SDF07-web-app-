import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" /* From my understanding, the import declaration's purpose here is for code organization and reusability */
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" /* An important note: import declarations can only be present in modules. This is done in the HTML document, as a value of the script's type attribute. */

const appSettings = {
    databaseURL:"https://playground-95d32-default-rtdb.asia-southeast1.firebasedatabase.app/"
} /* This is a link of the database i created */

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList") /* ShoppingListInDB acts as a pointer to a specific location in the database where my shopping list items are stored. It's like an address where I find my list. */

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

/*"inputFieldEl", "addButtonEl", and "shoppingListEl" refer to HTML elements like a text input, button, and the list on my app's screen. These are where users interact with the app. */

/*  addButtonEl.addEventListener: When users click the button ("addButtonEl"), it triggers a function ("click") to do something. */

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    /* push: This function adds the typed-in value to the location in the database pointed to by "shoppingListInDB." */
    push(shoppingListInDB, inputValue) 
    
    /*"clearInputFieldEl": After adding an item, the text box is cleared so the user can add another food item. */
    clearInputFieldEl()
    
})

onValue(shoppingListInDB, function(snapshot) {
    
     if (snapshot.exists()) {
         /* "itemsArray": This variable converts the list data into a more manageable format. */
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items added yet" /*This sets the inner HTML of the element with the id="shopping-list" to display a message indicating that no items are currently added*/
    }
    
    
})

function clearShoppingListEl() {
        shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

/* This code below handles adding items to the cart/shopping list*/
function appendItemToShoppingListEl(item) {
   let itemID = item[0]
   let itemValue = item[1]
   
   let newEl = document.createElement("li")
   
   newEl.textContent = itemValue
   
   newEl.addEventListener("click", function() {
     let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`) /*This line of code constructs a reference to the specific location in the database where the item is stored, using the itemID*/
     
     /* "remove": This function removes the clicked item from the database location pointed to by "exactLocationOfItemInDB." This crosses off an item or deletes an item on my list. */
     remove(exactLocationOfItemInDB)
   })
   
   shoppingListEl.append(newEl)
}

/* I commented on the functions and variables i understand. I still feel like going back to the module on Scrimba to understand better on JavaScript and Firebase database interaction. And also trying out other platforms and resources to learn them. */