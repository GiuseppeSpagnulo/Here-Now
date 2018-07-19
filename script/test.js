//controlla azzera l'indice delle domande e fa partire il test invocando la funzione aggDomanda per visualizzare la Domanda1
function nuovoTest() {
    numDomandaAttuale = 0;
    aggDomanda(numDomandaAttuale);
    scriviMessaggio(nodoRisultati, "");
    rispDate = [];
}

//controlla la domanda corrente e aggiorna alla successiva, invocando la funzione scriviMessaggio
function aggDomanda(i) {
    scriviMessaggio(nodoDomandaNum, "Domanda " + (i + 1) + " di " + numDomande);
    var parte = test[i];
    scriviMessaggio(nodoDomandaTxt, parte.domanda)
    scriviMessaggio(nodoRisp1Txt, parte.risposte[0]);
    scriviMessaggio(nodoRisp2Txt, parte.risposte[1]);
    scriviMessaggio(nodoRisp3Txt, parte.risposte[2]);
    scriviMessaggio(nodoRisp4Txt, parte.risposte[3]);
    nodoRisp1.checked = false;
    nodoRisp2.checked = false;
    nodoRisp3.checked = false;
    nodoRisp4.checked = false;
}

//Crea un nuovo nodo di testo con la stringa e lo aggiunge all'albero sostituendolo al primo figlio
function scriviMessaggio(nodo, messaggio) {
    var nodoTxtMsg = document.createTextNode(messaggio);
    if (nodo.childNodes.length == 0) {
        nodo.appendChild(nodoTxtMsg);
    } else {
        nodo.replaceChild(nodoTxtMsg, nodo.firstChild);
    }
}

//calcola il risultato del Test
function calcolaRisultato() {
    var numRispCorrette = 0;
    for (var i = 0; i < test.length; i++) {
        var parte = test[i];
        if (parte.rispCorretta == rispDate[i]) {
            numRispCorrette++;
        }
    }
    return numRispCorrette;
}

//Controlla se il quiz è terminato, aggiorna alla domanda successiva o calcola il risultato
function gestoreClickContinua() {
    try {
        if (numDomandaAttuale == numUltDomanda) {
            nodoContinua.value = "Risultato";
        }
        if (numDomandaAttuale == numRicDomanda) {
            nodoComincia.style.display = "inline-block";
            nodoDomande.style.display = "none";
        }
        if (numDomandaAttuale == numDomande) {
            return;
        }
        if (nodoRisp1.checked) {
            rispDate[numDomandaAttuale] = 0;
        } else if (nodoRisp2.checked) {
            rispDate[numDomandaAttuale] = 1;
        } else if (nodoRisp3.checked) {
            rispDate[numDomandaAttuale] = 2;
        } else if (nodoRisp4.checked) {
            rispDate[numDomandaAttuale] = 3;
        } else {
            rispDate[numDomandaAttuale] = -1;
        }
        numDomandaAttuale++;
        if (numDomandaAttuale == numDomande) {

            var esito = calcolaRisultato();
            var s;
            if (esito < 3) {
                s = esito + " risposte corrette su " + numDomande + ". Sembra che tu sia ancora molto incerto.";
            } else if (esito < 6) {
                s = esito + " risposte corrette su " + numDomande + ". Bravo, sei a buon punto ma rimane ancora qualcosa da imparare.";
            } else if (esito > 5) {
                s = esito + " risposte esatte su " + numDomande + ". Perfetto!";
            }

            scriviMessaggio(nodoRisultati, s);
        } else {
            aggDomanda(numDomandaAttuale);
        }
    } catch (e) {
        alert("gestoreClickContinua " + e);
    }
}

//Invoca la funzine nuovoTest e modifica il valore per il pulsante e la proprietà display del div contenente le domande e del pulsante Riprova
function gestoreClickComincia() {
    try {
        nuovoTest();
        nodoContinua.value = "Successiva";
        nodoComincia.style.display = "none";
        nodoDomande.style.display = "block";
    } catch (e) {
        alert("gestoreClickComincia " + e);
    }
}

//Cambia la proprietà display del blocco contenente il test e del pulsante utilizzato per farlo comparire
function gestoreClickMostra() {
    try {
        nodoDomandeRisposte.style.display = "block";
        nodoPresentazione.style.display = "none";
    } catch (e) {
        alert("gestoreClickMostra " + e);
    }
}

//quando la pagina scorre in basso oltre i 800px il pulsante compare

