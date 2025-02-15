// Open Modal Function
function openModal(modalId) {
    if (event) event.preventDefault(); // Prevent page from jumping to the top
    document.getElementById(modalId).style.display = "flex";
}

// Close Modal Function
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close when clicking outside modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default jump
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50, // Adjust for header space
                behavior: "smooth"
            });
        }
    });
});

// Highlight Active Nav Link on Scroll
window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach(section => {
        let id = section.getAttribute("id");
        let navLink = document.querySelector(`a[href="#${id}"]`);
        
        if (
            section.offsetTop - 100 <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
        ) {
            document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
            if (navLink) {
                navLink.classList.add("active");
            }
        }
    });
});

// Shrinking Navigation on Scroll
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    
    if (window.scrollY > 50) {
        header.classList.add("shrink"); // Apply shrink styles
    } else {
        header.classList.remove("shrink"); // Revert back when at the top
    }
});


// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    name = name + "=";
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Function to check if the user has already accepted cookies
function checkCookieConsent() {
    const consent = getCookie("cookieConsent");
    
    if (!consent) { 
        // Only show the banner if no consent cookie exists
        document.getElementById("cookieConsent").style.display = "block";
    }
}

// Function to accept cookies and hide the banner
function acceptCookies() {
    setCookie("cookieConsent", "accepted", 365); // Save consent for 1 year
    document.getElementById("cookieConsent").style.display = "none"; // Hide the cookie banner
}

// Run check on page load
window.onload = function() {
    checkCookieConsent();
};
