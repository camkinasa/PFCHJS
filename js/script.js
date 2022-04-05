//Recorda que es buena practica separar los archivos js
//Hacer función con ese código de card que repito un montón de veces

const IVA = 1.21
let carrito = []

//Llamada a archivos json para libros en promo ACORDATE QUE LOS TENES QUE SUBIR A GITHUB PARA QUE FUNCIONE

let divMostrarLibrosPromo = document.getElementById("mostrarLibrosPromo")

async function obtenerLibrosPromo() {
    const response = await fetch('https://raw.githubusercontent.com/camkinasa/libros-promos/master/libros-promo.json')
    return await response.json()
}

obtenerLibrosPromo().then(librosPromo => {
    librosPromo.forEach((libro) => {
        let div = document.createElement('div')
        div.className = ("col")
        div.innerHTML = `
            <div class="card" id="libro${libro.id}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <img src="../img/${libro.imagen}" class="libro-img">
                    <p class="card-text">Autor: ${libro.autor}</p>
                    <p class="card-text">Género: ${libro.genero}</p>
                    <p class="card-text">Precio: $${libro.precio}</p>
                    <button id="botonCarrito${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
            </div>
            <br>
        `
        divMostrarLibrosPromo.appendChild(div)
        let botonCarrito = document.getElementById(`botonCarrito${libro.id}`)
        botonCarrito.addEventListener("click", ()=>{
            agregarAlCarrito(libro.id)
            Toastify({
                text: `¡${libro.titulo} se añadió al carrito con éxito!`,
                duration: 2000,
                gravity: "bottom",
                position: "left",
                className: "notificacion"
            }).showToast()
        })
    })
})

let listaLibros = []

class Libro{
    constructor(id, titulo, autor, genero, precio, stock, imagen){
        this.id = id
        this.titulo = titulo
        this.autor = autor
        this.genero = genero
        this.precio = precio //Agregar un filtro de precios
        this.stock = stock
        this.imagen = imagen
    }
    sumarIva(){ // Esto quizás lo saco, prefiero el modificar stock
        this.precio += IVA
    }
    modificarStock(){

    }
}

let coma = new Libro(1, "Coma", "Robin Cook", "Thriller medico", 2400, 55, "coma.jpg")
let riesgoAceptable = new Libro(2, "Riesgo aceptable", "Robin Cook", "Thriller medico", 2200, 100, "riesgo-aceptable.jpg")
let habitosAtomicos = new Libro(3, "Habitos atomicos", "James Clear", "Autoayuda", 1600, 5, "habitos-atomicos.jpg")
let tusZonasErroneas = new Libro(4, "Tus zonas erroneas", "Wayne Dyer", "Autoayuda", 1500, 30, "tus-zonas-erroneas.jpg")
let mazeRunner = new Libro(5, "Maze runner", "James Dashner", "Suspenso", 1500, 40, "maze-runner.jpg")
let carrie = new Libro(6, "Carrie", "Stephen King", "Terror", 2400, 43, "carrie.jpg")
let it = new Libro(7, "It", "Stephen King", "Terror", 3000, 150, "it.jpg")
let millaVerde = new Libro(8, "La milla verde", "Stephen King", "Terror", 3500, 60, "milla-verde.jpg")
let piedraFilosofal = new Libro(9, "Harry Potter y la piedra filosofal", "J. K. Rowling", "Fantasia", 3200, 3, "hp-piedra-filosofal.jpg")
let camaraSecreta = new Libro(10, "Harry Potter y la camara secreta", "J. K. Rowling", "Fantasia", 2300, 30, "hp-camara-secreta.jpg")
let prisioneroAzkaban = new Libro(11, "Harry Potter y el prisionero de Azkaban", "J. K. Rowling", "Fantasia", 3400, 4, "hp-prisionero-azkaban.jpg")
let calizDeFuego = new Libro(12, "Harry Potter y el caliz de fuego", "J. K. Rowling", "Fantasia", 3300, 4, "hp-caliz-fuego.jpg")
let embriologiaHumana = new Libro(13, "Embriologia humana", "Flores", "Academico", 5500, 500, "embriologia-humana.jpg")
let fisiologiaMedica = new Libro(14, "Fisiologia medica", "Boron", "Academico", 7000, 200, "fisiologia-medica.jpg")
let basesFarmacologicas = new Libro(15, "Las bases farmacológicas de la terapéutica", "Goodman & Gilman", "Academico", 8000, 32, "bases-farmacologicas.jpg")
let principiosDeBioquimica = new Libro(16, "Principios de bioquimica", "Lehnninger", "Academico", 6520, 300, "principios-bioquimica.jpg")

listaLibros = [coma, riesgoAceptable, habitosAtomicos, tusZonasErroneas, mazeRunner, carrie, it, millaVerde, piedraFilosofal, camaraSecreta, prisioneroAzkaban, calizDeFuego, embriologiaHumana, fisiologiaMedica, basesFarmacologicas, principiosDeBioquimica]

let divMostrarLibros = document.getElementById("divMostrarLibros")

