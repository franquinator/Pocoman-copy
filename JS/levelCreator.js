var imagen = new Image("1.png");

var tablero;
var canvas = null;
var contexto = null;

let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const obtenerXReal = (clientX) => clientX - canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - canvas.getBoundingClientRect().top;

var anchoInput;
var altoInput;
var ancho;
var alto;

const pixelesPorUnidad=64;

const caja = new Image();
const pj = new Image();
const muro = new Image();
const nada = new Image();
const equis = new Image();
const tesoro = new Image();

var elemSelec = 0;

var botonMuro;
var botonCaja;
var botonEquis;
var botonGoma;
var botonPj;


function iniciar(){
    tesoro.src = "recompensa.png";
    caja.src = "caja.png";
    pj.src = "1.png";
    muro.src = "muro.png";
    nada.src = "nada.png";
    equis.src = "equis.png";
    

    anchoInput = document.getElementById("ancho");
    altoInput = document.getElementById("alto");
    ancho = parseInt(anchoInput.value);
    alto = parseInt(altoInput.value);
    console.log("ancho "+ ancho)
    console.log("alto "+ alto)

    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");
    canvas.width = ancho * pixelesPorUnidad;
    canvas.height = alto * pixelesPorUnidad;

    tablero = crearArray2D(alto,ancho);
    llenarTableroDe0();

    botonMuro = document.getElementById("boton-muro");
    botonCaja = document.getElementById("boton-caja");
    botonEquis = document.getElementById("boton-equis");
    botonGoma = document.getElementById("boton-goma");
    botonPj = document.getElementById("boton-pj");
    
    



    setTimeout(function(){dibujarTablero()},1000)

    setInterval(function(){update()},1000/60);

    botonMuro.addEventListener("click",evento=>{
        console.log("muro")
        elemSelec = 1;
    })
    botonCaja.addEventListener("click",evento=>{
        console.log("caja")
        elemSelec = 3;
    })
    botonEquis.addEventListener("click",evento=>{
        console.log("equis")
        elemSelec = 4;
    })
    botonGoma.addEventListener("click",evento=>{
        console.log("goma")
        elemSelec = 0;
    })
    botonPj.addEventListener("click",evento=>{
        console.log("pj")
        elemSelec = 2;
    })


    anchoInput.addEventListener("change",evento=>{
        console.log("ancho"+ anchoInput.value / canvas.width);
        ancho = parseInt(anchoInput.value);
        tablero = cambiarTamanioTablero(tablero,ancho,alto);
        canvas.width = ancho * pixelesPorUnidad;
        setTimeout(function(){dibujarTablero()},1000)
    })
    altoInput.addEventListener("change",evento=>{
        console.log("alto")
        alto = parseInt(altoInput.value);
        tablero = cambiarTamanioTablero(tablero,ancho,alto);
        canvas.height = alto *pixelesPorUnidad;
        setTimeout(function(){dibujarTablero()},1000)
    })
    canvas.addEventListener("mousedown", evento => {
        xActual = obtenerXReal(evento.clientX);
        yActual = obtenerYReal(evento.clientY);

        xActual = parseInt(xActual / (canvas.getBoundingClientRect().width / ancho))
        yActual = parseInt(yActual / (canvas.getBoundingClientRect().height / alto))

        tablero[xActual][yActual] = elemSelec;

        DibujarImagenEn(numeroAElemento(elemSelec),xActual,yActual);

        console.log(tablero);
        //console.log("x "+xActual+" /  y "+yActual)
    });

    botonExportar = document.getElementById("boton-exportar");
    botonExportar.addEventListener("click", () => {
        exportarTablero();
    });

    inputImportar = document.getElementById("input-file")

    document.getElementById("boton-importar").addEventListener("click", () => {
        inputImportar.click();
    });
    inputImportar.addEventListener("change",function(){importarTablero(inputImportar)});
}
function cambiarTamanioTablero(unTablero,ancho,alto){
    var nuevoTablero = crearArray2D(ancho,alto)
    for (let x = 0; x < nuevoTablero.length; x++) {
        for (let y = 0; y < nuevoTablero[x].length; y++) {
            if(y < unTablero[0].length && x < unTablero.length){
                nuevoTablero[x][y] = unTablero[x][y];
            }
            else{
                nuevoTablero[x][y] = 0;
            }
            
        }
    }
    console.log(nuevoTablero);
    return nuevoTablero;

}
function update(){
    console.log("x: "+ canvas.getBoundingClientRect().width +"y: "+canvas.height);
}
function crearArray2D(c,f){
    var obj = new Array(c);
    for(a=0;a<c;a++){
        obj[a] = new Array(f);
    }
    return obj;    
}
function llenarTableroDe0(){
    for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y< tablero[x].length; y++) {
            tablero[x][y]=0;
        }
    }
    console.log(tablero);
}
function dibujarTablero(){
    for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y< tablero[x].length; y++) {
            var elemento = numeroAElemento(tablero[x][y]);
            DibujarImagenEn(elemento,x,y);
        }
    }
}
function numeroAElemento(numero){
    switch (numero) {
        case 0:
            return nada;
        case 1:
            return muro;
        case 2:
            return pj;
        case 3:
            return caja;
        case 4:
            return equis;
        default:
            break;
    }
}
function DibujarImagenEn(imagen, x, y){
    contexto.drawImage(imagen, x * pixelesPorUnidad, y * pixelesPorUnidad,pixelesPorUnidad,pixelesPorUnidad);
}
// function DibujarImagenEn(imagenSrc, x, y,width,height){
//     var imagen= new Image(64,64);
//     imagen.src = imagenSrc;
//     console.log(imagen);
//     contexto.drawImage(imagen, x, y,width,height);
// }

    
// function iniciar2(){
//     dibujarTablero();
// }

