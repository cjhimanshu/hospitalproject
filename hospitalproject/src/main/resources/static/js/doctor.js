function loadAppointments(){

let token = localStorage.getItem("token")

fetch("http://localhost:8083/api/appointments/doctor/2",{

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

<p>Patient ID: ${app.patientId}</p>
<p>Status: ${app.status}</p>

<button onclick="approve(${app.id})">Approve</button>
<button onclick="reject(${app.id})">Reject</button>

</div>
`

})

document.getElementById("appointments").innerHTML=html

})

}
function approve(id){

let token = localStorage.getItem("token")

fetch(`http://localhost:8083/api/appointments/${id}/approve`,{

method:"PUT",

headers:{
"Authorization":"Bearer "+token
}

})
.then(()=>{

alert("Appointment Approved")
loadAppointments()

})

}
function reject(id){

let token = localStorage.getItem("token")

fetch(`http://localhost:8083/api/appointments/${id}/reject`,{

method:"PUT",

headers:{
"Authorization":"Bearer "+token
}

})
.then(()=>{

alert("Appointment Rejected")
loadAppointments()

})

}