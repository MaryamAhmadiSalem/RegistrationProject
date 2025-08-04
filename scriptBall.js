window.addEventListener("DOMContentLoaded", async function () {
  const email = localStorage.getItem("userEmail");
  let response = await fetch(`https://localhost:7201/api/User?email=${encodeURIComponent(email)}`);
  let data = await response.json();
  
  document.getElementById("information").innerHTML = `
        <p>نام: ${data.firstName}</p>
        <p>نام خانوادگی: ${data.lastName}</p>
        <p>ایمیل: ${data.email}</p>
        <p>شماره: ${data.number}</p>
        <p>جنسیت: ${data.gender}</p>
        <p>تاریخ تولد: ${data.date}</p>
    `
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    document.getElementById("information").innerHTML ="";
    }
});

let Border = document.createElement("div");
Border.classList.add("container","border");
Border.style.width = "1000px";
Border.style.height = "700px";
Border.style.position = "relative";
Border.style.backgroundColor = "#f3f7ff";
document.body.appendChild(Border);

let X = Border.clientWidth / 5 - 15;
let Y = Border.clientHeight / 5 - 15;
let numberOfBalls = 0; 
let time ;
let balls = [] ;
let haswon = false ;

document.addEventListener("change" , (e)=>{
    if(e.target.value === "Easy"){
        numberOfBalls = 6 ;
        time = 2 ;
    }
    else if(e.target.value === "Medium"){
        numberOfBalls = 8 ;
        time = 1 ;
    }
    else if(e.target.value === "Hard"){
        numberOfBalls = 10 ;
        time = 1 ;
    }
    for(let ball of balls){
        ball.element.remove();
    }
    balls = [] ;
    for(let i = 1 ; i<=numberOfBalls; i++){
        let x= X + i * 50;
        let y= Y + i *25;
        let color = (i % 2) ? "blue" : "red";
        let ballInstance =new Parent1(x, y, color);

        let object = {
            x : x,
            y : y ,
            vx: Math.random()* time + 1 ,
            vy: Math.random()* time + 1,
            element : ballInstance.element
        };
        balls.push(object);
    }
    animate();
});

class Parent1{
    constructor(x , y , color){
        this.Ball = document.createElement("div");
        this.Ball.classList.add("ball");
        this.Ball.style.textAlign = "center";
        this.Ball.style.position = "absolute";
        this.Ball.style.width = "30px";
        this.Ball.style.height = "30px";
        this.Ball.style.backgroundColor= color;
        this.Ball.style.border= `1px solid ${color}`;
        this.Ball.style.left= x + "px";
        this.Ball.style.top= y + "px";
        Border.appendChild(this.Ball);
        this.element = this.Ball;
    }
}

class Parent2{
    constructor(x){
        this.Door = document.createElement("div");
        this.Door.classList.add("container","door");
        this.Door.style.width = "6px";
        this.Door.style.height = "300px";
        this.Door.style.position = "absolute";
        this.Door.style.backgroundColor = "black";
        this.Door.style.top = x + "px";
        Border.appendChild(this.Door);
        this.element = this.Door;
    }
}
let objectDoors = [];

let topValues = [0, 400];
for(let i = 0 ; i<2 ; i++){
    let obDoors = {
        height : 300,
        width : 6 ,
        top : topValues[i] ,
        element : new Parent2(topValues[i]).element
    };
    objectDoors.push(obDoors);
}

const doors = document.querySelectorAll('.door');
const topDoor = doors[0];
const bottomDoor = doors[1];

document.addEventListener("keydown", (e) => {
    let topHeight = parseInt(topDoor.style.height);
    let bottomHeight = parseInt(bottomDoor.style.height);
    
    if (e.key === "ArrowUp") {
        if (topHeight > 50) {
            topHeight -= 10;
            bottomHeight += 10;
        }
    }
    else if (e.key === "ArrowDown") {
        if (bottomHeight > 50) {
            bottomHeight -= 10;
            topHeight += 10;
        }
    }
    topDoor.style.height = topHeight + "px";
    bottomDoor.style.height = bottomHeight + "px";

    bottomDoor.style.top = (topHeight + 100) + "px";
});

function animate(){
    if(balls.length === 0){
    return;
}
    let blueBalls = balls.filter(balls => balls.element.style.backgroundColor === "blue");
    let redBalls = balls.filter(balls => balls.element.style.backgroundColor === "red");

    let borderLenghs = 500;
    let allRedLeft  = redBalls.every(ball => ball.x < borderLenghs);
    let allRedRight = redBalls.every(ball => ball.x > borderLenghs);
    let allBlueLeft = blueBalls.every(ball => ball.x < borderLenghs);
    let allBlueRight = blueBalls.every(ball => ball.x > borderLenghs);

    let separated =
    (allRedLeft && allBlueRight) || (allRedRight && allBlueLeft);

    if(separated && !haswon){
        haswon = true ;
        topDoor.style.height = "350px";
        bottomDoor.style.height = "350px";
        bottomDoor.style.top = "350px";
        alert("Great .You won");
    }

    for(let i = 0 ; i<balls.length ; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].element.style.left= balls[i].x + "px";
        balls[i].element.style.top= balls[i].y + "px";

        let topRect = topDoor.getBoundingClientRect();
        let bottomRect = bottomDoor.getBoundingClientRect();
        let ballRect = balls[i].element.getBoundingClientRect();

        let highTopDoor = 
        ballRect.right > topRect.left &&
        ballRect.left < topRect.right &&
        ballRect.bottom > topRect.top &&
        ballRect.top < topRect.bottom;

        let highBottomDoor = 
        ballRect.right > bottomRect.left &&
        ballRect.left < bottomRect.right &&
        ballRect.bottom > bottomRect.top &&
        ballRect.top < bottomRect.bottom;

        if (highTopDoor || highBottomDoor) {
            balls[i].vx = -balls[i].vx;
        }
        if(balls[i].x > 970){
            balls[i].vx = -balls[i].vx;
        }
        else if(balls[i].x < 15){
            balls[i].vx = -balls[i].vx;
        }
        else if(balls[i].y > 670){
            balls[i].vy = -balls[i].vy;
        }
        else if(balls[i].y < 15){
            balls[i].vy = -balls[i].vy;
        }
    }
    requestAnimationFrame(animate);
}
animate();