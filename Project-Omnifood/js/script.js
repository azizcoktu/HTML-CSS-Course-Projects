// DOM Elements
const copyrightYearEl = document.querySelector(
  ".section-footer .copyright .today-year"
);
const headerEl = document.querySelector(".header");
const mobileNavOpenCloseEl = document.querySelectorAll(".btn-mobile-nav");
const linkEls = document.querySelectorAll("a:link");
const sectionHero = document.querySelector(".section-hero");

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

// Automatically updating the year written in copyright notice.
const updateCopyrightYear = function () {
  copyrightYearEl.innerHTML = String(new Date().getFullYear());
};

// Controls the sticky navigation by using intersectionObserver API.

const observer = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0.05,
  }
);

observer.observe(sectionHero);

// Event handler for mobile nav. open/close button clicks.
const openCloseNavMenu = function () {
  headerEl.classList.toggle("nav-open");
};

// Closes the mobile nav menu
const closeNavMenu = function () {
  headerEl.classList.remove("nav-open");
};

// Event handler for smooth scrolling on nav elements
const smoothScrollTo = function (event) {
  event.preventDefault();
  try {
    const targetEl = document.querySelector(this.getAttribute("href"));
    targetEl.scrollIntoView({ behavior: "smooth" });
  } catch (e) {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    return;
  } finally {
    // close the mobile menu if open.
    closeNavMenu();
  }
};

checkFlexGap();
updateCopyrightYear();
mobileNavOpenCloseEl.forEach((btnEl) =>
  btnEl.addEventListener("click", openCloseNavMenu)
);
linkEls.forEach((el) => el.addEventListener("click", smoothScrollTo));

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
