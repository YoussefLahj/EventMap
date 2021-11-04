function openMenu(){
    let menuIcon = document.getElementById("Menu_icon");
    document.getElementById("Menu_Lateral").style.width = "250px";
    document.getElementById("mainPage").style.marginLeft = "250px";
    menuIcon.classList.add("fadeOut");
}

function closeMenu(){
    document.getElementById("Menu_Lateral").style.width = "0";
    document.getElementById("mainPage").style.marginLeft = "0";
}