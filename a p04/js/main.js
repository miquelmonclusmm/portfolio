/*tots els plats */
const carta = [
    { id: 1, nom: "Bruschetta Toscana", descripcio: "Pa cruixent amb tomàquet fresc, alfàbrega i oli d’oliva verge extra.", preu: 6.50, categoria: "aperitivi", imatge: "img/bruschetta.jpg" },
    { id: 2, nom: "Carpaccio di Manzo", descripcio: "Fines làmines de vedella amb parmesà, rúcula i toc de llimona.", preu: 11.90, categoria: "aperitivi", imatge: "img/carpaccio.jpg" },
    { id: 3, nom: "Crocchette di mozzarella", descripcio: "Croquetes artesanes farcides de mozzarella fosa i herbes italianes.", preu: 7.50, categoria: "aperitivi", imatge: "img/croquetes.jpg" },
    { id: 4, nom: "Pizza Margherita", descripcio: "Salsa de tomàquet, mozzarella fresca i alfàbrega acabada de tallar.", preu: 12.50, categoria: "pizze", imatge: "img/margherita.jpg" },
    { id: 5, nom: "Pizza Diavola", descripcio: "Mozzarella, salami picant italià i un toc d’oli especiat.", preu: 14.00, categoria: "pizze", imatge: "img/diavola.jpg" },
    { id: 6, nom: "Pizza 4 Formaggi", descripcio: "Barreja cremosa de mozzarella, gorgonzola, parmesà i formatge de cabra.", preu: 14.50, categoria: "pizze", imatge: "img/formaggi.jpg" },
    { id: 7, nom: "Spaghetti Carbonara", descripcio: "Espaguetis amb salsa cremosa, pecorino, ou i guanciale cruixent.", preu: 13.50, categoria: "pasta", imatge: "img/carbonara.jpg" },
    { id: 8, nom: "Tagliatelle al Pesto", descripcio: "Pasta fresca amb pesto d’alfàbrega, parmesà i pinyons torrats.", preu: 12.90, categoria: "pasta", imatge: "img/pesto.jpg" },
    { id: 9, nom: "Lasagna", descripcio: "Lasanya casolana amb ragú de vedella, beixamel i mozzarella gratinada.", preu: 15.50, categoria: "pasta", imatge: "img/lasagna.jpg" },
    { id: 10, nom: "Tiramisù", descripcio: "Postres tradicionals italians amb cafè, mascarpone i cacau pur.", preu: 6.90, categoria: "dolci", imatge: "img/tiramisu.jpg" },
    { id: 11, nom: "Panna Cotta", descripcio: "Crema suau de vainilla amb coulis de fruits vermells.", preu: 6.50, categoria: "dolci", imatge: "img/pannacotta.jpg" },
    { id: 12, nom: "Gelatto", descripcio: "Gelat a escollir entre xocolata, vainilla i llimona.", preu: 6.50, categoria: "dolci", imatge: "img/gelatto.jpg" }
];

// session storage de la comanda
let comanda = JSON.parse(sessionStorage.getItem("comanda")) || [];


const menuContainer = document.getElementById("menu-container");
const llistaResum = document.getElementById("llista-resum");
const totalHeader = document.getElementById("total");
const totalFinal = document.getElementById("total-final");
const vistaCarta = document.getElementById("vista-carta");
const vistaConfirmacio = document.getElementById("vista-confirmacio");

/*
crear i ficar els plats dinamicament
*/
function mostrarPlats(filtre = "tots") {
    menuContainer.innerHTML = "";
    const categories = (filtre === "tots") ? ["aperitivi", "pizze", "pasta", "dolci"] : [filtre];

    categories.forEach(cat => {
        const plats = carta.filter(p => p.categoria === cat);
        if (plats.length > 0) {
            const seccio = document.createElement("section");
            seccio.className = "categoria-seccio";

            const h2 = document.createElement("h2");
            h2.textContent = cat.toUpperCase();
            
            const hr = document.createElement("hr");
            const grid = document.createElement("div");
            grid.className = "plats-grid";

            plats.forEach(p => {
                const article = document.createElement("article");
                article.className = "plat";

                const img = document.createElement("img");
                img.src = p.imatge;
                img.alt = p.nom;

                const info = document.createElement("div");
                info.className = "info-text-plat";

                const h3 = document.createElement("h3");
                h3.textContent = p.nom;

                const desc = document.createElement("p");
                desc.textContent = p.descripcio;

                const spanPreu = document.createElement("span");
                spanPreu.className = "preu";
                spanPreu.textContent = p.preu.toFixed(2) + "€";

                info.append(h3, desc, spanPreu);

                const btn = document.createElement("button");
                btn.textContent = "Afegir";
                btn.onclick = () => canviarQuantitat(p.id, 1);

                article.append(img, info, btn);
                grid.appendChild(article);
            });

            seccio.append(h2, hr, grid);
            menuContainer.appendChild(seccio);
        }
    });
}

