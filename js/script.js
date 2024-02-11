function loadPage(page) {
    // Load content based on the selected page
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

    // Load the footer
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
}

// Load the default page on initial load
document.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});
