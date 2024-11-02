let currentIndex1 = 1;
const totalSlides = 3;

function autoSwitchSlides() {
    currentIndex1 = currentIndex1 % totalSlides + 1;
    document.getElementById(`item-${currentIndex1}`).checked = true;
}

setInterval(autoSwitchSlides, 6000);

document.addEventListener('DOMContentLoaded', () => {
    // General function to initialize a carousel
    function initializeCarousel(carouselId, nextBtnId, prevBtnId) {
        const carousel = document.getElementById(carouselId);
        const nextBtn = document.getElementById(nextBtnId);
        const prevBtn = document.getElementById(prevBtnId);

        // Track the current index
        let currentIndex = 0;
        const totalCards = carousel.children.length; // Total number of cards
        const visibleCards = 4; // Number of visible cards

        // Check if there are any cards to manage
        if (totalCards > 0) {
            const cardWidth = carousel.querySelector('.product-card').offsetWidth; // Width of a single card

            // Function to update carousel view
            function updateCarousel() {
                // Move by one card width with an extra margin for smooth transition
                const offset = currentIndex * cardWidth;
                carousel.style.transform = `translateX(-${offset}px)`;

                // Disable buttons based on current index
                nextBtn.disabled = currentIndex >= totalCards - visibleCards;
                prevBtn.disabled = currentIndex === 0;
            }

            // Event listeners for the buttons
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalCards - 1) { // Change this condition
                    currentIndex++; // Move one card forward
                    updateCarousel();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--; // Move one card backward
                    updateCarousel();
                }
            });

            // Initialize carousel state
            updateCarousel();

            // Optional: Add swipe functionality for touch devices
            let startX = 0;

            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            carousel.addEventListener('touchmove', (e) => {
                const moveX = e.touches[0].clientX - startX;
                if (moveX > 50) { // Swipe right
                    if (currentIndex > 0) {
                        currentIndex--; // Move one card backward
                        updateCarousel();
                    }
                    startX = 0; // Reset
                } else if (moveX < -50) { // Swipe left
                    if (currentIndex < totalCards - 1) { // Change this condition
                        currentIndex++; // Move one card forward
                        updateCarousel();
                    }
                    startX = 0; // Reset
                }
            });
        } else {
            console.warn(`No cards found in ${carouselId}.`);
        }
    }

    // Initialize all carousels
    initializeCarousel('proteinCarousel', 'protein-next-btn', 'protein-prev-btn');
    initializeCarousel('preworkoutCarousel', 'preworkout-next-btn', 'preworkout-prev-btn');
    initializeCarousel('creatineCarousel', 'creatine-next-btn', 'creatine-prev-btn');
});

const reviewContainer = document.getElementById('reviewContainer');
const reviewIndicators = document.querySelectorAll('.review-indicator');

// Function to update indicators based on scroll position
reviewContainer.addEventListener('scroll', () => {
    const scrollPosition = reviewContainer.scrollLeft;
    const containerWidth = reviewContainer.offsetWidth;
    const reviewIndex = Math.round(scrollPosition / containerWidth);

    reviewIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === reviewIndex);
    });
});

// Function to scroll to a specific card on indicator click
function scrollToReview(index) {
    const containerWidth = reviewContainer.offsetWidth;
    reviewContainer.scrollTo({
        left: containerWidth * index,
        behavior: 'smooth'
    });
}

window.addEventListener("load", enableHoverSound);

function enableHoverSound() {
    const productCards = document.querySelectorAll('.product-card');
    const hoverSound = document.getElementById("hover-sound");

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

    const navButtons = document.querySelectorAll('.arrow');
    const clickSound = document.getElementById("click-sound");

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0; // Reset audio to the start
            clickSound.play();          // Play the sound on click
        });
    });

}

// GSAP Animation for product cards
window.onload = function () {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        gsap.to(card, {
            y: 0, // Move to final position
            opacity: 1, // Fade in
            duration: 0.5, // Duration of the animation
            delay: index * 0.1, // Stagger the animation
            ease: "bounce.out" // Bounce easing function
        });

        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.1, // Enlarge on hover
                duration: 0.1, // Duration of the hover effect
                ease: "power1.out" // Easing for hover
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1, // Return to original size
                duration: 0.2, // Duration of the return effect
                ease: "power1.out" // Easing for return
            });
        });
    });
};

const scrollContainer = document.getElementById("scroll-container");
const nextBtn = document.getElementById("guide-next-btn");
const prevBtn = document.getElementById("guide-prev-btn");

// Set scroll amount
const scrollAmount = 300;

// Scroll to the next container
nextBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Scroll to the previous container
prevBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
