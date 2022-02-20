document.getElementById("greetUser").innerHTML= "Bonjour " +  localStorage.getItem("connected") + " !";
var bidouille=localStorage.getItem("connected");

let menuIcon = document.getElementById("Menu_icon");
let markerTab = [];
let titleTab = [];
let descTab = [];
let firstEnter = true;
let click = false;
var mymap = L.map('mapid').setView([47.46667, -0.55], 13);
var popup = L.popup();
var marker = 0;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

function onMapClick(e) {
    let title;
    let desc;
    if(click){
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);   //marker.latlng.lat
        markerTab.push(marker);
        title = window.prompt("Saisissez un titre à votre évènement");
        titleTab.push(title);
        desc = window.prompt("Saisissez la description de votre évènement");
        descTab.push(desc);
    }
    if(marker != 0){
        marker.addEventListener("click", function(){
            console.log("marker clicked");
            for(let i = 0; i < markerTab.length; i++){
                if(e.latlng.lat == markerTab[i]._latlng.lat && e.latlng.lng == markerTab[i]._latlng.lng){
                    markerTab[i].bindPopup("<b>"+titleTab[i]+"</b><br>"+descTab[i]+".").openPopup();
                }
            }
        });
    }
}
mymap.on('click', onMapClick);

function openMenu(){
    document.getElementById("Menu_Lateral").style.width = "15vw";
    document.getElementById("mainPage").style.marginLeft = "15vw";
    
    if(firstEnter){
        firstEnter = false;
        menuIcon.classList.add("fadeOut");
    }
    else{
        menuIcon.classList.replace("fadeIn", "fadeOut");
    }
    menuIcon.style.opacity = 0;
}

function closeMenu(){
    document.getElementById("Menu_Lateral").style.width = "0";
    document.getElementById("mainPage").style.marginLeft = "0";
    menuIcon.classList.replace("fadeOut", "fadeIn");
    menuIcon.style.opacity = 1;
    click = false;
}

function addEvent(){
    let consigne = document.createElement("p");
    consigne.textContent = "Cliquez sur la carte pour ajouter un evenement";
    document.body.appendChild(consigne);
    setTimeout(function(){
        consigne.textContent = "";
    },4000);
    click = true;
}

function delEvent(){
    console.log("del");
}

function participateEvent(){
    console.log("participate");
}

function disconnect(){
    localStorage.setItem("connected","");
    window.location.href="main.html"
}