/*habilitats generades dinamicament*/

const skills = [
  { nom: "HTML", visible: true },
  { nom: "CSS", visible: true },
  { nom: "JAVASCRIPT", visible: true },
  { nom: "FIGMA", visible: true },
  { nom: "C", visible: true },
  { nom: "C++", visible: true },
  { nom: "Da Vinci Resolve", visible: false },
  { nom: "Godot", visible: false }
];


const container = document.getElementById("container");
const btn = document.getElementById("toggle-btn");
const formacio = document.getElementById("formacio");
const habilitats = document.getElementById("habilitats");


let mostrarExtres = false;


function renderSkills() {

  container.innerHTML = "";

  
  for (let i = 0; i < skills.length; i++) {

    if (skills[i].visible || mostrarExtres) {

      
      const nouElement = document.createElement("span");

      
      nouElement.textContent = "· " + skills[i].nom;


      nouElement.classList.add("skill");

      document.getElementById("container").appendChild(nouElement);
    }
  }
}

btn.addEventListener("click", function() {


  mostrarExtres = !mostrarExtres;


if (mostrarExtres) {
  btn.textContent = "Veure menys";
  formacio.style.marginTop = "50px";
  habilitats.style.marginTop = "50px"; 
} else {
  btn.textContent = "Veure més";
  formacio.style.marginTop = "0px";
  habilitats.style.marginTop = "0px"; 
}


  renderSkills();
});


renderSkills();

/*error form*/


const formulari = document.getElementById("formulariContacte");

formulari.addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const correu = document.getElementById("correu").value.trim();
  const missatge = document.getElementById("missatge").value.trim();


  const errorAntic = document.getElementById("errorMsg");
  if (errorAntic) {
    errorAntic.remove();
  }

  const goodAntic = document.getElementById("goodMsg");
  if (goodAntic) goodAntic.remove();

  /* miro si algun camp esta buit */

  if (nom === "" || correu === "" || missatge === "") {

    /* es crea el text del error */
    const nouElement = document.createElement("p");

    /* creo el missatge d'error*/
    nouElement.textContent = "ERROR. Dades no validades correctament.";

    nouElement.id = "errorMsg";
    nouElement.classList.add("error");

    /* el fico al dom */
    formulari.appendChild(nouElement);

  /* si no entra al if del error, es que tot esta be */
  } else {

    const correcte = document.createElement("p");
    correcte.textContent = "Missatge enviat correctament!";
    correcte.id = "goodMsg";
    correcte.classList.add("good");

    formulari.appendChild(correcte);

    formulari.reset();
  }
});


/*missatge dinamic en funcio de la hora */

function init() {
  const headerTop = document.getElementById("header-top");



  const salutacio = document.createElement("p");

  const hora = new Date().getHours();
  
  /* miro la hora */
  if (hora < 12) {
    salutacio.textContent = "Bon dia!";
  } else if (hora < 18) {
    salutacio.textContent = "Bona tarda!";
  } else {
    salutacio.textContent = "Bona nit!";
  }


  salutacio.classList.add("salutacio");

headerTop.insertBefore(salutacio, headerTop.firstChild);
}

init();

/* edat */
function calcularEdat(dob) {
  const avui = new Date();

  let edat = avui.getFullYear() - dob.getFullYear();

  const haFetAnys =
    avui.getMonth() > dob.getMonth() ||
    (avui.getMonth() === dob.getMonth() &&
      avui.getDate() >= dob.getDate());

  if (!haFetAnys) edat--;

  return edat;
}

function mostrarEdat() {
  const element = document.getElementById("naixement");

  const dataNaixement = new Date(2006, 11, 20); // 20/12/2006

  const edat = calcularEdat(dataNaixement);

  element.textContent = `Nascut el 20/12/2006 · ${edat} anys`;
}

mostrarEdat();