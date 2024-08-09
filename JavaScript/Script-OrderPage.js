document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');  // The form where users select items to order
    const orderTableBody = document.querySelector('#order-table tbody');  // The table body where ordered items will be displayed
    const totalPriceElement = document.getElementById('total-price');  // Element to display the total price
    const buyNowButton = document.getElementById('buy-now-button');  // Button to proceed to the payment page
    const saveFavouriteButton = document.getElementById('save-favourite-button');  // Button to save the current order to favourites
    const applyFavouriteButton = document.getElementById('apply-favourite-button');  // Button to apply the saved favourite order

    let orderItems = [];  // Array to store ordered items
    let totalPrice = 0;  // Variable to keep track of the total price

    // Images associated with the items, linked from the CSS stylesheet
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
        37: '../grocies_images/Order_img/wheatFlour-order (2).png',
        38: '../grocies_images/Order_img/sugar-order (2).png',
        39: '../grocies_images/Order_img/Cinnamon-order.png',
        40: '../grocies_images/Order_img/vanilla-order.png',
    };

    // Event listener for handling form submission when the user selects items
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the default form submission behavior
        const formData = new FormData(orderForm);  // Collect form data
        let itemsAdded = false;  // Flag to track if any items were added to the cart

        orderItems = []; // Clear previous items to avoid duplicates

        // Loop through the possible items (assuming up to 40 items)
        for (let i = 1; i <= 40; i++) {
            const itemName = formData.get(`itemName${i}`);  // Get item name
            const quantity = parseFloat(formData.get(`quantity${i}`));  // Get quantity
            const price = parseFloat(formData.get(`price${i}`));  // Get price

            // Check if the item has a valid name, quantity, and price
            if (itemName && !isNaN(quantity) && !isNaN(price) && quantity > 0) {
                const imgSrc = imgSources[i];  // Get image source
                const unit = i <= 16 || (i >= 25 && i <= 32) ? 'Kg' : 'Units';  // Determine the unit (Kg for certain items, Units for others)
                orderItems.push({ imgSrc, itemName, quantity, price, unit });  // Add item to the order
                itemsAdded = true;  // Set flag to true indicating items were added
            }
        }

        if (itemsAdded) {
            updateOrderTable();  // Update the order table to display the selected items
            alert("Your items were added to cart!");  // Alert the user that items were added
        } else {
            alert("No items selected!");  // Alert the user that no items were selected
        }
    });

    // Event listener for removing items from the cart
    orderTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.dataset.index;  // Get the index of the item to remove
            orderItems.splice(index, 1);  // Remove the item from the order array
            updateOrderTable();  // Update the order table to reflect the removal
        }
    });

    // Event listener for the "Buy Now" button to proceed to payment
    buyNowButton.addEventListener('click', () => {
        localStorage.setItem('orderItems', JSON.stringify(orderItems));  // Save the current order items to local storage
        window.location.href = '../grocies_webpages/Checkout.html';  // Redirect to the checkout page
    });

    // Event listener for the "Save to Favourites" button
    saveFavouriteButton.addEventListener('click', () => {
        localStorage.setItem('favouriteOrder', JSON.stringify(orderItems));  // Save the current order as favourite
        alert("Your items were added to favourites!");  // Alert the user that items were saved to favourites
    });

    // Event listener for the "Apply Favourites" button to load saved favourite items
    applyFavouriteButton.addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));  // Retrieve favourite items from local storage
        if (favouriteOrder) {
            orderItems = favouriteOrder;  // Apply the favourite items to the current order
            updateOrderTable();  // Update the order table to display the favourite items
            populateFormWithFavourites();  // Populate the form fields with the favourite items
            alert("Favourite items have been applied to your order!");  // Alert the user that favourites were applied
        } else {
            alert("No favourite items found!");  // Alert the user if no favourite items were found
        }
    });

    // Function to update the order table with the selected items
    function updateOrderTable() {
        orderTableBody.innerHTML = '';  // Clear the current table
        totalPrice = 0;  // Reset total price

        // Loop through the ordered items and add them to the table
        orderItems.forEach(({ imgSrc, itemName, quantity, price, unit }, index) => {
            const row = document.createElement('tr');  // Create a new table row
            row.innerHTML = `
                <td>
                    <img src="${imgSrc}" alt="${itemName}" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>${itemName}</div>
                </td>
                <td>${quantity} ${unit}</td>
                <td>Rs ${price.toFixed(2)}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;  // Populate the row with item details
            orderTableBody.appendChild(row);  // Add the row to the table body
            totalPrice += price * quantity;  // Add to the total price
        });

        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;  // Update the total price element
    }

    // Function to populate the form with favourite items
    function populateFormWithFavourites() {
        orderItems.forEach(({ itemName, quantity, price }, index) => {
            const itemNameInput = document.querySelector(`input[name="itemName${index + 1}"]`);
            const quantityInput = document.querySelector(`input[name="quantity${index + 1}"]`);
            const priceInput = document.querySelector(`input[name="price${index + 1}"]`);

            if (itemNameInput) {
                itemNameInput.value = itemName;  // Set the item name in the form
            }
            if (quantityInput) {
                quantityInput.value = quantity;  // Set the quantity in the form
            }
            if (priceInput) {
                priceInput.value = price;  // Set the price in the form
            }
        });
    }
});
