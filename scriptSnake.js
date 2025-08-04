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

class parent1{
    constructor(color){
        this.Border = document.createElement("div");
        this.Border.classList.add("border");
        this.Border.style.display = "flex"
        this.Border.style.position = "relative";
        this.Border.style.backgroundColor = color;
        this.Border.style.width = "1000px";
        this.Border.style.height = "700px";
        document.body.appendChild(this.Border);
    }
}
class parent2{
    constructor(color , x , y , borderElement){
        this.Snake = document.createElement("div");
        this.Snake.classList.add("snake");
        this.Snake.style.position = "absolute";
        this.Snake.style.width = "30px";
        this.Snake.style.height = "30px";
        this.Snake.style.backgroundColor= color;
        this.Snake.style.border = `1px solid ${color}`;
        this.Snake.style.top = y + "px";
        this.Snake.style.left = x + "px";
        borderElement.appendChild(this.Snake);
        this.element = this.Snake;
    }
}
class parent3{
    constructor(BorderElement){
        this.Food = document.createElement("div") ;
        this.Food.classList.add("food");
        this.Food.style.position = "absolute";
        this.Food.style.width = "20px";
        this.Food.style.height = "20px";
        this.Food.style.top = "10px";
        this.Food.style.left  = "10px";
        BorderElement.appendChild(this.Food);
    }
    snakeFood(){
    let maxX = 980;
    let maxY = 680;
    this.Food.style.left = Math.floor(Math.random() * maxX) + "px";
    this.Food.style.top = Math.floor(Math.random() * maxY) + "px";
    }
}
let p1 = new parent1();
let f = new parent3(p1.Border);
setInterval(() =>{
    f.snakeFood();}
, 4000 );

let snakesHorizontal = [];
let positionsHorizontal = [] ;
for(let i = 0 ; i < 3 ; i++){
    let x = i  + 10;
    let color = (i % 2 == 0) ? "black" : "gray" ;
    let SH = new parent2(color , x , 20 , p1.Border);
    let snakeHorizontal ={
        width : 30 ,
        height : 30 ,
        top : 20 ,
        left : x  ,
        element : SH.element
    };
    snakesHorizontal.push(snakeHorizontal);
    positionsHorizontal.push({ x: x , y: 20});
}

p1.Border.style.backgroundColor = "#f3f7ff";

let snakesVertical = [];
let positionsVertical = [] ;
let tail = positionsHorizontal[positionsHorizontal.length - 1];
for(let i = 0 ; i < positionsHorizontal.length  ; i++){
    let y = tail.y + i * 30;
    let color = (i % 2 == 0) ? "black" : "gray" ;
    let SV = new parent2(color , tail.x , y , p1.Border);
    let snakeVertical ={
        width : 30 ,
        height : 30 ,
        top : y ,
        left : tail.x  ,
        element : SV.element
    };
    SV.element.style.display = "none";
    snakesVertical.push(snakeVertical);
    positionsVertical.push({ x: tail.x , y: y});
}
let currentSnake = "horizontal";

function switchToVertical() {
    snakesHorizontal.forEach(s => s.element.style.display = "none");

    snakesVertical.forEach(s => s.element.remove());
    snakesVertical = [];
    positionsVertical = [];

    let head = positionsHorizontal[0]; 
    for (let i = 0; i < positionsHorizontal.length; i++) {
        let y = head.y + i * 30;
        let color = (i % 2 === 0) ? "black" : "gray";
        let SV = new parent2(color, head.x, y, p1.Border);
        snakesVertical.push({ 
            width: 30,
            height: 30,
            top: y,
            left: head.x,
            element: SV.element
        });
        positionsVertical.push({ x: head.x, y: y });
    }
    currentSnake = "vertical";
}
function switchToHorizontal() {
    snakesVertical.forEach(s => s.element.style.display = "none");

    snakesHorizontal.forEach(s => s.element.remove());
    snakesHorizontal = [];
    positionsHorizontal = [];

    let head = positionsVertical[0];
    for (let i = 0; i < positionsVertical.length; i++) {
        let x = head.x + i * 30;
        let color = (i % 2 === 0) ? "black" : "gray";
        let SH = new parent2(color, x, head.y, p1.Border);
        snakesHorizontal.push({ 
            width: 30,
            height: 30,
            top: head.y,
            left: x,
            element: SH.element 
        });
        positionsHorizontal.push({ x: x, y:head.y });
    }
    currentSnake = "horizontal";
}

