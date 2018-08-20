var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//Square or Rectangle

// c.fillRect(x , y , width, height);
// c.fillStyle = 'rgba( 255, 0, 0, 0.5 )';
// c.fillRect( 100, 100, 100, 100 );
// c.fillStyle = 'rgba( 255, 0, 0, 0.1 )';
// c.fillRect( 400, 100, 100, 100 );
// c.fillStyle = 'rgba( 255, 0, 0, 0.5 )';
// c.fillRect( 300, 300, 100, 100 );


//Line 

// c.beginPath();
// // c.moveTo(x , y);
// c.moveTo( 50 , 300 );
// // c.lineTo(x , y);
// c.lineTo( 300 , 100 );
// c.lineTo( 400 , 200 );
// c.lineTo( 300 , 200 );
// c.strokeStyle = '#000';
// c.stroke();


//Arc or Circle

// c.beginPath();
// // c.arc(x , y, radius, startAngle, endAngle, drawCounterClockwise )
// c.arc( 300 , 300, 30, 0, Math.PI * 2, false );
// c.strokeStyle = "blue"
// c.stroke();


// To create multipy circles in various directions in a screen

// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc( x, y, 30, 0, Math.PI * 2, false );
//     c.strokeStyle = "blue"
//     c.stroke();
// }


// Animating the circle 

// var x = 200;
// function animate() {
//     requestAnimationFrame(animate);
//     c.beginPath();
//     c.arc( x, 200, 30, 0, Math.PI * 2, false );
//     c.strokeStyle = "#000"
//     c.stroke();

//     x += 1;
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;

var colorArray = [
    '#181D3A',
    '#204260',
    '#FFB766',
    '#FFA237',
    '#EB3D00'
];

window.addEventListener('mousemove', 
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', 
   function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init();
});

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.color =  colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc( this.x, this.y, this.r, 0, Math.PI * 2, false );
        c.stroke(); 
        c.fillStyle = this.color
        c.fill();   
    }

    this.update = function() {
        if(this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
          } 
          else if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
          }
      
          this.x += this.dx;
          this.y += this.dy;

          //interactivity
          if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

              if(this.r < maxRadius){
                  this.r += 1;
              }
          } else if(this.r > this.minRadius) {
                  this.r -=1
          }

          this.draw();
    }
}

// // Instantiating a new instance of a circle
// var circle = new Circle(200, 200, 3, 3, 30);

var circleArray = [];

function init () {
  
    circleArray = [];
    
    for (var i = 0; i < 1000; i++){
        var r = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - r * 2) + r;
        var y = Math.random() * (innerHeight - r * 2) + r ;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, r)); 
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++){
       circleArray[i].update();
    }
}

init();

animate();