// function exportarTablero() {
//     const tableroJSON = JSON.stringify(tablero); // Convertir el tablero a JSON
//     const blob = new Blob([tableroJSON], { type: "application/json" }); // Crear un archivo Blob
//     const enlace = document.createElement("a"); // Crear un enlace temporal
//     enlace.href = URL.createObjectURL(blob); // Crear una URL para el archivo
//     enlace.download = "tablero.json"; // Nombre del archivo
//     enlace.click(); // Simular un clic para descargar el archivo
//     URL.revokeObjectURL(enlace.href); // Liberar la URL
// }
function exportarTablero() {
    // Convertir las imágenes a Base64
    const convertirImagenABase64 = (imagen, callback) => {
        const canvas = document.createElement("canvas");
        canvas.width = imagen.width;
        canvas.height = imagen.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imagen, 0, 0);
        const base64 = canvas.toDataURL("image/png");
        callback(base64);
    };

    // Procesar las imágenes y exportar el JSON
    convertirImagenABase64(tesoro, (imagenTesoroBase64) => {
        convertirImagenABase64(caja, (imagenCajaBase64) => {
            const tableroJSON = {
                tablero: tablero, // El tablero
                ancho: ancho, // Ancho del tablero
                alto: alto, // Alto del tablero
                imagenTesoro: imagenTesoroBase64, // Imagen del tesoro en Base64
                imagenCaja: imagenCajaBase64, // Imagen de la caja en Base64
            };

            // Crear y descargar el archivo JSON
            const blob = new Blob([JSON.stringify(tableroJSON)], { type: "application/json" });
            const enlace = document.createElement("a");
            enlace.href = URL.createObjectURL(blob);
            enlace.download = "tablero_completo.json";
            enlace.click();
            URL.revokeObjectURL(enlace.href);
        });
    });
}

function cambiarCaja(sprite){
    caja.src = sprite;
    setTimeout(function(){dibujarTablero()},100)
}
function cambiarTesoro(sprite){
    tesoro.src = sprite;
}

function importarTablero(inputFile) {
    const archivo = inputFile.files[0];

    if (!archivo) {
        alert("Por favor, selecciona un archivo JSON.");
        return;
    }

    const lector = new FileReader();

    lector.onload = (evento) => {
        try {
            const tableroJSON = JSON.parse(evento.target.result);

            // Actualizar el tablero, ancho y alto

            tablero = tableroJSON.tablero;
            console.log(tablero);

            ancho = tableroJSON.ancho;
            anchoInput.value = ancho;

            alto = tableroJSON.alto;
            altoInput.value = alto;

            // Actualizar las imágenes del tesoro y la caja
            tesoro.src = tableroJSON.imagenTesoro;
            imageViewTesoro.src = tesoro.src;

            caja.src = tableroJSON.imagenCaja;
            imageViewCaja.src = caja.src;

            // Redimensionar el canvas
            canvas.width = ancho * pixelesPorUnidad;
            canvas.height = alto * pixelesPorUnidad;

            // Dibujar el tablero actualizado
            setTimeout(function(){dibujarTablero()},100)

            alert("Tablero importado correctamente.");
        } catch (error) {
            console.error("Error al importar el tablero:", error);
            alert("El archivo JSON no es válido.");
        }
    };

    lector.readAsText(archivo);
}