class Sorteo {
  constructor(name, precio, premio) {
    this.name = name;
    this.precio = precio;
    this.premio = premio;
    this.numerosSorteados = [];
  }

  sortearNumeros() {
    this.numerosSorteados = [];
    for (let i = 0; i < 6; i++) {
      let sorteo = Math.round(Math.random() * 46);
      if (sorteo === 46) {
        sorteo = "00";
      }
      if (!this.numerosSorteados.includes(sorteo)) {
        this.numerosSorteados.push(sorteo);
      } else {
        i -= 1;
      }
    }
  }

  cantidadAciertos() {
    let aciertos = 0;
    for (let i = 0; i < numerosElegidos.length; i++) {
      for (let j = 0; j < this.numerosSorteados.length; j++) {
        if (numerosElegidos[i] === this.numerosSorteados[j]) {
          aciertos += 1;
        }
      }
    }

    switch (aciertos) {
      case 3:
        return `Tuviste ${aciertos} aciertos en el sorteo ${
          this.name
        }. <span class=ganador>Ganaste ${Math.round(
          this.premio / 35
        )} pesos</span>`;
        break;
      case 4:
        return `Tuviste ${aciertos} aciertos en el sorteo ${
          this.name
        }. <span class=ganador>Ganaste ${Math.round(
          this.premio / 22
        )} pesos</span>`;
        break;
      case 5:
        return `Tuviste ${aciertos} aciertos en el sorteo ${
          this.name
        }. <span class=ganador>Ganaste ${Math.round(
          this.premio / 10
        )} pesos</span>`;
        break;
      case 6:
        return `Tuviste ${aciertos} aciertos en el sorteo ${
          this.name
        }. <span class=ganador>Ganaste ${Math.round(
          this.premio / 2
        )} pesos</span>`;
        break;
      default:
        return `Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Seguí participando`;
    }
  }

  numerosGanadores() {
    return this.numerosSorteados.join("-");
  }
}

// Fetch de los sorteos 
let fetcheados = [];
let tradicional;
let laSegunda;
let revancha;
let siempreSale;

const pedirSorteos = async () => {
  try {
    debugger
    const resp = await fetch("../JSON/sorteos.json");
    const data = await resp.json();
    fetcheados = data;

    // Creación de objetos de la clase sorteo
    tradicional = new Sorteo(fetcheados[0].nombre, fetcheados[0].precio, fetcheados[0].premio);
    laSegunda = new Sorteo(fetcheados[1].nombre, fetcheados[1].precio, fetcheados[1].premio);
    revancha = new Sorteo(fetcheados[2].nombre, fetcheados[2].precio, fetcheados[2].premio);
    siempreSale = new Sorteo(fetcheados[3].nombre, fetcheados[3].precio, fetcheados[3].premio);

  } catch (error) {
    console.error("Error recogiendo datos:", error);
  }
};
// Llamado al JSON
pedirSorteos();

let numerosElegidos = [];
let numeros = document.getElementById("numerosUsuario");
let numerosTradicional = document.getElementById("numerosDelTradicional");
let numerosSegunda = document.getElementById("numerosDeLaSegunda");
let numerosRevancha = document.getElementById("numerosDeLaRevancha");
let numerosSiempreSale = document.getElementById("numerosDelSiempreSale");
let numerosSeleccionados = document.getElementById("numerosSeleccionados");
let contadorElegidos = 0;
let botonSortear = document.getElementById("sortear");
let botonReiniciar = document.getElementById("reiniciar");
let seccionResultados = document.getElementById("resultados");
seccionResultados.style.display = "none";

// creando los numeros a elegir de forma dinámica

for (let i = 0; i < 47; i++) {
  let boton = document.createElement("input");
  boton.type = "button";
  boton.className = "botonNumero";
  boton.onclick = () => {
    if (numerosElegidos.length < 6) {
      if (boton.value == "00") {
        numerosElegidos.push(boton.value);
        boton.disabled = true;
        contadorElegidos += 1;
      } else {
        numerosElegidos.push(parseInt(boton.value));
        boton.disabled = true;
        contadorElegidos += 1;
      }
    }

    if (contadorElegidos === 6) {
      botonSortear.disabled = false;
    }
  };
  if (i == 0) {
    boton.value = "00";
  } else {
    boton.value = i - 1;
  }

  numeros.appendChild(boton);
}

let botonesNumero = document.querySelectorAll(".botonNumero");

// Funcionamiento botones Reiniciar y Sortear

botonReiniciar.onclick = () => {
  numerosElegidos = [];
  contadorElegidos = 0;
  botonSortear.disabled = true;
  botonesNumero.forEach((elem) => {
    elem.disabled = false;
  });
  numerosTradicional.innerHTML = "";
  numerosSegunda.innerHTML = "";
  numerosRevancha.innerHTML = "";
  numerosSiempreSale.innerHTML = "";
  seccionResultados.style.display = "none";
};

