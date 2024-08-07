document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const deliveryDateElement = document.getElementById('delivery-date');
    const orderSummaryTableBody = document.querySelector('#order-table tbody'); 
    const totalPriceElement = document.getElementById('total-price');

    // Function to populate the order summary table
    function populateOrderSummary() {
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
        let total = 0;

        orderItems.forEach(item => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const priceCell = document.createElement('td');

            nameCell.textContent = item.itemName; 
            quantityCell.textContent = `${item.quantity} ${item.unit}`; 
            priceCell.textContent = `Rs ${item.price.toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            orderSummaryTableBody.appendChild(row);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Rs ${total.toFixed(2)}`;
    }

    // Populate the order summary table on page load
    populateOrderSummary();

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Performing form validation
        if (checkoutForm.checkValidity()) {
            // Calculating delivery date (eg- 3 days from now)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3);
            const formattedDate = deliveryDate.toLocaleDateString(undefined, { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });

            // Displaying the the thank you message
            deliveryDateElement.textContent = formattedDate;
            thankYouMessage.style.display = 'block';

            // Hide the checkout form
            checkoutForm.style.display = 'none';

            // clearing the form after submission
            checkoutForm.reset();
        } else {
            alert("Please fill out all required fields correctly.");
        }
    });
});
