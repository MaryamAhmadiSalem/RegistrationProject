window.addEventListener("DOMContentLoaded", function(e){
    const form1 = document.getElementById("myform");
    const form2 = document.getElementById("myform1");

    if(form1){
        form1.addEventListener("submit" , function(e){
            e.preventDefault()
            let hasError = false

            let Fname = form1.elements["Fname"].value.trim();
            const errorFname = document.getElementById("errorFname");
            errorFname.textContent ="";

            let Lname = form1.elements["Lname"].value.trim();
            const errorLname = document.getElementById("errorLname");
            errorLname.textContent ="";

            let email = form1.elements["email"].value.trim();
            const errorEmail = document.getElementById("errorEmail");
            errorEmail.textContent ="";

            let number = form1.elements["number"].value.trim();
            const errorNumber = document.getElementById("errorNumber");
            errorNumber.textContent ="";

            let gender = form1.elements["gender"].value.trim();
            const errorGender = document.getElementById("errorGender");
            errorGender.textContent ="";

            let date = form1.elements["date"].value.trim();
            const errorDate = document.getElementById("errorDate");
            errorDate.textContent ="";


            if(Lname ===""){
               errorLname.textContent  = "نام خانوادگی را وارد کنید" ;
               hasError = true ;
            }
            if(Fname ===""){
               errorFname.textContent  = "نام را وارد کنید" ;
               hasError = true ;
            }
            if(email ===""){
               errorEmail.textContent  = "ادرس ایمیل را وارد کنید" ;
               hasError = true ;
            }
            if(number ===""){
               errorNumber.textContent  = "شماره تلفن را وارد کنید" ;
               hasError = true ;
            }
            if(gender===""){
               errorGender.textContent  = "جنسیت خود را وارد کنید" ;
               hasError = true ;
            }
            if(date ===""){
               errorDate.textContent  = "تاریخ تولد خود را وارد کنید" ;
               hasError = true ;
            }
            if (hasError) return; 
            let user={
                firstName : Fname ,
                lastName : Lname ,
                email : email ,
                number : number ,
                gender: gender ,
                date : date ,
            };
            
            localStorage.setItem("userEmail", email);

            
            fetch("https://localhost:7201/api/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = `index2.html`;
            })
            .catch(error => {
            console.error("Error:", error);
            });

        });
    }
    if(form2){
        form2.addEventListener("submit" , function(e){
            e.preventDefault();

            const Choose = document.querySelector('input[name="game"]:checked');
            let errorGame = document.getElementById("errorGame");
            errorGame.textContent = "";

            if(!Choose){
                errorGame.textContent = "لطفا یک بازی را انتخاب کنید";
                return;
            }
            if (Choose.value === "بازی جداسازی توپها") {
                window.location.href = "Ball2 project/indexBall.html";
            } 
            else if (Choose.value === "بازی مار") {
                window.location.href ="snakeGame/indexSnake.html";
            } 
        });
    }
});