listaLibros.forEach((libro) => {
    const div = document.createElement('div')
    div.className = ("col")
    div.innerHTML = `
        <div class="card" id="libro${libro.id}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${libro.titulo}</h5>
                <img src="../img/${libro.imagen}" class="libro-img">
                <p class="card-text">Autor: ${libro.autor}</p>
                <p class="card-text">Género: ${libro.genero}</p>
                <p class="card-text">Precio: $${libro.precio}</p>
                <button id="botonCarrito${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div>
        <br>
    `
    divMostrarLibros.appendChild(div)
    let botonCarrito = document.getElementById(`botonCarrito${libro.id}`)
    botonCarrito.addEventListener("click", ()=>{
        agregarAlCarrito(libro.id)
        Toastify({
            text: `¡${libro.titulo} se añadió al carrito con éxito!`,
            duration: 2000,
            gravity: "bottom",
            position: "left",
            className: "notificacion"
        }).showToast();
    })
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

let formBusqueda = document.getElementById("formBusqueda")
let divResultadoBusquedaLibro = document.getElementById("divResultadoBusquedaLibro")
let divResultadoBusquedaAutor = document.getElementById("divResultadoBusquedaAutor")

formBusqueda.addEventListener("submit", (e) =>{ // El evento es submit, no click!
    e.preventDefault() // Previene enviar la información a un servidor, ya que no tengo servidor.
    let busquedaLibro = document.getElementById("busquedaLibro").value
    buscarLibroPorDato(busquedaLibro)
    formBusqueda.reset()
})

//Carrito -> fijate de mejorar la tabla del modal en algo mas prolijo

let contenedorCarrito = document.getElementById("carrito-contenedor")
let contadorCarrito = document.getElementById('contadorCarrito')
let precioTotal = document.getElementById("precioTotal")

function agregarAlCarrito(libroId){
    const existe = carrito.some (element => element.id === libroId)
    if(existe){
        carrito.map((element) => {
            if(element.id === libroId){
                element.cantidad++
            }
        })
    } else{
        let item = listaLibros.find((libro) => libro.id === libroId)
        item.cantidad = 1
        carrito.push(item)
    }
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" //Para que no me acumule los productos: cada vez que llamo a la función carrito, lo primero que hago es borrar el nodo
    carrito.forEach((libro =>{
        let div = document.createElement("div")
        div.className = ("productoEnCarrito") 
        div.innerHTML = `
        <p>${libro.titulo}</p>
        <p>Precio: ${libro.precio}</p>
        <p>Cantidad: ${libro.cantidad} </p>
        <button onclick="eliminarDelCarrito(${libro.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        ` //Cuando cree el botón ya en el onclick le estoy pasando la función eliminar del carrito con su parametro libro.id
        contenedorCarrito.appendChild(div)
    }))
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, libro) => acc + (libro.precio * libro.cantidad), 0)
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const eliminarDelCarrito = (libroId) => {
    let item = carrito.find((libro) => libro.id === libroId)
    let indice = carrito.indexOf(item)
    if(item.cantidad > 1){
        item.cantidad--
    }
    else{
        carrito.splice(indice, 1)
    }
    actualizarCarrito()
}

let botonVaciar = document.getElementById("vaciar-carrito")
botonVaciar.addEventListener("click", () => {
    carrito.length = 0
    actualizarCarrito()
})

//Modal carrito

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

//Usé find para buscar el libro, y filter para crear un array nuevo por si mas de un resultado coincide (como puede pasar en autor y género)
function buscarLibroPorDato(busquedaLibro){
    if(listaLibros.find((libro) => libro.titulo === busquedaLibro)){
        let consultaLibro = listaLibros.filter((libro) => libro.titulo === busquedaLibro)
        busquedaTitulo(consultaLibro)
    }
    else if(listaLibros.find((libro) => libro.autor === busquedaLibro)){
        let consultaLibro = listaLibros.filter((libro) => libro.autor === busquedaLibro)
        busquedaTitulo(consultaLibro)
    }
    else if(listaLibros.find((libro) => libro.genero === busquedaLibro)){
        let consultaLibro = listaLibros.filter((libro) => libro.genero === busquedaLibro)
        busquedaTitulo(consultaLibro)
    }
    else{
        divResultadoBusquedaLibro.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <p> Lo sentimos, ${busquedaLibro} no está disponible en este momento </p>
                </div>
            </div>
        `
    }

}

function busquedaTitulo(consultaLibro){
    divResultadoBusquedaLibro.innerHTML = ""
    if(consultaLibro){
        consultaLibro.forEach((libro) => {
            let div = document.createElement('div')
            div.className = ("col")
            div.innerHTML = `
                <div class="card" id="libro${libro.id}" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${libro.titulo}</h5>
                        <img src="../img/${libro.imagen}" class="libro-img">
                        <p class="card-text">Autor: ${libro.autor}</p>
                        <p class="card-text">Género: ${libro.genero}</p>
                        <p class="card-text">Precio: $${libro.precio}</p>
                        <button id="botonCarrito${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                    </div>
                </div>
                <br>
            `
            divResultadoBusquedaLibro.appendChild(div)
            let botonCarrito = document.getElementById(`botonCarrito${libro.id}`)
            botonCarrito.addEventListener("click", ()=>{
                agregarAlCarrito(libro.id)
                Toastify({
                    text: `¡${libro.titulo} se añadió al carrito con éxito!`,
                    duration: 2000,
                    gravity: "bottom",
                    position: "left",
                    className: "notificacion"
                }).showToast();
            })
        })
    }
}
//Tendría que buscar la forma para que no importe que el usuario use mayúsculas, minúsculas o tildes.
