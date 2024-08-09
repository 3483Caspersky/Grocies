document.addEventListener('DOMContentLoaded', () => {
      // Get references to the DOM elements
    const checkoutForm = document.getElementById('checkout-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const deliveryDateElement = document.getElementById('delivery-date');
    const orderSummaryTableBody = document.querySelector('#order-table tbody'); 
    const totalPriceElement = document.getElementById('total-price');

     // Function to populate the order summary table with items from local storage
    function populateOrderSummary() {
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || []; // Retrieve order items from localStorage
        let total = 0;
     // Loop through each item and create a row in the order summary table
        orderItems.forEach(item => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const priceCell = document.createElement('td');
            // Populate the row cells with item data
            nameCell.textContent = item.itemName; 
            quantityCell.textContent = `${item.quantity} ${item.unit}`; 
            priceCell.textContent = `Rs ${item.price.toFixed(2)}`;
            // Append the cells to the row
            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
             // Append the row to the table body
            orderSummaryTableBody.appendChild(row);
             // Calculate the total price
            total += item.price * item.quantity;
        });
        // Update the total price element
        totalPriceElement.textContent = `Rs ${total.toFixed(2)}`;
    }

    // Populate the order summary table when the page loads
    populateOrderSummary();
    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Check if the form is valid before proceeding
        if (checkoutForm.checkValidity()) {
            // Calculating delivery date (eg- 3 days from now)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3);
             // Format the delivery date to a readable string
            const formattedDate = deliveryDate.toLocaleDateString(undefined, { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });

            // Displaying the delivery date and thank you message
            deliveryDateElement.textContent = formattedDate;
            thankYouMessage.style.display = 'block';

            // Hide the checkout form
            checkoutForm.style.display = 'none';

            // clearing the form after submission
            checkoutForm.reset();
        } else {
            // Alert the user if the form is not valid
            alert("Please fill out all required fields correctly.");
        }
    });
});
