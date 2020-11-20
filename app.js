let items = document.querySelector('.jobs-list');
let searchBtn = document.querySelector('#searchBtn');
let dataJobs;
let dataJobsFull = new Array();
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
    dataJobsFull = new Array();
    falseTrue = false;
    for (let i = 1; i < 7; i++){
        let url = `https://jobs.github.com/positions.json?${description}&${city}&${fullTime}&page=${i}`;
        console.log(url);
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.length);
            console.log("-----");
            dataJobs = data;
            dataJobsFull = (dataJobsFull.concat(dataJobs));

            console.log(dataJobsFull);
            console.log("full  "+dataJobsFull.length);

        });
    }
};
loadJobs.then(createPage);

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

    console.log('dale forro');

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
}