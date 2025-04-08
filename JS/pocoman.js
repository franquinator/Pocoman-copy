var imagen = new Image("1.png");
canvas = null;
contexto = null;
var ancho = 0;
var alto = 0;
var pocoman = null;

var tablero;
var tableroFondo;

const pixelesPorUnidad = 64;

const cajaImg = new Image();
const tesoroImg = new Image();

var cajas = [];

function iniciar(){
    iniciarImg();
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");
    // imagen.src = "1.png";
    // pocoman = new Pocoman(imagen,0,0,16,16)
    // tablero = crearArray2D(14,10);
    // crearMuro(2,0);
    // crearMuro(3,0);
    // crearMuro(4,0);
    // crearMuro(5,0);
    // canvas.width = 14*16;
    // canvas.height = 10 *16;
    // setTimeout(function(){iniciar2()},1000)


    inputImportar = document.getElementById("input-file")

    document.getElementById("boton-importar").addEventListener("click", () => {
        inputImportar.click();
    });
    inputImportar.addEventListener("change",function(){importarTablero(inputImportar)});
    console.log("inicio pocoman")
    importarTableroDesdeArchivo();
}
// function crearMuro(x,y){
//     tablero[x][y] = new Objeto("muro.png",x,y,16,16);
// }
// function iniciar2(){
//     console.log(tablero[2,2]);
//     dibujarTablero();
//     setInterval(function(){update()},1000/60);
// }
// function crearArray2D(c,f){
//     var obj = new Array(c);
//     for(a=0;a<c;a++){
//         obj[a] = new Array(f);
//     }
//     console.log(obj);
//     return obj;s    
// }
function llenarTablero(){
    for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y< tablero[x].length; y++) {
            tablero[x][y] = numeroAElemento(tablero[x][y],x,y);
        }
    }
}
function llenarTableroDeFondo(){
    for (let x = 0; x < tableroFondo.length; x++) {
        for (let y = 0; y< tableroFondo[x].length; y++) {
            tableroFondo[x][y] = numeroAFondo(tableroFondo[x][y],x,y);
        }
    }
}
function numeroAElemento(numero,x,y){
    switch (numero) {
        case 1:
            return new Muro(x,y);
        case 2:
            pocoman = new Pocoman(x,y)
            return pocoman;
        case 3:
            
            caja = new Caja(cajaImg.src,tesoroImg.src,x,y);
            cajas.push(caja);
            return caja;
        default:
            break;
    }
}
function numeroAFondo(numero,x,y){
    switch (numero) {
        case 0:
            return new Nada(x,y);
        case 2:
            return new Nada(x,y);
        case 3:
            return new Nada(x,y);
        case 4:
            return new Equis(x,y);;
        default:
            break;
    }
}
function dibujarTablero(){
    contexto.clearRect(0,0,canvas.width,canvas.height);
    contexto.fillStyle = "#000"
    for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y< tablero[x].length; y++) {
            // if(tableroFondo[x][y] != null){
            //     var elementoActual = tablero[x][y];
            //     DibujarImagenEn(elementoActual.Imagen(), x , y);
            // }
            if(tablero[x][y] != null){
                var elementoActual = tablero[x][y];
                DibujarImagenEn(elementoActual.Imagen(), x , y);
            }
            else if(tableroFondo[x][y] != null){
                var elementoActual = tableroFondo[x][y];
                DibujarImagenEn(elementoActual.Imagen(), x , y);
            }
        }
    }


}

function DibujarImagenEn(imagen, x, y){
    contexto.drawImage(imagen, x * pixelesPorUnidad, y * pixelesPorUnidad,pixelesPorUnidad,pixelesPorUnidad);
}
function Gane(){
    for (let i = 0; i < cajas.length; i++) {
        const element = cajas[i];
        if(!element.EsTesoro()){
            return false;
        }
        
    }
    return true;
}
function update(){
}
// class Pocoman {
//     constructor(imagen,cordenadaX,cordenadaY,tamanioX,tamanioY) {
//         this.imagen = imagen;
//         this.posX = cordenadaX;
//         this.posY = cordenadaY;
//         this.tamanioX = tamanioX;
//         this.tamanioY = tamanioY;
//     }

