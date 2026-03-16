function bookAppointment(){

let date = document.getElementById("date").value
let doctor = document.getElementById("doctor").value
let time = document.getElementById("time").value

if(date === "" || doctor === "" || time === ""){

alert("Please fill all fields")

return

}

document.getElementById("message").innerHTML =
"Appointment Booked Successfully"

}