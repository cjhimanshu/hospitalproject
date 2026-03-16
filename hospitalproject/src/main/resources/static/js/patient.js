function viewSlots(){

fetch("http://localhost:8083/api/slots/doctor/2")

.then(res=>res.json())

.then(data=>{

let html=""

data.forEach(slot=>{

html+=`
<p>Slot: ${slot.id}</p>

<button onclick="book(${slot.id})">Book Appointment</button>
`

})

document.getElementById("slots").innerHTML=html

})

}
function book(slotId){

let token=localStorage.getItem("token")

fetch("http://localhost:8083/api/appointments/book",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token
},

body:JSON.stringify({

patientId:5,
doctorId:2,
slotId:slotId,
status:"PENDING"

})

})
.then(res=>res.json())
.then(data=>{

alert("Appointment Booked")

})

}