var nodoPulsTop;

function gestoreLoad() {
    nodoPulsTop = document.getElementById("pulsTop");
    window.onscroll = gestoreScroll;
    nodoPulsTop.onclick = gestoreClickPulsTop;

}

function gestoreScroll() { //quando la pagina scorre in basso oltre i 800px il pulsante compare
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        nodoPulsTop.style.display = "block";
    } else {
        nodoPulsTop.style.display = "none";
    }
}

// quando l'utente preme il pulsante la pagina ritorna in alto
function gestoreClickPulsTop() {
    document.body.scrollTop = 0; // Chrome, Safari e Opera
    document.documentElement.scrollTop = 0; // IE e Firefox
}



window.onload = gestoreLoad;