/**
Pinta el resum de la comanda a la vista de confirmació
 */
function renderitzarResum() {
    llistaResum.innerHTML = "";
    
    const agrupats = comanda.reduce((acc, p) => {
        acc[p.id] = acc[p.id] || { ...p, quantitat: 0 };
        acc[p.id].quantitat++;
        return acc;
    }, {});

    Object.values(agrupats).forEach(p => {
        const item = document.createElement("div");
        item.className = "item-resum";

        const info = document.createElement("div");
        info.className = "info-plat";

        const nom = document.createElement("strong");
        nom.textContent = p.nom + " ";

        const subtotal = document.createElement("span");
        subtotal.textContent = "(" + (p.preu * p.quantitat).toFixed(2) + "€)";

        const ctrls = document.createElement("div");
        ctrls.className = "controls-quantitat";

        const bM = document.createElement("button");
        bM.className = "btn-minus"; bM.textContent = "-";
        bM.onclick = () => canviarQuantitat(p.id, -1);

        const qty = document.createElement("span");
        qty.textContent = p.quantitat;

        const bP = document.createElement("button");
        bP.className = "btn-plus"; bP.textContent = "+";
        bP.onclick = () => canviarQuantitat(p.id, 1);

        ctrls.append(bM, qty, bP);
        info.append(nom, subtotal, ctrls);

        const btnE = document.createElement("button");
        btnE.className = "btn-eliminar"; btnE.textContent = "Eliminar";
        btnE.onclick = () => {
            comanda = comanda.filter(x => x.id !== p.id);
            actualitzarUI();
            renderitzarResum();
        };

        item.append(info, btnE);
        llistaResum.appendChild(item);
    });
}

/**
afegir i treure elements de la comandaa
 */
function canviarQuantitat(id, canvi) {
    if (canvi > 0) {
        comanda.push(carta.find(p => p.id === id));
    } else {
        const i = comanda.map(p => p.id).lastIndexOf(id);
        if (i !== -1) comanda.splice(i, 1);
    }
    actualitzarUI();
    if (!vistaConfirmacio.classList.contains("hidden")) renderitzarResum();
}

/**
acutalitzar total i gaurdar comanda
 */
function actualitzarUI() {
    sessionStorage.setItem("comanda", JSON.stringify(comanda));
    const t = comanda.reduce((acc, p) => acc + p.preu, 0);
    const textPreu = t.toFixed(2).replace(".", ",") + "€";
    totalHeader.textContent = textPreu;
    if (totalFinal) totalFinal.textContent = "Total: " + textPreu;
}

/*
clic al carrito i buit? alert de q esta buit, si no entres a la comanda i ho veus tot
*/

document.getElementById("boto-carrito").onclick = () => {
    if (comanda.length === 0) return alert("El carret està buit!");
    vistaCarta.classList.add("hidden");
    vistaConfirmacio.classList.remove("hidden");
    renderitzarResum();
};

document.getElementById("btn-tornar").onclick = (e) => {
    e.preventDefault();
    vistaConfirmacio.classList.add("hidden");
    vistaCarta.classList.remove("hidden");
};

/*
filtre categoria
*/
document.querySelectorAll(".filtres button").forEach(btn => {
    btn.onclick = (e) => {
        document.querySelectorAll(".filtres button").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        mostrarPlats(e.target.dataset.categoria);
    };
});

/*
validacio formulari
*/

document.getElementById("formulari-comanda").onsubmit = function(e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const formulari = e.target;


    const errorAntic = document.getElementById("errorMsg");
    if (errorAntic) errorAntic.remove();
    const goodAntic = document.getElementById("goodMsg");
    if (goodAntic) goodAntic.remove();

    /* mirem q no estigui buit */
    if (nom === "" || comanda.length === 0) {
        const nouElement = document.createElement("p");
        nouElement.id = "errorMsg";
        nouElement.className = "error-text";
        
        if (comanda.length === 0) {
            nouElement.textContent = "ERROR. No pots enviar una comanda buida.";
        } else {
            nouElement.textContent = "ERROR. El nom és obligatori.";
        }
        
        formulari.appendChild(nouElement);
    } else {
        const correcte = document.createElement("p");
        correcte.textContent = "Comanda confirmada! Detectant ubicació...";
        correcte.id = "goodMsg";
        correcte.className = "success-text";
        formulari.appendChild(correcte);

        /* geolocalitzacio */
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const url = `https://www.google.com/maps?q=${lat},${lon}`;
                
                setTimeout(() => {
                    window.open(url, "_blank");
                    sessionStorage.clear();
                    location.reload();
                }, 1500);
            }, () => {
                alert("No s'ha pogut obtenir la ubicació.");
            });
        }
    }
};

/* al principi crearem els plats */
window.onload = () => {
    mostrarPlats();
    actualitzarUI();
};