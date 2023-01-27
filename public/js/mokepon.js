const sectionSeleccionarAtaque = document.getElementById ("Seleccionar_ataque")
const sectionSeleccionarReinicio = document.getElementById ("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById ("reiniciar")
const sectionSeleccionarMascota = document.getElementById ("seleccionar_mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById ("vidas-jugador")
const spanVidasEnemigo = document.getElementById ("vidas-enemigo")
const sectionMensajes = document.getElementById("resultado")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones 
let inputTortosina 
let inputCapipapa
let inputRondor 
let mascotaJugador
let mascotaJugadorObjeto 
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego  
let botonAgua 
let botonTierra
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0 
let VictoriasEnemigo = 0
let botones = []
let vidasEnemigo  = 3
let vidasJugador = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = ("./assets/mokemap.webp")
let alturaIdeal 
let anchoDelMapa = window.innerWidth -20 
const anchoMaximoDelMapa = 350 

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaIdeal = anchoDelMapa * 600/800
mapa.width = anchoDelMapa
mapa.height = alturaIdeal

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto 
        this.vida = vida
        this.ataque = []
        this.ancho = 40 
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0

    }
    imprimirMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )

    }
}

let tortosina = new Mokepon("Tortosina","./assets/tortosina.png",4,"./assets/tortosinaMap.png")
let cetadoge = new Mokepon("Cetadoge","./assets/cetadoge.png",4, "./assets/cetadogemap.png")
let rondor = new Mokepon("Rondor","./assets/rondor.png",4,"./assets/rondorMap.png")

const tortosinaAtques = [
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"}
]
tortosina.ataque.push(...tortosinaAtques)    


const cetadogeAtaques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🔥", id: "boton-fuego"}
]
cetadoge.ataque.push(...cetadogeAtaques)


const rondorAtaques = [
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌱", id: "boton-tierra"}
]
rondor.ataque.push(...rondorAtaques)



mokepones.push(tortosina,cetadoge,rondor)

function aleatorio (min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function iniciarJuego(){
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaque.style.display = "none"
    sectionSeleccionarReinicio.style.display = "none"


    mokepones.forEach((mokepon) => {
         opcionDeMokepones = `
         <input type="radio" name="mascota" id="${mokepon.nombre}"/>
         <label class="tarjeta-mokepon" for= "${mokepon.nombre}">
             <p>${mokepon.nombre}</p>
             <img src="${mokepon.foto}" alt="${mokepon.nombre}">
         </label>
         `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputTortosina = document.getElementById("Tortosina")
     inputCetadoge = document.getElementById("Cetadoge")
     inputRondor = document.getElementById("Rondor")

    })

    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
  

    botonReiniciar.addEventListener("click",reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.1.6:8080/unirse")
    .then(function(res){
        console.log(res)
        if (res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })

}

function seleccionarMascotaJugador (){

    if(inputCetadoge.checked){
        spanMascotaJugador.innerHTML= inputCetadoge.id
        mascotaJugador = inputCetadoge.id
    }
    else if(inputTortosina.checked){
        spanMascotaJugador.innerHTML= inputTortosina.id
        mascotaJugador = inputTortosina.id
    }
    else if(inputRondor.checked){
        spanMascotaJugador.innerHTML= inputRondor.id
        mascotaJugador = inputRondor.id
    }
    else{
        alert("selecciona una mascota")
        prompt("Por qué no seleccionas una mascota?")
        return
        
    }
    
    sectionSeleccionarMascota.style.display = "none"
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        mokepon: mascotaJugador
    })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones [i].nombre){
            ataques = mokepones [i].ataque
        }
    }
    
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id =${ataque.id} class="boton-ataques BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById("boton-fuego")
     botonAgua = document.getElementById("boton-agua")
     botonTierra = document.getElementById("boton-tierra")
     
     botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaques(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{
            if (e.target.outerText === "🔥") {
                ataqueJugador.push("Fuego")
                console.log(ataqueJugador)
                boton.style.background = "#512975" 
                boton.disabled = true 
            } else if (e.target.outerText === "🌊"
            ){
                ataqueJugador.push("Agua")
                console.log(ataqueJugador)
                boton.style.background = "#512975"
                boton.disabled = true 
            } else{
                ataqueJugador.push("Tierra")
                console.log(ataqueJugador)
                boton.style.background = "#512975"
                boton.disabled = true 
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
           
        })    
    })
}