function gestoreScroll() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        nodoPulsTop.style.display = "block";
    } else {
        nodoPulsTop.style.display = "none";
    }
}

// quando l'utente preme il pulsante la pagina ritorna in alto
function gestoreClickPulsTop() {
    document.body.scrollTop = 0; // chrome safari opera
    document.documentElement.scrollTop = 0; // IE Firefox
}

//Dichiaro le variabili globali per i nodi domande e risposte e le variabili di controllo per gli eventi di apparsa e scomparsa dei risultati
var nodoDomandaNum;
var nodoDomandaTxt;
var nodoRisp1;
var nodoRisp1Txt;
var nodoRisp2;
var nodoRisp2Txt;
var nodoRisp3;
var nodoRisp3Txt;
var nodoRisp4;
var nodoRisp4txt;
var nodoMostra;
var nodoDomandeRisposte;
var nodoPresentazione;
var nodoContinua;
var nodoRisultati;
var nodoComincia;
var nodoDomande;
var nodoPulsTop;
var numDomande;
var numUltDomanda;
var numRicDomanda;
var numDomandaAttuale;
var rispDate;

//Gestore globale che collega ad ogni variabile nodo un elemento HTML e invoca le funzioni relative all'avvenire dell'evento dinamico onclick
function gestoreLoad() {
    try {
        nodoDomandaNum = document.getElementById("domandaNum");
        nodoDomandaTxt = document.getElementById("domandaTxt");
        nodoRisp1 = document.getElementById("risp1");
        nodoRisp1Txt = document.getElementById("txtRisp1");
        nodoRisp2 = document.getElementById("risp2");
        nodoRisp2Txt = document.getElementById("txtRisp2");
        nodoRisp3 = document.getElementById("risp3");
        nodoRisp3Txt = document.getElementById("txtRisp3");
        nodoRisp4 = document.getElementById("risp4");
        nodoRisp4Txt = document.getElementById("txtRisp4");
        nodoMostra = document.getElementById("mostra_test");
        nodoDomandeRisposte = document.getElementById("domande_risposte");
        nodoPresentazione = document.getElementById("presentazione_test");
        nodoContinua = document.getElementById("successiva");
        nodoRisultati = document.getElementById("risultato");
        nodoComincia = document.getElementById("comincia");
        nodoDomande = document.getElementById("domande");
        nodoPulsTop = document.getElementById("pulsTop");
        nodoPulsTop.onclick = gestoreClickPulsTop;
        nodoContinua.onclick = gestoreClickContinua;
        nodoComincia.onclick = gestoreClickComincia;
        nodoMostra.onclick = gestoreClickMostra;
        window.onscroll = gestoreScroll;
        numDomande = test.length;
        numUltDomanda = test.length - 2;
        numRicDomanda = test.length - 1;
        nuovoTest();
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

//creo un array associativo con le domande da passare ai nodi, le risposte e l'indice della risposta corretta per ogni domanda data
var test = [{
        domanda: "In quale nazione del Sud Est Asiatico avvenne il revival della Tradizione della Foresta?",
        risposte: [
            "Birmania",
            "Laos",
            "Thailandia",
            "Cambogia"
        ],
        rispCorretta: 2
    },
    {
        domanda: "Qual è il nome del Monaco leggendario creatore dello Zen?",
        risposte: [
            "Nagarjuna",
            "Dogen",
            "Sariputra",
            "Bodhidharma"
        ],
        rispCorretta: 3
    },
    {
        domanda: "In quale zona dell'India nacque il Buddha?",
        risposte: [
            "Nord",
            "Est",
            "Sud",
            "Ovest"
        ],
        rispCorretta: 0
    },
    {
        domanda: "Qual insegnamento è caratteristico della tradizione Vajrayana?",
        risposte: [
            "L'Anatta",
            "Il Tantra",
            "La Kundalini",
            "I mantra"
        ],
        rispCorretta: 1
    },
    {
        domanda: "Qual è la scuola più antica ancora oggi esistente?",
        risposte: [
            "Tendai",
            "Vajrayana",
            "Mahayana",
            "Theravada"
        ],
        rispCorretta: 3
    },
    {
        domanda: "Qual è l'obbiettivo del Bodhisattva nel Buddhismo Mahayana?",
        risposte: [
            "Raggiungere il Nirvana",
            "Liberare tutti gli esseri",
            "Insegnare il Dharma",
            "Liberare tutti gli animali"
        ],
        rispCorretta: 1
    }
];


window.onload = gestoreLoad;