function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

fetch("http://localhost:8083/api/users/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email,
password:password
})

})
.then(res=>res.text())
.then(token=>{

localStorage.setItem("token",token)

window.location.href="patient-dashboard.html"

})
}
function register(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

fetch("http://localhost:8083/api/users/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
email:email,
password:password,
role:"PATIENT"
})

})
.then(res=>res.text())
.then(data=>{

alert("Registered Successfully")

window.location.href="login.html"

})

}