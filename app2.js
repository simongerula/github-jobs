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
    // VARIABLES CONTROLADORAS DE PAGINA
    let cantidadTrabajos = dataJobs.length;
    let trabajosPorPagina = 5;
    let cantidadPaginas = (cantidadTrabajos/trabajosPorPagina);
    let indexStart = 0;
    let indexEnd = 5;
    let firstBtn = document.querySelector('#firstBtn');
    let previousBtn = document.querySelector('#previousBtn');
    let nextBtn = document.querySelector('#nextBtn');
    let lastBtn = document.querySelector('#lastBtn');
    let pageControl = document.querySelector('.page-control').style.display = "block";

    items.innerHTML = "";
    // Si no se encuentran trabajos lanza Notghing found
    if (dataJobs.length == 0) {
        items.innerHTML +=`
            <div class="jobs-item">
            <h3>Nothing found</h3>
        `
    } else {
    // Por cada item genero un div
        //for (jobs in dataJobs){
        for (indexStart; indexStart < indexEnd; indexStart++) {
            items.innerHTML +=`
            <div class="jobs-item">
                <img class="company-logo" src="${dataJobs[indexStart].company_logo}" alt="Company Logo">
                <p class="company-name">${dataJobs[indexStart].company}</p>
                <h3 class="job-title">${dataJobs[indexStart].title}</h3>
                <p class="job-type">${dataJobs[indexStart].type}</p>
                <p class="job-location">${dataJobs[indexStart].location}</p>
                <p class="job-time">${dataJobs[indexStart].created_at}</p>
                <br>
            </div>
                `;
        }
    }
}