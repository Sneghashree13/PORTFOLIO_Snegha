// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("theme-toggle");

    // Check for saved theme in localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    themeToggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Save the current theme in localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Dynamic Typing Effect
    const dynamicText = document.querySelector("#dynamic-text");

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
});
