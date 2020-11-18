let items = document.querySelector('.jobs-item');
let searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', function() {
    // Tomar los valores de los inputs para ponerlos en la url
    let description = "description="+document.querySelector('#description').value.replace(" ","+");
    let city = "location="+ document.querySelector('#city').value.replace(" ","+");
    let fullTime = "full_time=false";
    // La peticion pasa por el proxy, para evitar el error de CORS
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://jobs.github.com/positions.json?${description}&${city}&${fullTime}`;
    fetch(proxyurl + url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        items.innerHTML = "";
        // Por cada item genero un div
        for (jobs in data){
            items.innerHTML +=`
                <div class="jobs-item">
                    <h3>${data[jobs].company}</h3>
                    <p>${data[jobs].title}</p>
                    <p>${data[jobs].type}</p>
                    <br>
                <div>
                `;
        }
    })
})


/*console.log(list);
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 5;
let numberOfPages = getNumberOfPages();

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
}
function previousPage() {
    currentPage -= 1;
}
function firstPage() {
    currentPage = 1;
}
function lastPage() {
    currentPage = numberOfPages;
}

function loadList() {
    let begin = ((currentPage - 1) * numberPerPage);
    let end = begin + numberPerPage;

    pageList = list.slice(begin, end);
}

function outputList() {
    document.querySelector(".jobs-item").innerHTML = "";
    for (let i = 0; i < pageList.length; i++) {
        document.querySelector(".jobs-item").innerHTML += pageList[i] + "";
    }
}*/

/*const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://jobs.github.com/positions.json?description=python&location=new+york"; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.json())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))*/