function enviarAtaques(){
    fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
        ataques: ataqueJugador
        })
        
    })

    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques(){
    fetch(`http://192.168.1.6:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })  
            }
        })
}
function seleccionarMascotaEnemigo(enemigo){

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataque
    secuenciaAtaques()
}

function ataqueAleatorioEnemigo(){

    let  ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)

    if (ataqueAleatorio == 0 || ataqueAleatorio ==1 ){
        ataqueEnemigo.push ("Fuego")
    }
    else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push ("Agua")
    }
    else {
        ataqueEnemigo.push ("Tierra")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea(){
if (ataqueJugador.length === 5) {
    combate()
    
}

}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function combate(){
    clearInterval(intervalo)


    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo [index]){
            indexAmbosOponentes(index, index)
            crearMensaje()

        } else if(ataqueJugador[index] === "Fuego" && ataqueEnemigo[index] === "Tierra"){
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador

        } else if (ataqueJugador[index] === "Agua" && ataqueEnemigo[index] === "Fuego"){
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        } else if (ataqueJugador[index] === "Tierra" && ataqueEnemigo[index] === "Agua"){
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje()
            VictoriasEnemigo++
            spanVidasEnemigo.innerHTML = VictoriasEnemigo
        }
        }
    
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador === VictoriasEnemigo){
        crearMensajeFinal ("EMPATE😿")
    } else if (victoriasJugador > VictoriasEnemigo){
        crearMensajeFinal ("!Felicidades! Ganaste 🌈")
    } else {
         crearMensajeFinal ("Perdiste. Qué patético🦨")
    }
 
}


function crearMensaje(resultado){

   
    let nuevoAtaqueJugador = document.createElement ("p")
    let nuevoAtaqueEnemigo = document.createElement ("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    document.getElementById("ataque-jugador").appendChild(nuevoAtaqueJugador)
    document.getElementById("ataque-enemigo").appendChild(nuevoAtaqueEnemigo)
    } 

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
         
    sectionSeleccionarReinicio.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}



function imprimirCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height)

    lienzo.drawImage(
        mapaBackground,
        0,
        0, 
        mapa.width,
        mapa.height
    ) 

    mascotaJugadorObjeto.imprimirMokepon()
    
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.imprimirMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
           res.json()
                .then(function ({enemigos}){
                   
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        console.log({enemigo});

                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""

                        if(mokeponNombre === "Tortosina"){
                            mokeponEnemigo = new Mokepon("Tortosina","./assets/tortosina.png",4,"./assets/tortosinaMap.png", enemigo.id)
                        }else if (mokeponNombre === "Cetadoge"){
                            mokeponEnemigo = new Mokepon("Cetadoge","./assets/cetadoge.png",4,"./assets/cetadogemap.png", enemigo.id)
                        }else if(mokeponNombre === "Rondor"){
                            mokeponEnemigo = new Mokepon("Rondor","./assets/rondor.png",4,"./assets/rondorMap.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0  
                        return mokeponEnemigo
                    })
                })
        }
    })
}



function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5 

}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5

}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionarTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }

}

function iniciarMapa(){
    //mapa.width = 320 
    //mapa.height = 240
    intervalo = setInterval(imprimirCanvas,50)
    mascotaJugadorObjeto = getObjetoMascota(mascotaJugador)
    window.addEventListener("keydown", presionarTecla )
    window.addEventListener("keyup", detenerMovimiento)
}

function getObjetoMascota(){

    for (let i = 0; i < mokepones.length; i++){
        if (mascotaJugador === mokepones [i].nombre){
           return mokepones[i]
        }
    } 
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 
  

    const arribaMascota =
         mascotaJugadorObjeto.y 
    const abajoMascota =
         mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto 
    const derechaMascota =
         mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
         mascotaJugadorObjeto.x  
     
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Hay colisión AHHH")

    enemigoId= enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    alert("Te has encontrado con " + enemigo.nombre + " !Hora de luchar!")
}

window.addEventListener("load", iniciarJuego)