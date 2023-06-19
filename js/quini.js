class Sorteo{
    constructor(name,precio,premio){
        this.name=name;
        this.precio=precio;
        this.premio=premio;
        this.numerosSorteados=[];
    }

    sortearNumeros() {
        for (let i = 0; i < 6; i++) {
            let sorteo = (Math.round(Math.random() * 46));
            console.log(sorteo);
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
        for (let i = 0; i< numerosElegidos.length;i++) {
            for (let j=0;j<this.numerosSorteados.length;j++) {
                if (numerosElegidos[i] === this.numerosSorteados[j]) {
                    aciertos += 1;
                }
            }
    
        } 
        console.log(`Tuviste ${aciertos} aciertos en sorteo ${this.name}`);
        switch(aciertos){
            case 3: 
                console.log(`Ganaste ${Math.round(this.premio / 35)} pesos`);
                break;
            case 4: 
                console.log(`Ganaste ${Math.round(this.premio / 22)} pesos`);
                break;
            case 5: 
                console.log(`Ganaste ${Math.round(this.premio / 10)} pesos`);
                break;
            case 6: 
                console.log(`Ganaste ${Math.round(this.premio / 2)} pesos`);
                break;
            default: 
                console.log(`Seguí participando`);  
        }
    }
}
// Creación de objetos de la clase sorteo
let tradicional = new Sorteo("Quini tradicional", 600, 10000000);
console.log(tradicional);
let laSegunda = new Sorteo("La segunda", 400, 8000000);
console.log(laSegunda);
let revancha = new Sorteo("Revancha", 350, 6000000);
console.log(revancha);
let siempreSale = new Sorteo("Siempre sale", 250, 4000000);
console.log(siempreSale);

// Declaracion de funciones para chequear los 6 numeros del usuario contra todos los numeros sorteados en los 4 sorteos
function removerDuplicados(arr) {
    let unico = [];
    arr.forEach(elemento => {
        if (!unico.includes(elemento)) {
            unico.push(elemento);
        }
    });
    return unico;
}

function aciertosTotales() {
    let aciertos = 0;
    for (let i = 0; i< numerosElegidos.length;i++) {
        for (let j=0;j<sorteadosSinRepetir.length;j++) {
            if (numerosElegidos[i] === sorteadosSinRepetir[j]) {
                aciertos += 1;
            }
        }

    }console.log(aciertos); 
    if(aciertos === 6){
        console.log("Felicidades");
    }
}
let numerosElegidos= [];
let numeros = document.getElementById("numerosUsuario");
let numerosTradicional = document.getElementById("numerosDelTradicional");


// creando los numeros a elegir de forma dinámica
let contadorElegidos = 0;
let botonSortear = document.getElementById("sortear");
let botonReiniciar = document.getElementById("reiniciar");

botonReiniciar.onclick = ()=>{
    numerosElegidos = [];
    contadorElegidos=0;
    botonSortear.disabled=true;
    botonesNumero.forEach((elem)=>{
        elem.disabled=false;
    });
}

botonSortear.onclick = ()=>{
    tradicional.sortearNumeros();
    let numerosGanadores = tradicional.numerosSorteados.join("-")
    numerosTradicional.innerHTML=  `Los numeros son: ${numerosGanadores}`;
    tradicional.cantidadAciertos();
}

for(let i = 0; i < 47; i++){
    let boton = document.createElement("input");
    boton.type="button";
    boton.className = "botonNumero";
    boton.onclick = ()=>{
        if(boton.value=="00"){
            numerosElegidos.push(boton.value);
        }else{
            numerosElegidos.push(parseInt(boton.value));
        }
        console.log(numerosElegidos);
        boton.disabled = true;
        contadorElegidos += 1;
        if(contadorElegidos === 6){
            botonSortear.disabled=false;
            
        }
    };
    if(i==0){
        boton.value="00";
    }else{
        boton.value = i - 1;
    }
     
    numeros.appendChild(boton)
}

let botonesNumero = document.querySelectorAll(".botonNumero");



// laSegunda.sortearNumeros();
// console.log(laSegunda.numerosSorteados);
// laSegunda.cantidadAciertos();
// revancha.sortearNumeros();
// console.log(revancha.numerosSorteados);
// revancha.cantidadAciertos();
// siempreSale.sortearNumeros();
// console.log(siempreSale.numerosSorteados);
// siempreSale.cantidadAciertos();

// let todosSorteados = tradicional.numerosSorteados.concat(laSegunda.numerosSorteados).concat(revancha.numerosSorteados).concat(siempreSale.numerosSorteados);
// console.log(todosSorteados);
// let sorteadosSinRepetir = removerDuplicados(todosSorteados);
// console.log(sorteadosSinRepetir);

// aciertosTotales();

























