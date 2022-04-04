// local storage color
let localStorageColor = localStorage.getItem("main-color");

// colors list lis
const colorsli = document.querySelectorAll(".colors-list li");

// check if was main color in local storage
if (localStorageColor) {
  // set main color to root
  document.documentElement.style.setProperty("--main-color", localStorageColor);

  // loop on all lis
  colorsli.forEach(function (li) {
    // remove active from all lis
    li.classList.remove("active");

    // add active to main li color
    if (li.dataset.color === localStorageColor) {
      li.classList.add("active");
    }
  });
}

// switch colors

colorsli.forEach(function (li) {
  li.addEventListener("click", function (e) {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set item on local storage
    localStorage.setItem("main-color", e.target.dataset.color);
    handelActve(colorsli, e);
  });
});

// toggle spin on icon and toggle settings box
document.querySelector(".toggel-settings").onclick = function () {
  document.querySelector(".toggel-settings i").classList.toggle("fa-spin");
  this.parentElement.classList.toggle("open");
};

// switch random background option

// random background option
let bgOption = true;

// background interval variable
let backgroundInterval;

// check if was a bgOption on local storage
let bgOptionLoacalStorage = localStorage.getItem("randomBg-option");

// catch yes & no buttons
const randomBgel = document.querySelectorAll(".random-backgrounds span");

if (bgOptionLoacalStorage) {
  randomBgel.forEach(function (span) {
    span.classList.remove("active");
  });
  if (bgOptionLoacalStorage === "true") {
    bgOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    bgOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

randomBgel.forEach(function (span) {
  span.addEventListener("click", function (e) {
    handelActve(randomBgel, e);
    // check if active === yes
    if (e.currentTarget.dataset.bg === "yes") {
      // random background option
      bgOption = true;
      randomBg();
      localStorage.setItem("randomBg-option", true);
    } else {
      bgOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("randomBg-option", false);
    }
  });
});

// select landing page
let landingPage = document.querySelector(".landing-page");

// get array of images
let bgArrayImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomBg() {
  if (bgOption === true) {
    backgroundInterval = setInterval(function () {
      // get random number
      let randomNumber = Math.floor(Math.random() * bgArrayImgs.length);
      // change background image url
      landingPage.style.backgroundImage = `url("imgs/${bgArrayImgs[randomNumber]}")`;
    }, 5000);
  }
}

randomBg();

// our skills animation on scroll

// catch our skills section
let ourSkillsSection = document.querySelector(".our-skills");

// catch progress spans
let progSpans = document.querySelectorAll(
  ".our-skills .skill-box .progress span"
);

window.onscroll = function () {
  if (window.scrollY >= ourSkillsSection.offsetTop - 100) {
    progSpans.forEach(function (span) {
      span.style.width = span.dataset.prog;
    });
  }
};

// create popup box with img
let gallaryImgs = document.querySelectorAll(".gallary img");

gallaryImgs.forEach((img) => {
  img.addEventListener("click", function () {
    // create popup overlay
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    // create popup box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // create popup img
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    // append img to popup box
    popupBox.appendChild(popupImg);
    // append popup box to body
    document.body.appendChild(popupBox);

    // create popup box heading
    if (img.alt !== null) {
      let popupHeading = document.createElement("h4");
      let headingTxt = document.createTextNode(img.alt);
      popupHeading.appendChild(headingTxt);
      popupBox.prepend(popupHeading);
    }

    // create close span
    let popupClose = document.createElement("span");
    let closeTxt = document.createTextNode("X");
    popupClose.className = "close";
    popupClose.appendChild(closeTxt);
    popupBox.appendChild(popupClose);

    // close on click
    popupClose.addEventListener("click", function () {
      this.parentElement.remove();
      popupOverlay.remove();
    });
  });
});

// select all bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(navBullets);

// select bullets option
let bulletsOptionSpans = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalStorage = window.localStorage.getItem("bullets-option");

if (bulletsLocalStorage) {
  bulletsOptionSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalStorage === "yes") {
    bulletsContainer.style.display = "flex";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsOptionSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "no") {
      bulletsContainer.style.display = "none";
      window.localStorage.setItem("bullets-option", "no");
    } else {
      bulletsContainer.style.display = "flex";
      window.localStorage.setItem("bullets-option", "yes");
    }
    handelActve(bulletsOptionSpans, e);
  });
});

// reset option button
let resetBtn = document.querySelector(".settings-box .reset-options");

resetBtn.addEventListener("click", function () {
  window.localStorage.clear();
  location.reload();
});

// select all header links
const headerLinks = document.querySelectorAll(".landing-page ul.links a");
scrollToSection(headerLinks);

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handelActve(elements, ev) {
  // remove active from all elements
  elements.forEach(function (ele) {
    ele.classList.remove("active");
  });
  // add active
  ev.currentTarget.classList.add("active");
}

// toggle links menu
let menuIcon = document.querySelector(".landing-page .header i");
let linksMenu = document.querySelector(".landing-page .header ul.links");

menuIcon.addEventListener("click", function (e) {
  linksMenu.classList.toggle("open");
  e.target.classList.toggle("menu-active");
});

document.addEventListener("click", (e) => {
  if (e.target !== menuIcon && e.target !== linksMenu) {
    if (linksMenu.classList.contains("open")) {
      linksMenu.classList.remove("open");
      menuIcon.classList.remove("menu-active");
    }
  }
});

// stop propagation on menu
linksMenu.onclick = function (e) {
  e.stopPropagation();
};

// scroll to top button
let scrollTopBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 1000) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
