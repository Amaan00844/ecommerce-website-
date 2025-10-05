// Search functionality for products page
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#nav-search input');
    const searchButton = document.querySelector('#nav-search span');
    const productCards = document.querySelectorAll('.product_card');

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // If search term is empty, show all products
        if (searchTerm === '') {
            productCards.forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }

        // Filter products based on search term
        productCards.forEach(card => {
            const productTitle = card.querySelector('h4').textContent.toLowerCase();
            const productCategory = card.dataset.category.toLowerCase();

            // Show product if title or category contains search term
            if (productTitle.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listener to search button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Add event listener for Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
});