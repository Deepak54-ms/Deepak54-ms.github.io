// js/script.js

async function loadHtml(id, url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${id}:`, error);
    }
}

async function loadPage(page) {
    // Load header, content, and footer
    await loadHtml('header', 'header.html');
    await loadHtml('content', `./${page}.html`);
    await loadHtml('footer', 'footer.html');

    // Close the navbar menu on mobile after selecting a page
    if (window.innerWidth < 768) {
        document.querySelector('.navbar-toggler').click();
    }

    // Get the navbar and content elements
    var navbar = document.querySelector('.navbar');
    var content = document.querySelector('#content');

    // Delay the calculation and application of the navbar height
    setTimeout(function() {
        // Calculate the height of the expanded navbar
        var navbarHeight = navbar.getBoundingClientRect().height;

        // Set the padding-top of the content
        content.style.paddingTop = navbarHeight + 'px';
    }, 350); // Adjust this delay as needed
}

// When burger menu is clicked
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    // Toggle the 'expanded' class on the navbar
    document.querySelector('.navbar').classList.toggle('expanded');
});

// Load the default page on initial load
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});