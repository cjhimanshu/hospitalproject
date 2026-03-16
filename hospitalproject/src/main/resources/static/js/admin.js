const ctx = document.getElementById('myChart')

new Chart(ctx, {

type: 'bar',

data: {

labels: ['Patients', 'Doctors', 'Appointments'],

datasets: [{

label: 'Hospital Data',

data: [120, 15, 320],

borderWidth: 1

}]

},

options: {

scales: {

y: {

beginAtZero: true

}

}

}

})