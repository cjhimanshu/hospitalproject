function loadSlots(){

fetch("/api/slots",{

headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}

})
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(slot=>{

html+=`

<div class="card p-3 mb-2">

<h5>Doctor: ${slot.doctorName}</h5>

<p>Time: ${slot.time}</p>

<button class="btn btn-success" onclick="book(${slot.id})">Book</button>

</div>

`

})

document.getElementById("slots").innerHTML=html

})

}

function book(id){

fetch("/api/appointments/book/"+id,{

method:"POST",

headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}

})
.then(res=>res.json())
.then(data=>{

alert("Appointment Booked")

})

}