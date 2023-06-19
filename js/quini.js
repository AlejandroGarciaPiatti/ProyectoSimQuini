class Sorteo{
    constructor(name,precio,premio){
        this.name=name;
        this.precio=precio;
        this.premio=premio;
        this.numerosSorteados=[];
        
    }

    sortearNumeros() {
        this.numerosSorteados = [];
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
        // console.log(`Tuviste ${aciertos} aciertos en sorteo ${this.name}`);
        // switch(aciertos){
        //     case 3: 
        //         return(`Ganaste ${Math.round(this.premio / 35)} pesos`);
        //         break;
        //     case 4: 
        //         return(`Ganaste ${Math.round(this.premio / 22)} pesos`);
        //         break;
        //     case 5: 
        //         return(`Ganaste ${Math.round(this.premio / 10)} pesos`);
        //         break;
        //     case 6: 
        //         return(`Ganaste ${Math.round(this.premio / 2)} pesos`);
        //         break;
        //     default: 
        //         console.log(`Seguí participando`);  
        // }
        switch(aciertos){
            case 3: 
                return(`Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Ganaste ${Math.round(this.premio / 35)} pesos`);
                break;
            case 4: 
                return(`Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Ganaste ${Math.round(this.premio / 22)} pesos`);
                break;
            case 5: 
                return(`Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Ganaste ${Math.round(this.premio / 10)} pesos`);
                break;
            case 6: 
                return(`Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Ganaste ${Math.round(this.premio / 2)} pesos`);
                break;
            default: 
                return(`Tuviste ${aciertos} aciertos en el sorteo ${this.name}. Seguí participando`);  
        }
    }

    numerosGanadores(){
        return this.numerosSorteados.join("-");
        
    }
}
// Creación de objetos de la clase sorteo
let tradicional = new Sorteo("Tradicional", 600, 10000000);
console.log(tradicional);
let laSegunda = new Sorteo("La segunda", 400, 8000000);
console.log(laSegunda);
let revancha = new Sorteo("Revancha", 350, 6000000);
console.log(revancha);
let siempreSale = new Sorteo("Siempre sale", 250, 4000000);
console.log(siempreSale);

let numerosElegidos= [];
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

for(let i = 0; i < 47; i++){
    let boton = document.createElement("input");
    boton.type="button";
    boton.className = "botonNumero";
    boton.onclick = ()=>{
        if(numerosElegidos.length < 6){
            if(boton.value=="00"){
                numerosElegidos.push(boton.value);
                boton.disabled = true;
                contadorElegidos += 1;
            }else{
                numerosElegidos.push(parseInt(boton.value));
                boton.disabled = true;
                contadorElegidos += 1;
            }
        }
        
        console.log(numerosElegidos);
        if(contadorElegidos === 6){
            botonSortear.disabled=false;
            
        }
    }
    if(i==0){
        boton.value="00";
    }else{
        boton.value = i - 1;
    }
     
    numeros.appendChild(boton);
}

let botonesNumero = document.querySelectorAll(".botonNumero");

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

// Funcionamiento botones Reiniciar y Sortear
botonReiniciar.onclick = ()=>{
    numerosElegidos = [];
    contadorElegidos=0;
    botonSortear.disabled=true;
    botonesNumero.forEach((elem)=>{
        elem.disabled=false;
    });
    numerosTradicional.innerHTML="";
    numerosSegunda.innerHTML="";
    numerosRevancha.innerHTML="";
    numerosSiempreSale.innerHTML="";
    seccionResultados.style.display = "none";
}

botonSortear.onclick = ()=>{
    botonSortear.disabled = true;
    numerosSeleccionados.innerHTML = `Tus numeros son ${numerosElegidos.join("-")}`;
    tradicional.sortearNumeros();
    numerosTradicional.innerHTML=  `Los numeros sorteados fueron: ${tradicional.numerosGanadores()}, ${tradicional.cantidadAciertos()}`;
    laSegunda.sortearNumeros();
    numerosSegunda.innerHTML=  `Los numeros sorteados fueron: ${laSegunda.numerosGanadores()}, ${laSegunda.cantidadAciertos()}`;
    revancha.sortearNumeros();
    numerosRevancha.innerHTML=  `Los numeros sorteados fueron: ${revancha.numerosGanadores()}, ${revancha.cantidadAciertos()}`;
    siempreSale.sortearNumeros();
    numerosSiempreSale.innerHTML=  `Los numeros sorteados fueron: ${siempreSale.numerosGanadores()}, ${siempreSale.cantidadAciertos()}`;
    seccionResultados.style.display = "block";
}


// let todosSorteados = tradicional.numerosSorteados.concat(laSegunda.numerosSorteados).concat(revancha.numerosSorteados).concat(siempreSale.numerosSorteados);
// console.log(todosSorteados);
// let sorteadosSinRepetir = removerDuplicados(todosSorteados);
// console.log(sorteadosSinRepetir);

// aciertosTotales();

























