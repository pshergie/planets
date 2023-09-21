// TODO: water generation
// TODO: smooth stars size increment generation
// TODO: do not generate stars behind earth
// TODO: do not generate stars near the earth
// TODO: earth rotation
// TODO: clouds generation
// TODO: sun shade generation
// TODO: cities lights generation under the shade

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = [];

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

class Circle {
  constructor(x, y, radius, fillColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillColor = fillColor;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }
}

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.initialSize = Math.random() * 2 + 1;;
    this.size = this.initialSize;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-over';
  }

  update() {
    // TODO: decrease size increment
    while (this.size < this.initialSize + 2) {
      this.size += 0.1;
    }


    setTimeout(() => this.size = this.initialSize, Math.random() * 5000 + 1000)
  }
}

function init() {
  for (let i = 0; i < 200; i++) {
    stars.push(new Star());
  }
}


function handleStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }

  // size increment animation
  setTimeout(() => stars[Math.floor(Math.random() * (stars.length - 1))].update(), Math.random() * 5000 + 1000);

  //   // size increment animation
  //   for (let i = 0; i < 20; i++) {
  //     requestAnimationFrame(animate);
  //     setInterval(() => stars[Math.floor(Math.random() * (stars.length - 1))].update(), Math.random() * 5000 + 1000);
  //   }
  // }
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // create Earth
  const Earth = new Circle(canvas.width / 2, canvas.height / 2, 250, 'green');
  Earth.draw();

  // create stars
  handleStars();

  requestAnimationFrame(animate);
}

init();
animate();
