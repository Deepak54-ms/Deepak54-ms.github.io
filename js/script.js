// js/script.js

function loadPage(page) {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load content
    fetch(`./${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary div to parse the HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extract the content from the temporary div
            const content = tempDiv.querySelector('#content').innerHTML;

            // Set the content to the actual content container
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error loading page:', error));

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Close the navbar menu on mobile after selecting a page
    if (window.innerWidth < 768) {
        document.querySelector('.navbar-toggler').click();
    }

    // Get the navbar, header, and content elements
    var navbar = document.querySelector('.navbar');
    var header = document.querySelector('header');
    var content = document.querySelector('.content');

    // Get the burger menu button
    var burgerMenu = document.querySelector('.navbar-toggler');

    // When burger menu is clicked
    burgerMenu.addEventListener('click', function() {
        // Delay the calculation and application of the navbar height
        setTimeout(function() {
            // Calculate the height of the expanded navbar
            var navbarHeight = navbar.getBoundingClientRect().height;

            // Set the margin-top of the header and content
            header.style.marginTop = navbarHeight + 'px';
            content.style.marginTop = navbarHeight + 'px';
        }, 350); // Adjust this delay as needed
    });

    // Toggle the 'expanded' class on the navbar when burger menu is clicked
    burgerMenu.addEventListener('click', function() {
        document.querySelector('.navbar').classList.toggle('expanded');
    });
}

// Load the default page on initial load
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});