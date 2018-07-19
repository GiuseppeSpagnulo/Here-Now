function Lista() {
    //definisco la funzione Lista e le sue proprietà che avranno come valori i contenuti della pagina 
    this.scuola;
    this.maestro;
    this.nomemaestro;
    this.bio;
    this.img;
    this.title;
    this.contenuto;
    this.imgLink;
    this.link;
    this.descLink;

    this.inizializza = //inizializza Lista
        function(x) {
            this.scuola = x.scuola;
            this.maestro = x.maestro;
            this.nomemaestro = x.nome;
            this.title = x.title;
            this.img = x.img;
            this.contenuto = x.contenuto;
            this.bio = x.bio;
            this.imgLink = x.imgLink;
            this.link = x.link;
            this.descLink = x.descLink;
        }

    this.generaDiv = //specifico quali contenuti visualizzare, come formattarli e dove visualizzarli
        function() {
            return '<div class="lista"><img src=' + this.img + ' class ="imglis" /><h2>' + this.nomemaestro + '</h2><p>' + this.bio + '</p><h3>' + this.title + '</h3><section id="bloss"><p>' + this.contenuto + '</p>' + '<a href=' + this.link + '><img src=' + this.imgLink + ' class ="imglink" /></a><p>' + this.descLink + '</p></section></div>'
        }
}

//creo la funzione Liste e un array associativo 
function Liste() {
    this.elenco = [];

    this.inizializza =
        function(y) {
            for (var i = 0; i < y.length; i++) {
                var lista = new Lista();
                lista.inizializza(y[i]);
                this.elenco.push(lista);
            };
        }

    //scorre tutte le Scuole e creo un array associativo con le opzioni scuole
    this.creaSelectScuola =
        function() {
            var scuole = {};
            for (var i = 0; i < this.elenco.length; i++) {
                scuole[this.elenco[i].scuola] = true;
            }
            var selectDiv = "<option value='null'>scegli una scuola</option>";
            for (var i in scuole) {
                selectDiv += '<option value="' + i + '">' + i + '</option>';
            }
            return selectDiv;
        }

    //scorre i maestri in base alla scuola e creo un array associativo relativo 
    this.creaSelectMaestro =
        function(scuola) {
            var maestri = {};
            for (var i = 0; i < this.elenco.length; i++) {
                if (this.elenco[i].scuola == scuola) {
                    maestri[this.elenco[i].maestro] = true;
                }
            }
            var selectDiv = "<option value='null'>scegli un maestro</option>";
            for (var i in maestri) {
                selectDiv += '<option value="' + i + '">' + i + '</option>';
            }
            return selectDiv;
        }

    //cerca la lista in base alla scuola e al maestro scelti
    this.cercaMaestro =
        function(maestro, scuola) {
            var z = [];
            for (var i = 0; i < this.elenco.length; i++) {
                if (this.elenco[i].scuola == scuola && this.elenco[i].maestro == maestro) {
                    z.push(this.elenco[i]);
                }
            }
            return z;
        }
}

//trova la categoria scuola selezionata
function gestoreScuola(scuola) {
    try {
        var scuola = nodoSelScuola.value;
        nodoSelMaestro.innerHTML = contenuti.creaSelectMaestro(scuola);
    } catch (e) {
        alert("gestoreScuola " + e);
    }
}

//trova la categoria maestro in base alla scuola selezionata e richiama la funzione cercaMaestro che genera l'oggetto Lista e richiama la funzione generaDiv
function gestoreMaestro(scuola, maestro) {
    try {

        var scuola = nodoSelScuola.value;
        var maestro = nodoSelMaestro.value;
        var z = contenuti.cercaMaestro(maestro, scuola);

        if (z.length > 0) {
            var zDiv = "";
            for (var i = 0; i < z.length; i++) {
                zDiv += z[i].generaDiv();
            }
            nodoRisultati.innerHTML = zDiv;
        }
    } catch (e) {
        alert("gestoreMaestro " + e);
    }
}

