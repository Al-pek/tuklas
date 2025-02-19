import "./pages/home/home.js";
import "./pages/why/why.js";
import "./pages/vision/vision.js";
import "./pages/history/history.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const exploreBtn = document.querySelector(".explore-btn");
  const hamburger = document.querySelector(".hamburger");
  const navItems = document.querySelector(".nav-items");
  const navItemsA = document.querySelectorAll(".nav-items a");
  const destinationItems = document.querySelectorAll(".destination-item");

  // Function to handle section scrolling based on hash
  function scrollToHashSection() {
    const hash = window.location.hash;
    const sectionMapping = {
      "#about": ".about.container",
      "#destinations": ".destinations.container",
      "#vision": ".vision.container",
      "#history": ".history.container",
    };

    const sectionSelector = sectionMapping[hash];
    if (sectionSelector) {
      const section = document.querySelector(sectionSelector);
      if (section) {
        // Scroll to the section after a short delay to ensure page is fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }

  // Call the scroll function on page load
  scrollToHashSection();

   // Add click event listener to the "Learn More" button
   const learnMoreBtn = document.getElementById("learn-more-btn");
   learnMoreBtn.addEventListener("click", () => {
     history.pushState(null, "", "#history"); // Update URL hash
     scrollToHashSection(); // Scroll to the section
   });
 

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Add scroll state classes
      header.classList.add("scrolled");
      exploreBtn.classList.add("scrolled");
      navItems.classList.add("scrolled");
      hamburger.classList.add("scrolled");
    } else {
      // Remove scroll state classes
      header.classList.remove("scrolled");
      exploreBtn.classList.remove("scrolled");
      navItems.classList.remove("scrolled");
      hamburger.classList.remove("scrolled");
    }
  });

  // Add click event listener to each nav item
  navItemsA.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior

      // Get the text of the clicked nav item
      const navText = item.textContent.toUpperCase();

      // Map navigation text to corresponding section classes
      const sectionMapping = {
        HOME: ".home.container",
        "ABOUT US": ".about.container",
        DESTINATIONS: ".destinations.container",
        VISION: ".vision.container",
        HISTORY: ".history.container",
      };

   
      // Find the corresponding section
      const sectionSelector = sectionMapping[navText];

      const section = document.querySelector(sectionSelector);

      if (section) {
        // Update URL hash without triggering page reload
        history.pushState(
          null,
          "",
          sectionMapping[navText] === ".home.container"
            ? "./"
            : `#${navText.replace(/\s+/g, "-").toLowerCase()}`
        );

        // Smooth scroll to the section
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  destinationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const destinationType = item
        .querySelector("h3")
        .textContent.toLowerCase();

      // Map destination types to their respective page URLs
      const destinationPages = {
        malls: "./pages/destination/malls/malls.html",
        churches: "./pages/destination/churches/churches.html",
        parks: "./pages/destination/parks/parks.html",
        history: "./pages/destination/history/history.html",
      };

      // Navigate to the corresponding destination page
      if (destinationPages[destinationType]) {
        window.location.href = destinationPages[destinationType];
      }
    });
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navItems.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-items a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navItems.classList.remove("active");
    });
  });
});
