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
document.onload = loadJobs();


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
    fetch(proxyurl + url)
    .then(response => response.json())
    .then(data => {
        dataJobs = data;
        numberOfPages = (Math.ceil(dataJobs.length / jobsPerPage));
        createPage();
    });

};

// FUNCIONES DE BOTONES
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
// SE CHEQUEA LA PAGINA ACTUAL Y SE DESACTIVAN BOTONES
function checkBtn() {
    document.querySelector("#nextBtn").disabled = currentPage == numberOfPages ? true : false;
    document.querySelector("#previousBtn").disabled = currentPage == 1 ? true : false;
    document.querySelector("#firstBtn").disabled = currentPage == 1 ? true : false;
    document.querySelector("#lastBtn").disabled = currentPage == numberOfPages ? true : false;
}


// SE CREAN LAS PAGINAS DE 5 TRABAJOS
function createPage() {
    let begin = ((currentPage - 1) * jobsPerPage);
    let end = begin + jobsPerPage;

    pageJobs = dataJobs.slice(begin, end);
    checkBtn();
    outputPage();
}

// FUNCION QUE MUESTRA LAS PAGINAS DE TRABAJOS
function outputPage() {
    document.querySelector('.page-control').style.display = "block";
    items.innerHTML = "";
    if (dataJobs.length == 0) {
        document.querySelector('.page-control').style.display = "none";
        items.innerHTML +=`
            <div class="jobs-item">
            <h3>Nothing found</h3>
        `
    } else {
        for (let i = 0; i < pageJobs.length; i++) {
            // CALCULADOR DE FECHA CON METODO MOMENT
            let d = new Date();
            let fecha = moment(pageJobs[i].created_at);
            let actualidad = moment(d);
            let created_at_calc = (actualidad.diff(fecha, 'hours'));
            if (created_at_calc > 24) {
                created_at_calc = (actualidad.diff(fecha, 'days') + ' days ago');
            } else {
                created_at_calc = (actualidad.diff(fecha, 'hours') + ' hours ago');
            }

            items.innerHTML += `
                <div class="jobs-item">
                    <img class="company-logo" src="${pageJobs[i].company_logo}" alt="${pageJobs[i].company} Logo">
                    <p class="company-name">${pageJobs[i].company}</p>
                    <h3 class="job-title">${pageJobs[i].title}</h3>
                    <p class="job-type">${pageJobs[i].type}</p>
                    <p class="job-location"><i class="location-icon-i material-icons">public</i>${pageJobs[i].location}</p>
                    <p class="job-time"><i class="location-icon-i material-icons">access_time</i>${created_at_calc}</p>
                    <br>
                </div>
            `;

        }
    }
}
/*
let locationChk = document.querySelectorAll('.locationChk');
for (let i = 0; i < locationChk.length ; i++) {
    locationChk[i].addEventListener('click', function() {
        for (let j = 0; j < locationChk.length; j++) {
            locationChk[j].checked = false;
        };
    locationChk[i].checked = true;
    });
};*/