let arrayAlmacenados = [];
let almacenadosEnLs;

let divContenedorUltimasJugadas = document.getElementById("divUltimasJugadas");
let contenedorUltimasJugadas = document.getElementById("ultimasJugadas");

botonSortear.onclick = () => {
  botonSortear.disabled = true;
  numerosSeleccionados.innerHTML = `Tus numeros elegidos fueron: <b>${numerosElegidos.join(
    "-"
  )}</b>`;
  tradicional.sortearNumeros();
  numerosTradicional.innerHTML = `Los numeros sorteados fueron: <b>${tradicional.numerosGanadores()}</b>, ${tradicional.cantidadAciertos()}`;
  Toastify({
    text: `Sorteo tradicional: ${tradicional.numerosGanadores()}`,
    duration: 3000,
    style : {
      background: "#d6d",
      width: "400px"
    }
  }).showToast();
  laSegunda.sortearNumeros();
  numerosSegunda.innerHTML = `Los numeros sorteados fueron: <b>${laSegunda.numerosGanadores()}</b>, ${laSegunda.cantidadAciertos()}`;
  Toastify({
    text: `Sorteo La Segunda: ${laSegunda.numerosGanadores()}`,
    duration: 4000,
    style : {
      background: "#66d",
      width: "400px"
    }
  }).showToast();
  revancha.sortearNumeros();
  numerosRevancha.innerHTML = `Los numeros sorteados fueron: <b>${revancha.numerosGanadores()}</b>, ${revancha.cantidadAciertos()}`;
  Toastify({
    text: `Sorteo Revancha: ${revancha.numerosGanadores()}`,
    duration: 5000,
    style : {
      background: "#6d6",
      width: "400px"
    }
  }).showToast();
  siempreSale.sortearNumeros();
  numerosSiempreSale.innerHTML = `Los numeros sorteados fueron: <b>${siempreSale.numerosGanadores()}</b>, ${siempreSale.cantidadAciertos()}`;
  Toastify({
    text: `Sorteo Siempre Sale: ${siempreSale.numerosGanadores()}`,
    duration: 6000,
    style : {
      background: "#d66",
      width: "400px"
    }
  }).showToast();
  seccionResultados.style.display = "block";

  let fecha = new Date();
  let objetoSorteo = {
    numeros: numerosElegidos,
    fecha: fecha.toLocaleString("es-ar"),
  };

  almacenadosEnLs = JSON.parse(localStorage.getItem("UltimasJugadas"));

  if (almacenadosEnLs) {
    if (almacenadosEnLs.length > 4) {
      almacenadosEnLs.shift();
    }
    arrayAlmacenados = almacenadosEnLs;
    arrayAlmacenados.push(objetoSorteo);
    localStorage.setItem("UltimasJugadas", JSON.stringify(arrayAlmacenados));
  } else {
    arrayAlmacenados.push(objetoSorteo);
    localStorage.setItem("UltimasJugadas", JSON.stringify(arrayAlmacenados));
  }

  while (contenedorUltimasJugadas.firstChild) {
    contenedorUltimasJugadas.removeChild(contenedorUltimasJugadas.lastChild);
  }
  for (const elemento of arrayAlmacenados) {
    let item = document.createElement("li");
    item.innerHTML = `Números: ${elemento.numeros} jugado el día ${elemento.fecha} hs`;
    contenedorUltimasJugadas.appendChild(item);
  }
};

let botonHistorial = document.getElementById("botonHistorial");
divContenedorUltimasJugadas.style.display = "none";

botonHistorial.addEventListener("click", ()=>{
  if(divContenedorUltimasJugadas.style.display == "flex"){
      divContenedorUltimasJugadas.style.display = "none";
  }else if(divContenedorUltimasJugadas.style.display == "none"){
    divContenedorUltimasJugadas.style.display = "block";
    divContenedorUltimasJugadas.style.display = "flex";
    divContenedorUltimasJugadas.style.flexDirection = "column";
    divContenedorUltimasJugadas.style.alignItems = "center";
  }
})

let borrarHistorial = document.getElementById("botonBorrarHistorial");

borrarHistorial.addEventListener("click", ()=>{
    // divContenedorUltimasJugadas.style.display = "none";
    localStorage.removeItem("UltimasJugadas");
    arrayAlmacenados = [];
    almacenadosEnLs;
    while (contenedorUltimasJugadas.firstChild) {
      contenedorUltimasJugadas.removeChild(contenedorUltimasJugadas.lastChild);
    }

})
