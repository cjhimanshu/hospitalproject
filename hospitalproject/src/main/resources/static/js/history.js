function loadHistory(){

let token = localStorage.getItem("token")

fetch("http://localhost:8083/api/appointments/patient/5",{

headers:{
"Authorization":"Bearer "+token
}

})

.then(res=>res.json())

.then(data=>{

let html=""

data.forEach(app=>{

html+=`

<div>

<p>Doctor ID: ${app.doctorId}</p>

<p>Status: ${app.status}</p>

<p>Time: ${app.appointmentTime}</p>

</div>

`

})

document.getElementById("history").innerHTML=html

})

}