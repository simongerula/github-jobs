let items = document.querySelector('.jobs-list');
let searchBtn = document.querySelector('#searchBtn');
let dataJobs;
// VARIABLES URL
let description;
let city;
let fullTime;

searchBtn.addEventListener('click', loadJobs); 
//document.onload = loadJobs();


// FUNCION QUE CONECTA LA API
function loadJobs() {
    // COMPLETO URL CON KEYWORD
    description = "description="+document.querySelector('#description').value.replace(" ","+");
    // COMPLETO URL CON LOCALIZACION
    if (document.querySelector('#locationChk').checked == true) {
        city = "location=london";
    } else if (document.querySelector('#locationChk1').checked == true) {
        city = "location=paris";
    } else if (document.querySelector('#locationChk2').checked == true) {
        city = "location=amsterdam";
    } else if (document.querySelector('#locationChk3').checked == true) {
        city = "location=new+york";
    } else {
        city = "location="+ document.querySelector('#city').value.replace(" ","+");
    }
    // COMPLETO URL CON FULL TIME ONLY
    if (document.querySelector('#fullTimeChk').checked == true) {
        fullTime = "full_time=true";
    } else {
        fullTime = "full_time=false";
    };

    // LA PETICION PASA POR PROXY, PARA EVITAR ERROR CORS
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://jobs.github.com/positions.json?${description}&${city}&${fullTime}`;
    console.log(proxyurl + url);
    fetch(proxyurl + url)
    .then(response => response.json())
    .then(data => {
        dataJobs = data;
        printJobs();
    });

};

// FUNCION ENCARGADA DE IMPRIMIR LOS TRABAJOS
function printJobs() {
    items.innerHTML = "";
    // Si no se encuentran trabajos lanza Notghing found
    if (data.length == 0) {
        items.innerHTML +=`
            <div class="jobs-item">
            <h3>Nothing found</h3>
        `
    } else {
    // Por cada item genero un div
        //for (jobs in data){
        for (let i=1; i < 6; i++) {
            items.innerHTML +=`
            <div class="jobs-item">
                <img class="company-logo" src="${data[i].company_logo}" alt="Company Logo">
                <p class="company-name">${data[i].company}</p>
                <h3 class="job-title">${data[i].title}</h3>
                <p class="job-type">${data[i].type}</p>
                <p class="job-location">${data[i].location}</p>
                <p class="job-time">${data[i].created_at}</p>
                <br>
            </div>
                `;
        }
    }
}