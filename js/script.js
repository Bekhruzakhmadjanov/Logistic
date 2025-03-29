function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0; // Start with the first slide
    const slides = document.querySelectorAll('.testimonial-card');

    // Function to show the current slide and hide others
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Go to the next slide, loop back to the beginning if at the end
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Go to the previous slide, loop to the last if at the beginning
        showSlide(currentSlide);
    }

    // Initialize the carousel to show the first slide
    showSlide(currentSlide);

    // Attach the next and prev functions to buttons
    document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);
});

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
function submitConsent() {
    const privacy = document.getElementById('privacyCheck').checked;
    const disclaimer = document.getElementById('disclaimerCheck').checked;
    const sms = document.getElementById('smsCheck').checked;
  
    // if (!privacy || !disclaimer || !sms) {
    //   alert("Please check all boxes to continue.");
    //   return;
    // }
  
    setCookie("cookieConsent", "accepted", 365);
    document.getElementById("cookieConsent").style.display = "none";
  }
  
  function rejectConsent() {
    setCookie("cookieConsent", "rejected", 365);
    document.getElementById("cookieConsent").style.display = "none";
  }
  
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
  }
  

// Run check on page load
window.onload = function () {
    if (document.cookie.indexOf("cookieConsent") === -1) {
      document.getElementById("cookieConsent").style.display = "flex";
    }
  };
  