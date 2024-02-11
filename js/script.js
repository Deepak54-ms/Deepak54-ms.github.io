// js/script.js

// Function to load HTML from a given URL into a specified element
async function loadHtml(id, url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${id}:`, error);
    }
}

// Function to handle navigation clicks and prevent default action
async function handleNavigation(event, page) {
    event.preventDefault();
    try {
        await loadPage(page);
    } catch (error) {
        console.error(`Error in navigation to page ${page}:`, error);
    }
}

// Function to load a page (header, content, and footer)
async function loadPage(page) {
    try {
        // Load header, content, and footer
        await loadHtml('header', 'header.html');
        await loadHtml('content', `./${page}.html`);
        await loadHtml('footer', 'footer.html');
    } catch (error) {
        console.error(`Error loading page ${page}:`, error);
    }

    // Close the navbar menu on mobile after selecting a page
    if (window.innerWidth < 768) {
        document.querySelector('.navbar-toggler').click();
    }

    // Get the navbar and body elements
    let navbar = document.querySelector('.navbar');
    let body = document.querySelector('body');

    // Delay the calculation and application of the navbar height
    setTimeout(function() {
        // Calculate the height of the expanded navbar
        let navbarHeight = navbar.getBoundingClientRect().height;

        // Set the padding-top of the body
        body.style.paddingTop = navbarHeight + 'px';
    }, 60); // Adjust this delay as needed
}

// When burger menu is clicked, toggle the 'expanded' class on the navbar
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('expanded');
});

// Load the default page on initial load
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});