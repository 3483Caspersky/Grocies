document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const orderForm = document.getElementById('order-form');
    const orderTableBody = document.querySelector('#order-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now-button');
    const saveFavouriteButton = document.getElementById('save-favourite-button');
    const applyFavouriteButton = document.getElementById('apply-favourite-button');

    let orderItems = [];  // Array to store order items
    let totalPrice = 0;  // Variable to keep track of total price
//Images of the order page which is linked from the css stylesheet
    const imgSources = {
        1: '../grocies_images/Order_img/strawberry-order.png',
        2: '../grocies_images/Order_img/mango-order.png',
        3: '../grocies_images/Order_img/grapes-order.png',
        4: '../grocies_images/Order_img/Pomegranate-order.png',
        5: '../grocies_images/Order_img/mangosteen-order.png',
        6: '../grocies_images/Order_img/watermelon-order.png',
        7: '../grocies_images/Order_img/apple-order.png',
        8: '../grocies_images/Order_img/pineapple-order.png',
        9: '../grocies_images/Order_img/capsicum-order.png',
        10: '../grocies_images/Order_img/corn-order.png',
        11: '../grocies_images/Order_img/onion-order.png',
        12: '../grocies_images/Order_img/pumpkin-order.png',
        13: '../grocies_images/Order_img/potato-order.png',
        14: '../grocies_images/Order_img/red cabbage-order.png',
        15: '../grocies_images/Order_img/tomatoes-order.png',
        16: '../grocies_images/Order_img/saladleaves-order.png',
        17: '../grocies_images/Order_img/hursheys_dairy.png',
        18: '../grocies_images/Order_img/bluecheese_dairy.png',
        19: '../grocies_images/Order_img/freshmilk_dairy.png',
        20: '../grocies_images/Order_img/dairymilkchoc_dairy.png',
        21: '../grocies_images/Order_img/cheese_dairy.png',
        22: '../grocies_images/Order_img/milkachoc_dairy.png',
        23: '../grocies_images/Order_img/imorichicecream_dairy.png',
        24: '../grocies_images/Order_img/yogurt_dairy.png',
        25: '../grocies_images/Order_img/chicken-order.png',
        26: '../grocies_images/Order_img/TunaFish-order.png',
        27: '../grocies_images/Order_img/prawns-order.png',
        28: '../grocies_images/Order_img/beef-order.png',
        29: '../grocies_images/Order_img/chickenDrumsticks-order.png',
        30: '../grocies_images/Order_img/sausages-order.png',
        31: '../grocies_images/Order_img/mackerel-order.png',
        32: '../grocies_images/Order_img/meatBalls-order.png',
        33: '../grocies_images/Order_img/bakingSoda-order.png',
        34: '../grocies_images/Order_img/ChilliPowder-order.png',
        35: '../grocies_images/Order_img/Salt-order.png',
        36: '../grocies_images/Order_img/cocoaPowder-order.png',
        37: '../grocies_images/Order_img/wheatFlour-order\ \(2\).png',
        38: '../grocies_images/Order_img/sugar-order\ \(2\).png',
        39: '../grocies_images/Order_img/Cinnamon-order.png',
        40: '../grocies_images/Order_img/vanilla-order.png',
    };
 // Event listener for form submission
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();   // Prevent form from submitting in the traditional way
        const formData = new FormData(orderForm);  // Gather form data
        let itemsAdded = false;   // Flag to check if any items were added

        for (let i = 1; i <= 40; i++) {
            const itemName = formData.get(`itemName${i}`);
            const quantity = parseFloat(formData.get(`quantity${i}`));
            const price = parseFloat(formData.get(`price${i}`));
             // Check if valid item details are provided
            if (itemName && !isNaN(quantity) && !isNaN(price) && quantity > 0) {
                const imgSrc = imgSources[i];
                const unit = i <= 16 || (i >= 25 && i <= 32) ? 'Kg' : 'Units'; // Determine unit type
                orderItems.push({ imgSrc, itemName, quantity, price, unit });
                itemsAdded = true;
             // Reset quantity input to its placeholder value
                const quantityInput = document.querySelector(`input[name="quantity${i}"]`);
                if (quantityInput) {
                    quantityInput.value = quantityInput.placeholder;
                }
            }
        }
         // If items were added, update the order table
        if (itemsAdded) {
            updateOrderTable();
            alert("Your items were added to cart!");
        } else {
            alert("No items selected!");  // Alert if no items were added
        }
    });
     // Event listener for removing items from the table
    orderTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.dataset.index;
            orderItems.splice(index, 1);  // Remove item from the array
            updateOrderTable();  // Update the table

        }
    });
    // Event listener for the 'Buy Now' button
    buyNowButton.addEventListener('click', () => {
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = '../grocies_webpages/Checkout.html';
    });
    // Event listener for the 'Add to Favourites' button
    saveFavouriteButton.addEventListener('click', () => {
        localStorage.setItem('favouriteOrder', JSON.stringify(orderItems));
        alert("Your items were added to favourites!");
    });
    // Event listener for the 'Apply Favourites' button
    applyFavouriteButton.addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            orderItems = favouriteOrder;
            updateOrderTable();  // Update the order table with favourites
            populateFormWithFavourites();  // Populate form with favourite items
            alert("Favourite items have been applied to your order!");
        } else {
            alert("No favourite items found!");   // Alert if no favourites were found
        }
        }
    });
    // Function to update the order table
    function updateOrderTable() {
        orderTableBody.innerHTML = '';  // Clear the existing table rows
        totalPrice = 0;  // Reset total price

        orderItems.forEach(({ imgSrc, itemName, quantity, price, unit }, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${imgSrc}" alt="${itemName}" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>${itemName}</div>
                </td>
                <td>${quantity} ${unit}</td>
                <td>Rs ${price.toFixed(2)}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
            orderTableBody.appendChild(row); // Add the row to the table
            totalPrice += price * quantity; // Update total price
        });

        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`; // Display the total price
    }

   
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const orderTableBody = document.querySelector('#order-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now-button');

    let orderItems = [];
    let totalPrice = 0;
//Images of the order page which is linked from the css stylesheet
    const imgSources = {
        1: '../grocies_images/Order_img/strawberry-order.png',
        2: '../grocies_images/Order_img/mango-order.png',
        3: '../grocies_images/Order_img/grapes-order.png',
        4: '../grocies_images/Order_img/Pomegranate-order.png',
        5: '../grocies_images/Order_img/mangosteen-order.png',
        6: '../grocies_images/Order_img/watermelon-order.png',
        7: '../grocies_images/Order_img/apple-order.png',
        8: '../grocies_images/Order_img/pineapple-order.png',
        9: '../grocies_images/Order_img/capsicum-order.png',
        10: '../grocies_images/Order_img/corn-order.png',
        11: '../grocies_images/Order_img/onion-order.png',
        12: '../grocies_images/Order_img/pumpkin-order.png',
        13: '../grocies_images/Order_img/potato-order.png',
        14: '../grocies_images/Order_img/red\ cabbage-order.png',
        15: '../grocies_images/Order_img/tomatoes-order.png',
        16: '../grocies_images/Order_img/saladleaves-order.png',
        17: '../grocies_images/Order_img/hursheys_dairy.png',
        18: '../grocies_images/Order_img/bluecheese_dairy.png',
        19: '../grocies_images/Order_img/freshmilk_dairy.png',
        20: '../grocies_images/Order_img/dairymilkchoc_dairy.png',
        21: '../grocies_images/Order_img/cheese_dairy.png',
        22: '../grocies_images/Order_img/milkachoc_dairy.png',
        23: '../grocies_images/Order_img/imorichicecream_dairy.png',
        24: '../grocies_images/Order_img/yogurt_dairy.png',
        25: '../grocies_images/Order_img/chicken-order.png',
        26: '../grocies_images/Order_img/TunaFish-order.png',
        27: '../grocies_images/Order_img/prawns-order.png',
        28: '../grocies_images/Order_img/beef-order.png',
        29: '../grocies_images/Order_img/chickenDrumsticks-order.png',
        30: '../grocies_images/Order_img/sausages-order.png',
        31: '../grocies_images/Order_img/mackerel-order.png',
        32: '../grocies_images/Order_img/meatBalls-order.png',
        33: '../grocies_images/Order_img/bakingSoda-order.png',
        34: '../grocies_images/Order_img/ChilliPowder-order.png',
        35: '../grocies_images/Order_img/Salt-order.png',
        36: '../grocies_images/Order_img/cocoaPowder-order.png',
        37: '../grocies_images/Order_img/wheatFlour-order\ \(2\).png',
        38: '../grocies_images/Order_img/sugar-order\ \(2\).png',
        39: '../grocies_images/Order_img/Cinnamon-order.png',
        40: '../grocies_images/Order_img/vanilla-order.png',
    };

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(orderForm);
        let itemsAdded = false;

        orderItems = []; // to Clear previous items

        for (let i = 1; i <= 40; i++) {
            const itemName = formData.get(`itemName${i}`);
            const quantity = parseFloat(formData.get(`quantity${i}`));
            const price = parseFloat(formData.get(`price${i}`));

            if (itemName && !isNaN(quantity) && !isNaN(price) && quantity > 0) {
                const imgSrc = imgSources[i];
                const unit = i <= 16 || (i >= 25 && i <= 32) ? 'Kg' : 'Units';
                orderItems.push({ imgSrc, itemName, quantity, price, unit });
                itemsAdded = true;
            }
        }

        if (itemsAdded) {
            updateOrderTable();
            alert("Your items were added to cart!");
        } else {
            alert("No items selected!");
        }
    });

    buyNowButton.addEventListener('click', () => {
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = '../grocies_webpages/Checkout.html'; 
    });

    function updateOrderTable() {
        orderTableBody.innerHTML = '';
        totalPrice = 0;

        orderItems.forEach(({ imgSrc, itemName, quantity, price, unit }, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${imgSrc}" alt="${itemName}" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>${itemName}</div>
                </td>
                <td>${quantity} ${unit}</td>
                <td>Rs ${price.toFixed(2)}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
            orderTableBody.appendChild(row);
            totalPrice += price * quantity;
        });

        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
    }
});
// Function to populate the form with favourite items
 function populateFormWithFavourites() {
        orderItems.forEach(({ itemName, quantity, price }, index) => {
            const itemNameInput = document.querySelector(`input[name="itemName${index + 1}"]`);
            const quantityInput = document.querySelector(`input[name="quantity${index + 1}"]`);
            const priceInput = document.querySelector(`input[name="price${index + 1}"]`);

            if (itemNameInput) {
                itemNameInput.value = itemName; // Set the item name in the form
            }
            if (quantityInput) {
                quantityInput.value = quantity; // Set the quantity in the form
            }
            if (priceInput) {
                priceInput.value = price; // Set the price in the form
            }
        });
    }
});