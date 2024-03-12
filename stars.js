$(document).ready(function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  function Star(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rChange = 0.015;
    this.color = color;
  }

  Star.prototype = {
    constructor: Star,
    render: function () {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      context.shadowBlur = 8;
      context.shadowColor = "white";
      context.fillStyle = this.color;
      context.fill();
    },
    update: function () {
      if (this.r > 2 || this.r < 0.8) {
        this.rChange = -this.rChange;
      }
      this.r += this.rChange;
    },
  };

  var arrStars = [];

  function randomColor() {
    var arrColors = ["D5C6B3", "DEDEDE", "BB9A81"];
    return "#" + arrColors[Math.floor(Math.random() * 3)];
  }

  function createStars() {
    arrStars = [];
    for (i = 0; i < 200; i++) {
      var randX = Math.floor(Math.random() * canvas.width + 1);
      var randY = Math.floor(Math.random() * canvas.height + 1);
      var randR = Math.random() * 1.7 + 0.5;
      var star = new Star(randX, randY, randR, randomColor());
      arrStars.push(star);
    }
  }

  function update() {
    for (i = 0; i < arrStars.length; i++) {
      arrStars[i].update();
    }
  }

  function animateStars() {
    update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < arrStars.length; i++) {
      arrStars[i].render();
    }
    requestAnimationFrame(animateStars);
  }

  // Initial setup
  setTimeout(() => {
    $("#canvas").css("display", "block");
    updateCanvasSize();
    createStars();
    animateStars();
  }, "200");

  // Resize event listener
  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(function () {
      updateCanvasSize();
      createStars();
    }, 100);
  });

  function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