let direction = "right" ;
document.addEventListener("keydown" , (e)=>{
    if((e.key === "ArrowUp" || e.key === "ArrowDown") && currentSnake !== "vertical"){
        direction = (e.key === "ArrowUp")? "up" : "down" ;
        currentSnake = "vertical"
        switchToVertical();
    } 
    else if ((e.key === "ArrowLeft" || e.key === "ArrowRight")  && currentSnake !== "horizontal") {
        direction = (e.key === "ArrowRight") ? "right" : "left" ;
        switchToHorizontal();
    }
});
let foodEat = false ;
function animate(){
    let foodX = parseInt(f.Food.style.left);
    let foodY = parseInt(f.Food.style.top);
    let head;
    if (currentSnake === "horizontal") {
        head = positionsHorizontal[0];
    } 
    else {
        head = positionsVertical[0]; 
    }

    if (!foodEat && Math.abs(head.x - foodX) < 20 && Math.abs(head.y - foodY) < 20){
        foodEat = true ;
        if (currentSnake === "horizontal") {
            let lastPos = positionsHorizontal[positionsHorizontal.length - 1];
            let color = (positionsHorizontal.length % 2 === 0) ? "black" : "gray";
            let p2 = new parent2(color, lastPos.x, lastPos.y, p1.Border) ; 
            positionsHorizontal.push({ x: lastPos.x, y: lastPos.y });
            snakesHorizontal.push({ element: p2.element });
        } 
        else if (currentSnake === "vertical") {
            let lastPos = positionsVertical[positionsVertical.length - 1];
            let color = (positionsVertical.length % 2 === 0) ? "black" : "gray";
            let p2 = new parent2(color, lastPos.x, lastPos.y, p1.Border) ; 
            positionsVertical.push({ x: lastPos.x, y: lastPos.y });
            snakesVertical.push({ element: p2.element });
        }
        f.Food.style.display = "none";
        setTimeout(() => {
            f.snakeFood();
            f.Food.style.display = "block";
            foodEat = false ;
        } , 4000) ;
    }
    if(currentSnake === "horizontal"){
        if (direction === "right") positionsHorizontal[0].x += 3;
        else if (direction === "left") positionsHorizontal[0].x -= 3;
    
        for (let i = 1; i < positionsHorizontal.length; i++) {
            positionsHorizontal[i].x = positionsHorizontal[i - 1].x - 30;
            positionsHorizontal[i].y = positionsHorizontal[i - 1].y;
        }
        snakesHorizontal.forEach((segment, i) => {
            segment.element.style.left = positionsHorizontal[i].x + "px";
            segment.element.style.top = positionsHorizontal[i].y + "px";
        });
    }
    else if (currentSnake === "vertical") {
        if (direction === "up") positionsVertical[0].y -= 3;
        else if (direction === "down") positionsVertical[0].y += 3;
    
        for (let i = 1; i < positionsVertical.length; i++) {
            positionsVertical[i].y = positionsVertical[i - 1].y - 30;
            positionsVertical[i].x = positionsVertical[i - 1].x;
        } 
        snakesVertical.forEach((segment, i) => {
            segment.element.style.left = positionsVertical[i].x + "px";
            segment.element.style.top = positionsVertical[i].y + "px";
        });
    }
    let head1;
    if (currentSnake === "horizontal") {
        head1 = positionsHorizontal[positionsHorizontal.length - 1];
    } 
    else {
        head1 = positionsVertical[positionsVertical.length - 1];
    }
    if (direction === "right" && head1.x + 90 >= 970) {
        p1.Border.style.backgroundColor = "#fff3df";
        alert("Game Over!");
        return;
    }
    if (direction === "left" && head1.x <= 0) {
        p1.Border.style.backgroundColor = "#fff3df";
        alert("Game Over!");
        return;
    }
    if (direction === "down" && head1.y + 90 >= 670) {
        p1.Border.style.backgroundColor = "#fff3df";
        alert("Game Over!");
        return;
    }
    if (direction === "up" && head1.y <= 0) {
        p1.Border.style.backgroundColor = "#fff3df";
        alert("Game Over!");
        return;
    }
    requestAnimationFrame(animate);
} 
animate();