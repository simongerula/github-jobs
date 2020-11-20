let items = document.querySelector('.jobs-list');
let searchBtn = document.querySelector('#searchBtn');
let dataJobs;
// VARIABLES URL
let description;
let city;
let fullTime;
// VARIABLES CONTROL DE PAGINAS
let pageJobs = new Array();
let currentPage = 1;
let jobsPerPage = 5;
let numberOfPages;

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
        numberOfPages = (Math.ceil(dataJobs.length / jobsPerPage));
        console.log(numberOfPages);
        createPage();
    });

};
/*
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
}*/




document.querySelector('#nextBtn').addEventListener('click', function(){
    currentPage += 1;
    createPage();
});
document.querySelector('#previousBtn').addEventListener('click', function(){
    currentPage -= 1;
    createPage();
});
document.querySelector('#firstBtn').addEventListener('click', function(){
    currentPage = 1;
    createPage();
});
document.querySelector('#lastBtn').addEventListener('click', function(){
    currentPage = numberOfPages;
    createPage();
});



function createPage() {
    let begin = ((currentPage - 1) * jobsPerPage);
    let end = begin + jobsPerPage;

    pageJobs = dataJobs.slice(begin, end);
    checkBtn();
    outputPage();
}

function outputPage() {
    let pageControl = document.querySelector('.page-control').style.display = "block";
    items.innerHTML = "";
    for (let i = 0; i < pageJobs.length; i++) {
        items.innerHTML += `
            <div class="jobs-item">
                <img class="company-logo" src="${pageJobs[i].company_logo}" alt="Company Logo">
                <p class="company-name">${pageJobs[i].company}</p>
                <h3 class="job-title">${pageJobs[i].title}</h3>
                <p class="job-type">${pageJobs[i].type}</p>
                <p class="job-location">${pageJobs[i].location}</p>
                <p class="job-time">${pageJobs[i].created_at}</p>
                <br>
            </div>
        `;
    }
}

function checkBtn() {
    document.querySelector("#nextBtn").disabled = currentPage == numberOfPages ? true : false;
    document.querySelector("#previousBtn").disabled = currentPage == 1 ? true : false;
    document.querySelector("#firstBtn").disabled = currentPage == 1 ? true : false;
    document.querySelector("#lastBtn").disabled = currentPage == numberOfPages ? true : false;
}