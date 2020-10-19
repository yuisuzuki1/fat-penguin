"use strict";
(function() {

  window.addEventListener("load", init);

  let question = 0;
  const QUESTIONS = ["q1", "q2", "q3", "q4"];

  function init() {
    id("arrow").addEventListener("click", changeImage);
    id("join").addEventListener("click", questions);
    id("go").addEventListener("click", startGame);
    id("finish").addEventListener("click", endGame);
  }

  function questions() {
    id("home").classList.add("hidden");
    id("starter-questions").classList.remove("hidden");
  }

  function startGame() {
    id("starter-questions").classList.add("hidden");
    id("counter").classList.remove("hidden");
    id("problem").classList.remove("hidden");
    startCounter();
    displayQ();
  }

  function endGame() {
    id("counter").classList.add("hidden");
    id("problem").classList.add("hidden");
    id("q4").classList.add("hidden");
    id("similarity").classList.remove("hidden");
  }

  function displayQ() {
    id(QUESTIONS[question]).classList.remove("hidden");
    if (question === 3) {
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");
      var rect = canvas.getBoundingClientRect();
  
      canvas.height = 500;
      canvas.width = 500;
  
      ctx.lineWidth = 10;
      ctx.strokeStyle = "black";
  
      var white = document.querySelector("#white")
      white.addEventListener("click", function() {
          ctx.strokeStyle = "white";
      });
  
      var black = document.querySelector("#black")
      black.addEventListener("click", function() {
          ctx.strokeStyle = "black";
      });
  
      var red = document.querySelector("#red")
      red.addEventListener("click", function() {
          ctx.strokeStyle = "red";
      });
  
      var blue = document.querySelector("#blue")
      blue.addEventListener("click", function() {
          ctx.strokeStyle = "blue";
      });
  
      var green = document.querySelector("#green")
      green.addEventListener("click", function() {
          ctx.strokeStyle = "green";
      });
  
      var five = document.querySelector("#five")
      five.addEventListener("click", function() {
          ctx.lineWidth = 5;
      });
  
      var ten = document.querySelector("#ten")
      ten.addEventListener("click", function() {
          ctx.lineWidth = 10;
      });
  
      var twenty = document.querySelector("#twenty")
      twenty.addEventListener("click", function() {
          ctx.lineWidth = 20;
      });
  
      var fifty = document.querySelector("#fifty")
      fifty.addEventListener("click", function() {
          ctx.lineWidth = 50;
      });
      
      var clear = document.querySelector("#clear")
      clear.addEventListener("click", function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
  
  
      let painting = false;
  
      function startPosition(e) {
          painting = true;
          draw(e);
      }
      
      function finishedPosition() {
          painting = false;
          ctx.beginPath();
      }
  
      function draw (e) {
          if(!painting) return;
          ctx.lineCap = 'round';
          ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas,offsetTop);
      }
  
      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", finishedPosition);
      canvas.addEventListener("mousemove", draw);
    } else {
      let images = id(QUESTIONS[question]).querySelectorAll("img");
      console.log(images)
      for (let i=0; i<images.length; i++) {
        images[i].addEventListener("click", next);
      }
    }
  }

  function next() {
    this.classList.add("tint");
    setTimeout (function() {
      id(QUESTIONS[question]).classList.add("hidden");
      question++;
      displayQ();
      id("problem-left").textContent = parseInt(id("problem-left").textContent) - 1;
    }, 500)
  }

  function startCounter() {
    let delay = 1000;
    for (let i=300; i>=0; i--) {
      setTimeout(function() {
        id("seconds-left").textContent = i;
      }, delay)
      delay += 1000;
    }
  }

  function changeImage() {
    let images = qsa(".avatar");
    for (let i=0; i<images.length; i++) {
      if (!images[i].classList.contains("hidden")) {
        images[i].classList.add("hidden");
        if (i<images.length-1) {
          images[i+1].classList.remove("hidden");
        } else {
          images[0].classList.remove("hidden");
        }
        i = images.length;
      }
    }
  }

  /* --- HELPER FUNCTIONS --- */

  function id(name) {
    return document.getElementById(name);
  }

  function qs(name) {
    return document.querySelector(name);
  }

  function qsa(name) {
    return document.querySelectorAll(name)
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
