let carts = document.querySelectorAll(".add-cart");
// Getting all the add to cart buttons

let products = [
    // creating an array of objects to store my track objects

    {
        // Track object 1
        name: "Bionics-original mix-Quintin Kelly", // object name
        tag: "bionics", // object tag, this tag is going to be used to add images to the cart page
        price: 15, // object price
        incart: 0, // how many times the object is in the cart
    },

    {
        // Track object 2
        name: "Cafe Strange-original mix-Quintin Kelly",
        tag: "cafeStrange",
        price: 15,
        incart: 0,
    },

    {
        // Track object 3
        name: "Catalyst-original mix-Quintin Kelly",
        tag: "catalyst",
        price: 45,
        incart: 0,
    },

    {
        // Track object 4
        name: "Control-original mix-Quintin Kelly",
        tag: "control",
        price: 15,
        incart: 0,
    },

    {
        // Track object 5
        name: "Follow Me-original mix-Quintin Kelly",
        tag: "followMe",
        price: 15,
        incart: 0,
    },
];

for (let i = 0; i < carts.length; i++) {
    // This for loop is used to loop through the "add to cart" buttons and the objects in the products array

    carts[i].addEventListener("click", () => {
        // adding a click event listener to the respective add to cart buttons
        cartNumbers(products[i]);
        // Invoking the cartNumbers() function and parsing the products array as a parameter
        totalCost(products[i]);
        // Invoking the totalCost() function and parsing the products array as a parameter
        Vat();
        // Invoking the Vat() function
    });
}

function onLoadCartNumbers() {
    //This function allows us to display the number of items in the cart when the page loads
    let productNumbers = localStorage.getItem("cartNumbers"); // checks if there any items in the cart
    if (productNumbers) {
        // if its true, that theres items in the cart then
        document.querySelector(".cart .quantity").textContent = productNumbers; // set the number on the navigation bar to the number of items in the cart
    }
}

function cartNumbers(product) {
    //This function is used to update the cart quantity number that appears next to the cart icon on the navigation bar
    let productNumbers = localStorage.getItem("cartNumbers");
    // checking if theres anything in the cart already
    productNumbers = parseInt(productNumbers);
    // parse the number of items in the cart to an Integer because its a string(anything from local storage is a string)

    if (productNumbers) {
        // if there is something in the cart then
        localStorage.setItem("cartNumbers", productNumbers + 1);
        /* set the local storage with a key of "cartNumbers" and a value of the number
                       thats already in the cart plus 1*/
        document.querySelector(".cart .quantity").textContent = productNumbers + 1; // updating the cart quantity number that appears on the navigation bar
    } else {
        // if there is nothing in the cart then
        localStorage.setItem("cartNumbers", 1);
        //set the local storage with a key of "cartNumbers" and a value of one
        document.querySelector(".cart .quantity").textContent = 1;
        // updating the cart quantity number that appears on the navigation bar
    }

    setItems(product);
    // invoking the setItems() function with the parameter of product
}

