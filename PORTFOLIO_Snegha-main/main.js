// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("theme-toggle");

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            // Save the current theme in localStorage
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }

    // Dynamic Typing Effect (only for home page)
    const dynamicText = document.querySelector("#dynamic-text");
    
    if (dynamicText) {
        const words = [
            "a Data Engineer.",
            "a Software Engineer.",
            "a Programmer.",
            "an AI Enthusiast.",
            "a Doodler.",
            "a Fullstack developer."
        ];
        let wordIndex = 0;
        let charIndex = 0;

        function typeEffect() {
            if (charIndex < words[wordIndex].length) {
                dynamicText.textContent += words[wordIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100);
            } else {
                setTimeout(eraseEffect, 2000);
            }
        }

        function eraseEffect() {
            if (charIndex > 0) {
                dynamicText.textContent = words[wordIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseEffect, 50);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 1000);
            }
        }

        // Start the typing effect
        typeEffect();
    }
});

// Lightbox Functionality
let currentImageIndex = 0;
let currentImageList = [];

function openLightbox(imageList, startIndex = 0) {
    currentImageIndex = startIndex;
    currentImageList = imageList;

    // Remove existing lightbox if any
    const existingLightbox = document.getElementById("lightbox");
    if (existingLightbox) {
        document.body.removeChild(existingLightbox);
    }

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const image = document.createElement("img");
    image.src = imageList[startIndex];
    image.className = "lightbox-image";
    image.id = "lightbox-image";
    image.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;

    const closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1001;
    `;
    closeBtn.onclick = closeLightbox;

    const prevBtn = document.createElement("span");
    prevBtn.className = "prev";
    prevBtn.innerHTML = "&#10094;";
    prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        padding: 16px;
        user-select: none;
        z-index: 1001;
    `;
    prevBtn.onclick = showPrevImage;

    const nextBtn = document.createElement("span");
    nextBtn.className = "next";
    nextBtn.innerHTML = "&#10095;";
    nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        padding: 16px;
        user-select: none;
        z-index: 1001;
    `;
    nextBtn.onclick = showNextImage;

    // Hide navigation buttons if only one image
    if (imageList.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(image);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        document.body.removeChild(lightbox);
    }
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById("lightbox-image");
    if (image) {
        image.src = currentImageList[currentImageIndex];
    }
}

// Keyboard support for lightbox
document.addEventListener("keydown", function (e) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        if (e.key === "ArrowRight") showNextImage();
        else if (e.key === "ArrowLeft") showPrevImage();
        else if (e.key === "Escape") closeLightbox();
    }
});