document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();

            if (!name || !email || !address) {
                alert('Please fill in all required fields.');
                return;
            }

            // Save shipping info to localStorage to use in payment page
            localStorage.setItem('shippingInfo', JSON.stringify({
                name,
                email,
                phone,
                address
            }));

            // Redirect to payment page
            window.location.href = 'payment.html';
        });
    }
});