function setItems(product) {
    /*This function moves a step closer than the cartNumbers() and allowes us to see which exact items are in the cart
          and not just the quantity of the cart */

    let cartItems = localStorage.getItem("productsInCart");
    // check if there are any items in the cart
    cartItems = JSON.parse(cartItems);
    /* convert the objects to javaScript objects, because anything that comes from local storage is a string
           in this particular case the objects are stringified*/

    if (cartItems != null) {
        // if the cart is not empty then
        if (cartItems[product.tag] == undefined) {
            /*This if else statement allows us to add different objects in the cart.
                              Without it if you click on one object repeatedly it updates the incart property of the object as expected
                              but as soon as you click on another object that object does not get added to the cart */
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        cartItems[product.tag].incart += 1;
        // upates the incart value of the respective object
    } else {
        product.incart = 1;
        // sets the incart value of the respective object to one
        cartItems = {
            //creates new object and sets the current object tag property as a key and the object itself as a value
            [product.tag]: product,
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    /* Sets the local storage with the key "productsInCart"
           and a value of the stringified version of the cartItems object*/
}

function totalCost(product) {
    //This function allows us to calculate the total cost of the cart as objects are being added to the cart
    let cartCost = localStorage.getItem("totalCost"); // check if theres anything in the cart

    if (cartCost != null) {
        // if the cart is not empty then
        cartCost = parseInt(cartCost);
        // parse the cartCost to an integer because its in a form of a string

        alert(product.price + cartCost + " " + "Rands is your current total:)");
        // alerts to the client the total cost as they add each item to the cart
        localStorage.setItem("totalCost", cartCost + product.price);
        /*Sets the local storage with the key "totalCost" and 
                       a value of the cartCost plus the price of the item that is being added */
    } else {
        // if the cart is empty then
        localStorage.setItem("totalCost", product.price);
        //set the local storage with the key "totalCost" and a value of the object being added to the cart
        alert(product.price + " " + "Rands is your current total:)");
        // alert the total to the client
    }
}

function coupon() {
    //This function allows us to apply a coupon discounts to the total price
    location.reload();
    // The reload() method does the same as the reload button in the browser

    coupon1 = document.getElementById("coupon1");
    // get the input value of the coupon form
    let cartCost = localStorage.getItem("totalCost");
    // get the total cost from local storage
    if (coupon1.value == "Klank Records") {
        // check if the inputed coupon is valid, if its valid then
        cartCost = cartCost - 50;
        // subtract R50 from the total cost of the cart
        localStorage.setItem("totalCost", cartCost);
        // set the local storage with the key "totalCost" and a value of the cartCost
        alert("R50 coupon applied :)");
        // alert the client that a coupon has been applied
    } else {
        alert("Invalid Coupon ");
        // alert the client that they entered an invalid coupon
    }
    Vat();
    // invoke the vat() function
}

function deliveryCost() {
    // This function allows us to calculate the total cost based on what delivery option that was chosen
    location.reload();
    // The page needs to reload each time this function runs
    delivery = document.getElementById("deliveryOptions");
    // get the entered delivery option by the user
    let cartCost = localStorage.getItem("totalCost");
    // get the total cost from local storage
    cartCost = parseInt(cartCost);
    // parse the total cost into an integer from a string

    if (delivery.value == "Express") {
        // if the user entered Express then
        cartCost = cartCost + 250;
        // R250 is added to the total cost of the cart
        localStorage.setItem("totalCost", cartCost);
        // set the local storage with the key "totalCost" and a value of CartCost
        alert(
            "You chose the Express delivery option which takes 1 - 3 business days"
        ); // alerts to the user which delivery option they chose
    } else if (delivery.value == "Economy") {
        // if the user entered Economy then
        cartCost = cartCost + 150;
        // R150 is added to the total cost of the cart
        localStorage.setItem("totalCost", cartCost);
        // set the local storage with the key "totalCost" and a value of CartCost
        alert(
            "You chose the Economy delivery option which takes 3 - 5 business days"
        ); // alerts to the user which delivery option they chose
    } else {
        alert("Please enter a valid delivery option!");
        // if the client chose an invalid delivery option an error is alerted to them
    }
    Vat();
    // the vat() function is invoked
}

function Vat() {
    //This function allows us to determine the VAT
    let cartCost = localStorage.getItem("totalCost");
    // get the total cost from local storage
    cartCost = parseInt(cartCost);
    // parse the total cost into an integer from a string
    let Vat = cartCost * 0.15;
    // calculate the  15% VAT
    let cartVat = cartCost + Vat;
    // add the VAT to the total cost
    localStorage.setItem("totalVat", cartVat);
    // sets the local storage with the key "totalVat" and a value of cartVat
}

function checkOut() {
    // This function allows us to generate a reference number for the client
    location.reload();
    refNumber = Math.floor(Math.random() * 10000 + 1);
    // Return a random number between 1 and 1000, that acts as a Ref Number
    alert(
        "Your order was succesful :) Thank you for shopping at Klank Records. Your reference number is:" +
        " " +
        "#" +
        refNumber
    ); //alerting to the client that the order was succesful and display their reference number

    let cartItems = localStorage.getItem("productsInCart");
    // get cartItems from local storage
    let cartCost = localStorage.getItem("totalCost");
    // get total cost of the cart from local storage
    let productNumbers = localStorage.getItem("cartNumbers");
    // get cart number from local storage
    let vatTot = localStorage.getItem("totalVat");
    // get total cost of the cart with VAT from local storage
    productNumbers = parseInt(productNumbers);
    //parse the cart number into an integer from a string
    cartItems = JSON.parse(cartItems);
    //parse the cart items into javaScript objects from a JSON  objects
    cartCost = parseInt(cartCost);
    //parse the total cost of the cart into an integer from a string
    vatTot = parseInt(vatTot);
    //parse the total cost of the cart with VAT into an integer from a string
    productNumbers = 0;
    //setting the cart number to 0
    cartCost = 0;
    //setting the cart total cost to 0
    cartItems = [];
    //setting the cart items array to empty
    vatTot = 0;
    //setting the cart total cost with VAT to 0

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    // set local storage with a key of "productsInCart" and value of cartItems
    localStorage.setItem("totalCost", JSON.stringify(cartCost));
    // set local storage with a key of "totalCost" and value of cartCost
    localStorage.setItem("cartNumbers", JSON.stringify(productNumbers));
    // set local storage with a key of "cartNumbers" and value of productNumbers
    localStorage.setItem("totalVat", JSON.stringify(vatTot));
    // set local storage with a key of "totalVat" and value of vatTot
}

function displayCart() {
    // this function allows us to display the whole cart. The items, quantity, the cost of those items and the grand total

    let cartItems = localStorage.getItem("productsInCart");
    // get the cartItems from local storage
    cartItems = JSON.parse(cartItems);
    // parse the objects into javaScript objects
    let productsContainer = document.querySelector(".products");
    // gets the div in which we will display the items
    let cartCost = localStorage.getItem("totalCost");
    // gets the total cost of the cart from local storage
    let cartVAT = localStorage.getItem("totalVat");
    // gets the total amount with VAT from local storage
    if (cartItems && productsContainer) {
        // if there are items in the cart and the query selector was succesful in getting an element with class "products" then
        productsContainer.innerHTML = "";
        // the products container div innerHTML is set to an empty string
        Object.values(cartItems).map((item) => {
            /* Object.values() method is used to return an array whose elements
                               are the enumerable property values found on the object. Here we are creating a div elements for the individual item added to the cart*/
            productsContainer.innerHTML += `
      <div class = "product"> <!--Creates a div for the products added onto the cart-->
     
      <img src="images/${
        item.tag
      }.jpg" style = "width: 50px; height:50px;" > <!--Inserts an image with a height and width of 50px-->
      <span class = "itemName"> ${
        item.name
      }</span> <!--inserting the objects name-->
      <div class = "itemPrice">R${
        item.price
      }.00</div> <!--Inserting the objects price-->
      <div class = "quantity2">${
        item.incart
      }</div> <!--inserting the object's incart value-->
      <div class = "total2">R${
        item.incart * item.price
      }.00</div> <!--inserts the objects total price based on quantity-->
      </div>
     
      `;
        });
        productsContainer.innerHTML += `
    <div class = "basketTotalContainer"> <!--Inserting the cart total div element-->
      <h6 class = "basketTotalTitle"> <!--Inserting the cart total title-->
      Basket Total
      </h6>
      <h6 class = "basketTotal"> R${cartCost}.00</h4> <br/> <!--Inserting the cart total-->
    </div>
    <div>
    <h6 class = "vatTitle"> Total (incl 15% VAT) </h6> <!--Inserting the cart total (incl VAT) title-->
    <h6 class = "cartVat"> R${cartVAT}</h6> <!--Inserting the cart total (incl VAT) -->
    </div>
    `;
    }
}

onLoadCartNumbers();
// invoking the onLoadCartNumbers() function
displayCart();
// invoking the displayCart() function

//-----------------------------------------------------JQUERY--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    // The ready event occurs when the DOM (document object model) has been loaded.

    $("#hideBtn").click(function() {
        //Get the button with an id of "hideBtn", attaches an event listener to it
        $("#table1").hide();
        // select the table with an id of "table1" and attach a hide() method
        $("#table1Heading").hide();
        // select the heading with an id of "table1Heading1" and attach a hide() method
    });

    $("#showBtn").click(function() {
        //Get the button with an id of "showBtn", attaches an event listener to it
        $("#table1").show();
        // select the table with an id of "table1" and attach a show() method
        $("#table1Heading").show();
        // select the heading with an id of "table1Heading1" and attach a show() method
    });

    $(".accordian-title").hover(function() {
        /*An element with the class "accordian-title" is selected, a 'hover' event listener is added to the element
                     and a function is called when the element is hovered over. When the element is hovered over(accordian-title)
                     the 'closest' method returns the first ancestor of "accordian-title" which is "accordian-item" and adds
                     an active class to that element, then the 'find' method returns all "accordian-content" that descend under
                     "accordian-title" and a 'slideToggle' method is applied  */
        $(this)
            .closest(".accordian-item")
            .addClass("active")
            .find(".accordian-content")
            .slideToggle();

        return false;
    });

    function fork() {
        // This function allows for animation of the form element
        button = $("#form");
        button.animate({
            left: "200px",
        });

        button.animate({
            left: "0",
        });
    }
    fork(); //invoking the fork() function to run when the page loads
});