function loadPage(page) {
    // Load content based on the selected page
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => document.getElementById('content').innerHTML = html)
        .catch(error => console.error('Error loading page:', error));

    // Close the navbar menu on mobile after selecting a page
    if (window.innerWidth < 768) {
        document.querySelector('.navbar-toggler').click();
    }
}

// Load the default page on initial load
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});
