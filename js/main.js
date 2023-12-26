var bars = document.querySelector(".bars");
var barTop = document.querySelector(".top-bar");
var barBot = document.querySelector(".bot-bar");
var barMid = document.querySelector(".mid-bar");
var mBtns = Array.prototype.slice.call(
  document.querySelectorAll(".menu-box li a")
);
var slides = document.querySelectorAll(".slide");
slides[0].style.display = "block";
var currentSlide = 0;
var intervalID;
var sections = document.querySelectorAll('section');
var header = document.getElementById("header");
var timeoutActive;
var html = document.documentElement;

function barsX() {
  document.querySelector(".menu-box").classList.toggle("slide-in");
  document.body.classList.toggle("slide-left");
  barTop.classList.toggle("top-bar-x");
  barBot.classList.toggle("bot-bar-x");
  barMid.classList.toggle("mid-bar-x");
  bars.classList.toggle("bars-x");
}

(function () {
  for (var i = 0; i < mBtns.length; i++) {
    mBtns[i].addEventListener("click", barsX);
  }
})();

(function () {
  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("div");
    dot.classList.add("dot");
    document.querySelector(".dots-box").appendChild(dot);
  }
})();

function nextSlide() {
  clearInterval(intervalID);
  reveal(1);
  startInterval();
}

function prevSlide() {
  clearInterval(intervalID);
  reveal(-1);
  startInterval();
}

var dots = document.querySelectorAll(".dot");
dots[0].classList.add("active");

startInterval();

document.querySelector(".next-box").addEventListener("click", nextSlide);
document.querySelector(".next-box").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) nextSlide();
});
document.querySelector(".prev-box").addEventListener("click", prevSlide);
document.querySelector(".prev-box").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) prevSlide();
});

function reveal(x) {
  if (!timeoutActive) {
    if (currentSlide + x >= slides.length) {
      var i = 0;
    } else if (currentSlide + x < 0) {
      var i = slides.length - 1;
    } else {
      var i = currentSlide + x;
    }

    dots[currentSlide].classList.remove("active");
    dots[i].classList.add("active");

    if (x > 0) {
      slides[i].style.display = "inline-block";
      slides[i].classList.add("inR-L");
      slides[currentSlide].classList.add("outR-L");
      slides[currentSlide].classList.remove("inR-L");
      slides[currentSlide].classList.remove("inL-R");
      // slides[currentSlide].classList.remove("outR-L");
      timeoutActive = true;
      var timeOut = window.setTimeout(function () {
        slides[currentSlide].style.display = "none";
        slides[currentSlide].classList.remove("outR-L");
        currentSlide = i;
        timeoutActive = false;
      }, 500);
    } else if (x < 0) {
      slides[i].style.display = "block";
      slides[i].classList.add("inL-R");
      slides[currentSlide].classList.add("outL-R");
      slides[currentSlide].classList.remove("inL-R");
      slides[currentSlide].classList.remove("inR-L");
      timeoutActive = true;
      var timeOut = window.setTimeout(function () {
        slides[currentSlide].style.display = "none";
        slides[currentSlide].classList.remove("outL-R");
        currentSlide = i;
        timeoutActive = false;
      }, 500);
    }
  }
}

function startInterval() {
  intervalID = setInterval(function () {
    reveal(1);
  }, 6000);
}

window
  .addEventListener("keydown", function (e) {
    if (document.getElementById("slides") == document.activeElement) {
      if (e.keyCode == 39) {
        nextSlide();
      } else if (e.keyCode == 37) {
        prevSlide();
      } else if (e.keyCode == 80) {
        clearInterval(intervalID);
      } else if (e.keyCode == 82) {
        startInterval();
      }
    }
  })

revealSections();
window.addEventListener('scroll',function(e){
  revealSections();
});

function revealSections(){
  Array.prototype.forEach.call(sections, function (section) {
    var coord = section.getBoundingClientRect();
    var windowHeight = html.clientHeight;
    if (coord.top <= windowHeight * 0.65 || coord.bottom <= windowHeight) {
      section.classList.add("scroller");
    } else {
      section.classList.remove("scroller");
    }
  });
}

console.log(
  "Designed and Developed by:\n Yaseen AGailani \n https://gailani.dev"
);
