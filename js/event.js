document.getElementById("greetUser").innerHTML= "Bonjour " +  localStorage.getItem("connected") + " !";
let menuIcon = document.getElementById("Menu_icon");
let markerTab = [];
let titleTab = [];
let descTab = [];
let nbParticipantTab = [];
let firstEnter = true;
let clickToAdd = false;
let clickToDell = false;
let clickToBe = false;
var mymap = L.map('mapid').setView([47.46667, -0.55], 13);
var popup = L.popup();
var marker = 0;
var nbParticipant=0;

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
    if (clickToAdd) {
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);   //marker.latlng.lat
        markerTab.push(marker);
        title = window.prompt("Saisissez un titre à votre événement");
        titleTab.push(title);
        desc = window.prompt("Saisissez la description de votre événement");
        descTab.push(desc);
        nbParticipantTab.push(nbParticipant);
        marker.bindPopup("<b>" + title + "</b><br>" + desc + "." + "<br>Nombre de personnes inscrites : " + nbParticipant);
    }
    if (marker != 0) {
        var index = 0;
        marker.addEventListener("click", function () {
            console.log("marker clicked");
            for (let i = 0; i < markerTab.length; i++) {
                if (e.latlng.lat == markerTab[i]._latlng.lat && e.latlng.lng == markerTab[i]._latlng.lng) {
                    markerTab[i].openPopup();
                    index = i;
                }
               
            }

            if (clickToDell) {
                markerTab[index].remove();
                markerTab.splice(index, 1);
                titleTab.splice(index, 1);
                descTab.splice(index, 1);
                nbParticipantTab.splice(index, 1);
                clickToDell = false;
            }

            if(clickToBe){
                console.log(index);
                nbParticipantTab[index]+=1;
                markerTab[index].bindPopup("<b>" + titleTab[index] + "</b><br>" + descTab[index] + "." + "<br>Nombre de personnes inscrites : " + nbParticipantTab[index]);
                console.log(nbParticipantTab[index]);
            }
        });
    }
}
mymap.on('click', onMapClick);

function openMenu() {
    document.getElementById("Menu_Lateral").style.width = "15vw";
    document.getElementById("mainPage").style.marginLeft = "15vw";

    if (firstEnter) {
        firstEnter = false;
        menuIcon.classList.add("fadeOut");
    }
    else {
        menuIcon.classList.replace("fadeIn", "fadeOut");
    }
    menuIcon.style.opacity = 0;
}

function closeMenu() {
    document.getElementById("Menu_Lateral").style.width = "0";
    document.getElementById("mainPage").style.marginLeft = "0";
    menuIcon.classList.replace("fadeOut", "fadeIn");
    menuIcon.style.opacity = 1;
    clickToAdd = false;
    clickToDell = false;
    clickToBe=false;
}

function addEvent() {
    let consigne = document.createElement("p");
    consigne.textContent = "Cliquez sur la carte pour ajouter un événement";
    document.body.appendChild(consigne);
    setTimeout(function () {
        consigne.textContent = "";
    }, 4000);
    clickToAdd = true;
    clickToDell = false;
    clickToBe=false;
}

function delEvent() {
    /*let Menu_Lateral=document.getElementById("Menu_Lateral");
    let btn_Del=document.getElementById("Menu_Lateral");
    let btn_Done = document.createElement("button");
    btn_Done.innerHTML="Quitter";
    Menu_Lateral.insertBefore(btn_Done,btn_Del);*/

    let indication = document.createElement("p");
    indication.textContent = "Cliquez sur l'événement que vous voulez supprimer";
    document.body.appendChild(indication);
    setTimeout(function () {
        indication.textContent = "";
    }, 4000);
    clickToDell = true;
    clickToAdd = false;
    clickToBe=false;
}

function participateEvent() {
    let indication = document.createElement("p");
    indication.textContent = "Cliquez sur l'événement auquel vous voulez participer";
    document.body.appendChild(indication);
    setTimeout(function () {
        indication.textContent = "";
    }, 4000);
    clickToBe=true;
    clickToDell = false;
    clickToAdd = false;
}

function disconnect() {
    localStorage.setItem("connected","");
    window.location.href="main.html"
}