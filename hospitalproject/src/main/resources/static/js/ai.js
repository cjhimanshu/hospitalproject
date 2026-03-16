function checkSymptom(){

let symptom = document.getElementById("symptom").value

let result = ""

if(symptom.includes("fever"))
result="Possible Flu"

else if(symptom.includes("headache"))
result="Possible Migraine"

else
result="Consult a doctor"

document.getElementById("result").innerText=result

}