//rileva lo scroll della pagina e modifica la propriet&agrave; del pulsante
function gestoreScroll() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        nodoPulsTop.style.display = "block";
    } else {
        nodoPulsTop.style.display = "none";
    }
}

// quando l'utente preme il pulsante la pagina ritorna in alto azzerando i px 
function gestoreClickPulsTop() {
    try {
        document.body.scrollTop = 0; // chrome safari opera
        document.documentElement.scrollTop = 0; // IE Firefox
    } catch (e) {
        alert("gestoreClickPulsTop " + e);
    }
}

//dichiaro variabili globali che userò nelle varie funzioni
var nodoPulsTop;
var contenuti;
var nodoSelScuola;
var nodoSelMaestro;
var nodoRisultati;

//inizializzo le variabili e definisco gli eventi dinamici
function gestoreLoad() {
    try {
        nodoSelScuola = document.getElementById("selScuola");
        nodoSelMaestro = document.getElementById("selMaestro");
        nodoRisultati = document.getElementById("risultati");
        nodoPulsTop = document.getElementById("pulsTop");
        contenuti = new Liste();

        contenuti.inizializza(datiContenuti);
        nodoSelScuola.innerHTML = contenuti.creaSelectScuola();
        nodoSelScuola.onchange = gestoreScuola; //alla selezione di un parametro dalla lista si attiva l'evento onchange
        nodoSelMaestro.innerHTML = contenuti.creaSelectMaestro();
        nodoSelMaestro.onchange = gestoreMaestro;
        nodoPulsTop.onclick = gestoreClickPulsTop;
        window.onscroll = gestoreScroll;
    } catch (e) {
        alert("gestoreLoad " + e);
    }
}