//     TieneAlgoHacia(x,y){
//         return tablero[this.posX+x][this.posY+y] != undefined;
//     }

//     MoverHacia(x,y){
//         tablero[this.posX][this.posY] = null;
//         tablero[this.posX += x][this.posY += y] = this
//         dibujarTablero();
//     }

//     MoverHacia_SiPuede(x,y){
//         if(!this.TieneAlgoHacia(x,y)){
//             this.MoverHacia(x,y);
//         }
//     }

//     Dibujarse() {
//         DibujarImagenEn(this.imagen,this.posX * 16,this.posY * 16,this.tamanioX,this.tamanioY)
//     }
// }

document.addEventListener("keydown", (event) => {
    if(pocoman != null){
        console.log(event.key);
        if((event.key == "a" ||event.key == "ArrowLeft"))
        {
            pocoman.MoverHacia_SiPuede(-1,0)
        }
        else if((event.key == "d" ||event.key == "ArrowRight"))
        {
            pocoman.MoverHacia_SiPuede(1,0)
        }
        else if((event.key == "s" ||event.key == "ArrowDown"))
        {
            pocoman.MoverHacia_SiPuede(0,1);
        }
        else if((event.key == "w" ||event.key == "ArrowUp"))
        {
            pocoman.MoverHacia_SiPuede(0,-1);
        }
    }
});

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

            tablero = JSON.parse(JSON.stringify(tableroJSON.tablero));
            tableroFondo = JSON.parse(JSON.stringify(tableroJSON.tablero));

            console.log(tablero);
            console.log(tableroFondo);

            // Redimensionar el canvas
            ancho = tableroJSON.ancho;
            alto = tableroJSON.alto;
            canvas.width = ancho * pixelesPorUnidad;
            canvas.height = alto * pixelesPorUnidad;

            // Actualizar las imágenes del tesoro y la caja
            tesoroImg.src = tableroJSON.imagenTesoro;

            cajaImg.src = tableroJSON.imagenCaja;

            pjImg.src = "1.png";
            
            muroImg.src = "muro.png";

            cajas = [];

            llenarTablero();
            llenarTableroDeFondo();

            // Dibujar el tablero actualizado
            setTimeout(function(){dibujarTablero()},100)
        } catch (error) {
            console.error("Error al importar el tablero:", error);
            alert("El archivo JSON no es válido.");
        }
    };

    lector.readAsText(archivo);
}
function importarTableroDesdeArchivo() {
    fetch('tablero_completo.json') // Ruta al archivo JSON
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then((tableroJSON) => {
            // Actualizar el tablero, ancho y alto
            tablero = JSON.parse(JSON.stringify(tableroJSON.tablero));
            tableroFondo = JSON.parse(JSON.stringify(tableroJSON.tablero));

            console.log(tablero);
            console.log(tableroFondo);

            // Redimensionar el canvas
            ancho = tableroJSON.ancho;
            alto = tableroJSON.alto;
            canvas.width = ancho * pixelesPorUnidad;
            canvas.height = alto * pixelesPorUnidad;

            // Actualizar las imágenes del tesoro y la caja
            tesoroImg.src = tableroJSON.imagenTesoro;
            cajaImg.src = tableroJSON.imagenCaja;

            llenarTablero();
            llenarTableroDeFondo();

            // Dibujar el tablero actualizado
            setTimeout(function () {
                dibujarTablero();
            }, 100);
        })
        .catch((error) => {
            console.error('Error al importar el tablero:', error);
            alert('No se pudo cargar el archivo JSON.');
        });
}