//le varie informazioni da visualizzare memorizzate all'interno di un array associativo (datiContenuti)
var datiContenuti = [{
        scuola: "Theravada",
        maestro: "Canone Pali",
        img: "img/canonepali.jpg",
        nome: "Canone Pali",
        bio: "Il Canone Buddhista in lingua Pali &egrave; la pi&ugrave; antica collezione di testi canonici buddhisti pervenutaci integralmente ed &egrave; attualmente adottata dai Buddhisti Theravada del sud-est Asiatico in Sri Lanka, Birmania, Laos e Cambogia. Secondo tradizione il canone pali venne inizialmente tramandato per via orale dopo esser stato fissato nel primo concilio Buddhista a Rajagaha subito dopo la Morte del Buddha. Solo nel I secolo a.c. venne messo per iscritto in Sri Lanka dai membri del monastero Mahavihara, questa edizione per&ograve; and&ograve; perduta e la pi&ugrave; antica di cui disponiamo oggi risale al V secolo d.c.",
        title: "Contenuto",
        contenuto: "Il Canone Pali pu&ograve; essere suddiviso in 3 sezioni maggiori dette Pitaka (lett. canestri) ciascuna delle quali a sua volta composta da sezioni minori. Il Sutta (sansc. Sutra) Pitaka e la raccolta dei discorsi tenuti dal Buddha ai suoi discepoli monaci e laici; il Sutta Pitaka rappresenta il cuore dell&#180;insegnamento buddhista. Il Vinaya Pitaka, &egrave; la raccolta delle regole monastiche che la comunita di bhikkhu (rinuncianti) &egrave; tenuta ad osservare ed utilizzare come mezzo abile per la pratica spirituale. L&#180;Abhidhamma Pitaka, &egrave; la raccolta degli insegnamenti pi&ugrave; speculativi riguardante le varie tematiche della visione spirituale Buddhista, nonostante non sia considerata come l'insegnamento originario del Buddha viene comunque inclusa nella raccolta canonica.",
        link: "http://www.canonepali.net",
        imgLink: "img/canpali.jpg",
        descLink: "Il sito Canone Pali.net offre l&#180;accesso ad una vasta gamma di testi Canonici tradotti in italiano a partire dal Pali o da altre traduzioni inglesi. Rappresenta l&#180;unica risorsa in lingua italiana tramite la quale avere accesso diretto agli insegnamenti pi&ugrave; buddhisti pi&ugrave; antichi.",
    },

    {
        scuola: "Theravada",
        maestro: "Ajahn Chah",
        img: "img/AjChah.jpg",
        nome: "Ajahn Chah",
        bio: "Il Venerabile Ajahn Chah &eacute; stato uno dei maestri pi&ugrave; noti della Tradizione della Foresta in  Thailandia. Nacque nel 1918 in un piccolo villaggio del nord-est e dopo aver finito i suoi studi entro subito come novizio in monastero. Dopo aver praticato con numerosi maestri, tra cui Ajahn Mun, riconosciuto come il restauratore della Tradizione della Foresta nell&#180;800. Dopo aver trascorso alcuni anni in Tudong, una nota pratica Buddhista che prevede di pellegrinare nelle foreste con una ciotola per elemosinare il cibo come unico avere, ritorno nella sua provincia natale dove fondo quello che poi diverr&agrave; uno dei pi&ugrave; noti e stimati monasteri della Foresta, il Wat Pah Pong. Ajahn Chah divenne particolarmente noto perch&eacute; negli anni 60 cominci&ograve; ad accogliere anche occidentali nei suoi monasteri, uno dei quali &egrave; il Venerabile Ajahn Sumedho (Robert Jackman), ex Peace Corps, che prese ordinazione monastica con lui ed &eacute; ancora oggi uno fra i Monaci Buddhisti occidentali pi&ugrave; anziani viventi. Grazie a lui, la Thai Forest Tradition si &egrave; diffusa in tutto l&#180;occidente con monasteri in tutta Europa e in America.",
        title: "Insegnamento",
        contenuto: "L&#180;approcio all&#180;insegnamento di Ajahn Chah si basa su un principio fondamentale dei monaci della Foresta, l&#180;esperienza diretta di una vita in linea con l&#180;insegnamento del Buddha, dedita alla rinuncia, alla vita in foresta e alla coltivazione della Consapevolezza o presenza mentale (Sati - in Pali) in qualunque occasione della giornata. Nei monasteri di Ajahn Chah l&#180;enfasi non &eacute; su una particolare tecnica di meditazione o su un particolare insegnamento teorico, ma sulla pratica quotidiana, sulla vita monastica intesa come opportuinit&aacute; di praticare il sentiero in ogni momento, in ogni piccolo lavoretto, da spazzare le foglie a rammendare il proprio abito, dal costruire una Kuti (capanna di legno tipica dei monaci della foresta) al semplice passeggiare nella natura. Numerosi sono i suoi discorsi trascritti in Inglese e Italiano disponibili sia presso la casa editrice Ubaldini, sia gratuitamente nei monasteri affiliati. Il modo di fare schietto e diretto di Ajahn Chah ha fatto si che questa magnifica tradizione monastica Buddhista sia divenuta una delle pi&ugrave; apprezzate e diffuse in tutto l&#180;occidente.",
        link: "http://forestsangha.org/",
        imgLink: "img/ForSangha.png",
        descLink: "Il sito Forest Sangha.org &egrave; il sito ufficiale della Tradizione della Foresta Thai nel lignaggio di Ajahn Chah in lingua inglese, funge da centro di snodo per tutti i monasteri affiliati in Europa, Asia e America. Offre un'ampia raccolta di insegnamenti in varie lingue, sia scritti che audio, da meditazioni guidate a discorsi tenuti dai Monaci durante ritiri organizzati o nella vita quotidiana del monastero. Vi &egrave; inoltre una vasta galleria fotografica con suggestivi scatti di Templi, foreste ed attivit&agrave; strettamente connesse con la pratica Buddhista. Oltre al contenuto presente sul sito stesso &egrave; possibile accedere ad una serie di ulteriori siti consigliati per approfondire taluni temi o cercare i contatti pi&ugrave; vicini.",
    },

    {
        scuola: "Theravada",
        maestro: "Mahasi Sayadaw",
        img: "img/mahasi.jpg",
        nome: "Mahasi Sayadaw",
        bio: "Il Venerabile Mahasi Sayadaw &egrave; stato il principale maestro del movimento Vipassana che negli anni 60/70 raccolse in se praticanti da tutto il mondo. Nato in Birmania nel 1904, Mahasi divenne novizio all&#180;et&agrave; di 12 anni e da li cominci&ograve; i suoi studi sul Canone Pali e in particolare sulla sezione dell&#180;Abdhidhamma, ritenuto di fondamentale importanza nella scuola Birmana. Divenne noto all&#180;attenzione dei praticanti spirituali di tutto il mondo quando sulla base dei suoi studi e della sua pratica mise a punto un metodo meditativo incredibilmente dettagliato denominato appunto Metoto Mahasi. Trascorse gran parte della sua vita in Birmania fondando monasteri e tenendo ritiri per monaci e laici in tutta la nazione. Pochi anni prima della sua morte viaggi&ograve; nei centri di meditazioni occidentali come l&#180;Insight Meditation Society di Barre, Massachussets, presso cui diede insegnamenti e tenne ritiri di meditazione intensiva. Ancora oggi le sue opere sono ritenute alla base di quasi tutte le tecniche meditative Buddhiste e la sua fama non accenna a diminuire.",
        title: "Insegnamento",
        contenuto: "L&#180;insegnamento del Venerabile Mahasi Sayadaw si basa sui suoi attenti studi compiuti sulla sezione dell&#180;Abhidhamma del Canone Pali e sull&#180;intensa pratica meditativa condotta da lui stesso per gran parte della sua vita. Come da tradizione l&#180;Abhidhamma pone una grande attenzione alla speculazione riguardante gli stadi meditativi scomponendo gli stadi mentali in frazioni millesimali dette Cetasika, lo stesso tipo di approccio viene applicato alla pratica meditativa in se. Nella scuola di Mahasi la meditazione formale, seduta e camminata, diventa l&#180;elemento centrale, l&#180;attenzione e l&#180;intensit&agrave; impiegata nel notare ogni minima variazione dell&#180;oggetto di meditazione, spesso il respiro o il movimento dell&#180;addome, garantiscono una presenza mentale costante e potente che consentono al meditante di rimanere focalizzato e osservare in maniera distaccata i fenomeni che nascono e svaniscono continuamente. Fondamentali quindi nell&#180;approccio di Mahasi sono i ritiri intensivi di meditazione, interi periodi di durata variabile in cui il meditante taglia ogni contatto non indispensabile con il mondo e si dedica a coltivare l'oggetto meditativo e nient&#180;altro.",
        link: "http://mahasi.eu",
        imgLink: "img/mahasieu.png",
        descLink: "La principale risorsa in lingua inglese per gli insegnamenti di Mahasi Sayadaw &egrave; il sito Mahasi.eu. Il sito raccoglie e promuove gli insegnamenti di meditazione del metodo Mahasi come sono stati tramandai dai sue due discepoli principali, il Venerabile U Janaka ed il Venerabile U Pandita. Questi due maestri furono molto apprezzati in occidente e i loro testi sono stati tradotti e pubblicati anche in Italiano, a differenza di quelli del loro maestro, disponibile solo in lingua inglese. Il sito offre una raccolta di scritti di Mahasi e di altri maestri, guide dettagliate su come prepararsi per un ritiro intensivo di Vipassana, oltre che ad una serie di contatti e link a centri locali in Europa e America.",
    },

    {
        scuola: "Mahayana/Zen",
        maestro: "Thich Nhat Hanh",
        img: "img/thichnathanh.jpg",
        nome: "Thich Nhat Hanh",
        bio: "Nato nel 1926 nella regione centrale del Vietnam entr&ograve; nella vita monastica all&#180;et&agrave; di 16 anni in un lignaggio Mahayana Thien (Zen), dopo aver trascorso alcuni anni sotto la guida di maestri Mahayana e Zen Vietnamiti, negli anni &#180;60, durante la guerra del Vietnam, Nhat Hanh viaggi&ograve; negli Stati Uniti dove insegn&ograve; religione comparare presso la Princeton University e successivamente alla Columbia University. Qui cominci&ograve; a farsi un seguito non solo come studioso ma anche come Maestro di Dharma. Nel 1967 incontr&ograve; Martin Luther King che lo candid&ograve; come Nobel per la pace. Negli anni 70 fond&ograve; alcuni piccoli centri durante i suoi viaggi fin quando nel 1982 in Francia, non vide la luce il Plum Village, una delle pi&ugrave; grandi comunit&agrave; di monaci e laici Buddhisti in Occidente, situati nei pressi di Bordeaux nella quale tutt&#180;ora vive e insegna.",
        title: "Insegnamento",
        contenuto: "Thich Nhat Hanh nel suo insegnamento mette l&#180;accento sulla coltivazione della compassione e della benevolenza verso tutti gli esseri, incarnando in pieno lo spirito del Bodhistavva tipico della scuola Mahayana, numerose sono le pratiche collettive nel suo centro Plum Village, e in quelli associati. Molto attivo anche nel sociale e nella beneficenza Thich Nhat Hanh rappresenta nu vero e proprio idolo spirituale per intere generazioni. La sua peculiarit&agrave; sta nell&#180;affiancare un approccio dottrinale tipicamente Mahayana con una pratica di tipo Zen che mira alla semplicit&agrave; e alla coltivazione della consapevolezza nel quotidiano. Noto anche per i suoi studi di religioni comparate, esso propone una sintesi sincretistica mai banale per avicinare persone di Fedi diverse accomunate dall sentimento di ricerca spirituale.",
        link: "http://plumvillage.org",
        imgLink: "img/plumvill.png",
        descLink: "Il sito del Plum Village, il centro principale in cui risiede e insegna Thich Nhath Hanh, &egrave; una ricca risorsa di insegnamenti spirituali del proprio maestro e dei suoi discepoli principali. Da istruzioni sulla meditazione a discorsi di Dharma, tutto &eacute; bilanciato per offrire un primo approccio esaustivo a chi si avvicina per la prima volta a questa scuola. Inoltre il mezzo principale tramite la quale &eacute; possibile prenotare ritiri e partecipare alla vita del Centro, oppure contribuire alle attivit&agrave; di beneficenza da esso proposte.",
    },

    {
        scuola: "Mahayana/Zen",
        maestro: "Sheng Yen",
        img: "img/shengyen.jpg",
        nome: "Sheng Yen",
        bio: "Il Venerabile Maestro Sheng Yen nacque nel 1930 nei pressi di Shanghai e divenne monaco all&#180;et&agrave; di 13 anni. Nel 1949 partecip&ograve; alla guerra civile Cinese tra le fila dell&#180;esercito nazionalista. Dopo la guerra riprese le sue attivit&agrave; di insegnante di Dharma fin quando non riprese ordinazione monastica nel 1959. Col passare degli anni divenne uno tra i pi&ugrave; noti Meastri Chan rispettato da tutti i due lignaggi storici Cinesi, Linji (il Giapponese Rinzai) e Caodong (il Giapponese Soto). Divenne abate di uno dei pi&ugrave; importanti Monasteri in Cina e nel 1975 viaggi&ograve; negli Stati Uniti dove fondo il Dharma Drum Retreat Center, a Pine Bush, New York, ancora oggi considerato il principale centro connesso con il suo lignaggio e che tramanda i suoi insegnamenti in Occidente.",
        title: "Insegnamento",
        contenuto: "Sheng Yen basa il suo insegnamento su una ricca conoscenza delle scritture canoniche e di quelle interne ai suoi lignaggi. Tradizionalmente le due scuole che lui rappresenta unicamente nella sua persone vengono considerate come opposte, la prima quella Rinzai, pi&ugrave; incentrata sull&#180;uso di paradossi concettuali, i cosiddetti Koan, come mezzi abili per rompere le barriere della ragione e innescare la compresine profonda del Risveglio, l&#180;altra, la scuola Soto, propone invece un approccio pi&ugrave; quietista e graduale con la meditazione seduta (Zazen) come centro focale della pratica. Sheng Yen &egrave; molto apprezzato dai praticanti occidentali perch&eacute;, grazie ai suoi studi in vari campi, riesce sempre a tradotte in termini pi&ugrave; secolari e comprensibili anche a chi non esperto di terminologia e spiritualit&agrave; orientale. Anche Sheng Yen, come gli altri maestri di meditazione, insiste sull&#180;uso della presenza mentale costante in ogni azione del quotidiano. Sheng Yen inoltre include alcuni elementi del Buddhismo della Terra Pura, una scuola Mahayana che propaganda un approccio di tipo salvifico molto comune fra le religioni abramitiche (Ebraismo, Cristianesimo e Islam).",
        link: "http://www.dharmadrum.org",
        imgLink: "img/dhdrmountain.jpg",
        descLink: "Il Dharma Drum Moutain &eacute; il centro pi&ugrave; greande fondato da Sheng Yen in persona, ad esso sono collegati altri monasteri e centri minori in tutto il mondo. Tramite raccolte di testi, insegnamenti audio, le numerose attivit&agrave; e uno stile di vite semplice e socialmente impegnato, il Dharma Drum Mountain grazie al suo sito web rende accessibile a tutto il mondo una visione della vita incentrata sulla compassione, in pieno spirito Mahayana. ",
    },

    {
        scuola: "Mahayana/Zen",
        maestro: "Taisen Deshimaru",
        img: "img/deshimaru.jpg",
        nome: "Taisen Deshimaru",
        bio: "Se c'&egrave; un Maestro che rappresenti lo Zen Soto in Occidente questo &eacute; senza ombra di dubbio Taisen Deshimaru. Nato nella prefettura di Saga in Giappone nel 1914 venne cresciuto dal Nonno, un ex Samurai, e dalla madre una devota seguace della setta Buddhista Jodo. Da ragazzo studi&ograve; il Cristianesimo, in particolare il Protestantesimo fin quando non decise di ritornare al Buddhismo e da li entr&ograve; un contatto con la scuola Rinzai. Col tempo insoddisfatto della sua pratica e della sua vita si avvicin&ograve; all'insegnamento di un noto maestro Soto dei tempi, Kodo Sawaki con la quale studi&ograve; per circa 14 anni e dai cui ricevette la trasmissione del Dharma. Venne incaricato di rappresentare lo zen Soto in Europa e scelse la Francia come punto di partenza perch&eacute; affascinato dalla tradizione filosofica Francese. Qui fondo quello che ancora oggi &eacute; considerato il principale monastero Zen Soto in Europa, La Gendronni&eacute;re, qui istru&igrave; numerosi maestri provenienti da tutta Europa che sotto la sua benedizione fondarono monasteri affiliati nei loro luoghi di origine.",
        title: "Insegnamento",
        contenuto: "Lo stile di insegnamento di Taisen Deshimaru rappresenta perfettamente l&#180;approccio Zen moderno che cerca di rimanere quanto pi&ugrave; possibile ancorato alle forme tradizionali di pratica e trasmissione. Secondo Deshimaru l&#180;essenza dello Zen non &eacute; esprimibile in parole, e solo mettendo in pratica lo Zazen, la meditazione seduta con le sue varie tecniche di concentrazione e consapevolezza, si pu&ograve; realizzarne il significato e il Risveglio. Deshimaru metteva l&#180;accento sul liberarsi dall&#180;idea di profitto, praticare il sentiero, la benevolenza e lo zazen senza pretendere nulla in cambio, solo abbandonando l&#180;idea di guadagno e di profitto si pu&ograve; riuscire nell&#180;ardua impresa di superare i limiti dell&#180;io. Nei monasteri fondati da Deshimaru la vita quotidiana dei monaci &egrave; incentrata alla coltivazione costante della consapevolezza, pur non avendo una disciplina monastica cos&igrave; articolata come quella dei monaci Theravada, i monasteri Soto sono noti per la rigorosit&agrave; e l&#180;intesit&aacute; conferita alla pratica quotidiana.",
        link: "http://www.zen-azi.org/en",
        imgLink: "img/deshi.png",
        descLink: "Fondata da lui stesso nel 1970, l&#180;Associazione Zen Internazionale, inizialmente chiamata Associazione Zen Europea, ha lo scopo ufficiale di diffondere la pratica dello Zen fungendo da collante per diversi Maestri provenienti da diversi lignaggi ma tutti accomunati dall&#180;appartenenza alla scuola Soto in Occidente. Il centro principale dell&#180;associazione &eacute; costituito dal tempio Zen di La Gendronniere nella quale vengono continuamente organizzati sesshin (ritiri organizzati) e scuole di formazione per aspiranti maestri. Inoltre l&#180;AZI contribuisce alla pubblicazione di uno Zen Magazine annuale e di un bollettino contenete aggiornamenti da tutti i centri affiliati. Sul sito &egrave; disponibile un calendario sempre aggiornato su tutte le attivit&agrave; programmate nei vari Templi.",
    },

    {
        scuola: "Vajrayana",
        maestro: "Dalai Lama",
        img: "img/hhdl.png",
        nome: "Dalai Lama",
        bio: "Tenzin Gyatso, l&#180;attuale quattordicesimo Dalai Lama &egrave; nato il 6 luglio 1934 in una piccola localit&agrave; nel nord est del Tibet. All&#180;et&agrave; di due anni venne riconosciuto come la reincarnazione del tredicesimo Dalai Lama e quindi manifestazione di Avalokiteshvara o Cenrezing in lingua Tibetana, il Bodhistavva della compassione e protettore del Tibet. Cominci&ograve; la sua formazione monastica all'et&agrave; di sei anni, studiando varie discipline, non solo di tipo religioso. La vita del Dalai Lama &egrave; intimamente connessa con quella del Tibet, in quanto dal 1950, dopo l&#180;invasione Cinese del Tibet, sua santit&agrave; acquis&igrave; pieno potere politico sulla Nazione fin quando nel 1959 dopo la violenta repressione ai danni del popolo Tibetano non f&uacute; costretto ad abbandonare la nazione e rifugiarsi a Dharmasala nel nord dell&#180;India. Da allora la sua vita &egrave; stata costantemente impegnata nell'attivismo e la sensibilizzazione al dramma del Tibet, nel tentativo di attuare un processo di Democratizzazione che, come oggi vediamo, non ha purtroppo portato frutti in quando ormai il Tibet &eacute; stato completamente inglobato come provincia Cinese.",
        title: "Insegnamento",
        contenuto: "Il quattordicesimo Dalai Lama, Tenzin Gyatso, trae i suoi insegnamenti principalmente dal suo lignaggio di appartenenza, il Gelug&#180;pa nota anche come scuole dei Berretti Gialli per il caratteristico copricapo che i suoi monaci indossano in occasioni formali e celebrazioni rituali. L&#180;insegnamento principale dei Gelug ridiede nel Lamrim, una esposizione molto dettagliata degli stadi del risveglio composta in principio da un asceta Indiano di nome Atisa. Il punto cardine di questo insegnamento sta nell&#180;importanza per il praticante di risvegliare il Bodhicitta, la mente del Buddha, e coltivarla costantemente con una condotta morale impeccabile affiancata dalle pratiche esoteriche tramandate nei Tantra. Queste pratiche vanno dalla memorizzazione e ripetizione di formule di potere, dette Mantra, alla messa in atto di complessi rituali ricchi di simbologie e fondati sul ricco pantheon che popola la cosmologia Tibetana. Nonostante il Dalai Lama sia ormai da decenni spesso occupato con questioni politiche e sociali non perde mai opportunit&agrave; di trasmettere l&#180;insegnamento del Buddha tramandatoli dai suoi Maestri.",
        link: "http://www.dalailama.com",
        imgLink: "img/dllorg.png",
        descLink: "Il sito ufficiale del Dalai Lama si occupa di seguire tutte le vicende pertinenti la vita di Tenzin. Comprende al suo interno una dettagliata biografia con appendici ricche di dettagli riguardo le moadlit&aacute; di trasmissione e reincarnazione con la quale un nuovo Dalai Lama si manifesta sulla terra. Sul sito &eacute; presente il calendario delle attivit&agrave; del Maestro, sempre impegnato a tenere discorsi per le platee di tutto il mondo. Non ci sono link a organizzazioni e centri direttamente affiliati con lui in quanto, pur appartenendo ad una precisa scuola all&#180;interno della Tradizione Vajrayana, essendo rivestito di un ruolo politico, oramai non pi&ugrave; funzionale da quando la Cina ha completamente assorbito il Tibet nelle sue provincie, rimane comunque stimato e venerato in tutte le altre scuole Tibetane. Non mancher&agrave; quindi di trovare sue raffigurazioni nei numerosi centri di altri lignaggi Vajrayana sparsi per il mondo.",
    },

    {
        scuola: "Vajrayana",
        maestro: "Namkhai Norbu",
        img: "img/norbu.jpg",
        nome: "Namkhai Norbu",
        bio: "Nato nel 1938 in una regione ad est del Tibet, Namkhai venne riconosciuto all&#180;et&agrave; di 2 anni come un Tulku, ossia la reincarnazione di un particolare maestro esoterico dello Dzogchen. Sin da bambino venne subito fatto istruire nella disciplina e nella conoscenza Vajrayana che comprende lo studio dei testi canonici e dei testi esoterici dei Tantra. Grande esperto di tradizione e cultura Tibetana insegno lingua Tibetana e Mongolo all&#180;universit&agrave; Orientale di Napoli dal 1964 al 1992, sotto invito del professor Giuseppe Tucci. Fu cos&igrave; che nel 1976 cominci&ograve; a impartire insegnamenti di Dzogchen in Occidente, cominciando proprio in Italia e poi spostante in numerosi altri Paesi. Venne cos&igrave; fondata la Comunit&agrave; Dzogchen Internazionale per diffondere lo Dzogchen e preservare la cultura del Tibet.",
        title: "Insegnamento",
        contenuto: "Cos&igrave; come la traduzione del termine Dzogchen (grande perfezione) suggerisce, l&#180;insegnamento di questa scuola, mira ad ottenere e preservare quello stato primordiale di perfezione naturale della mente. Lo Dzogchen non esiste solo come scuola distinta ma anche come nucleo pi&ugrave; profondo ed esoterico del lignaggio Nyingma Tibetano e e della tradizione Shamanica Bon originaria del Tibet e del Nepal. Solitamente la pratica Dzogchen comincia solo dopo  che il Guru abbia attentamente preparato il discepolo con una lunga serie di pratiche. Riscoprire la perfezione naturale della mente &egrave; il primo passo, detta Rigpa, la natura propria di ogni essere. Potente ,mezzo per raggiungere questo stadio &eacute; la meditazione, applicata in questa scuola con svariati metodi di solito accomunabili alle tecniche Zen o dei Monaci della Foresta. ",
        link: "http://www.dzogchen.it/",
        imgLink: "img/dzgchen.png",
        descLink: "La comunit&agrave; Dzogchen Internazionale &eacute; una comunit&agrave; laica diffusa in tutto il mondo. Funge da centro nevralgico per tutti i centri che si ispirano all&#180;insegnamento di Namkhai Norbu. Questi centri sono tutti strutturati in 3 gruppi interni detti Gakyil, intesi come organi collegiali con diverse funzioni, economiche, organizzative e spirituali. Il sito quindi offre una mappa utile per trovare il centro pi&ugrave; vicino ed entrare in contatto con questa vastissima comunit&agrave;. ",
    }

];

window.onload = gestoreLoad;