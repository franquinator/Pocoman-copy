var canvas;
var contexto;
var FPS = 500;

//Escenario / Tablero
var columnas = 50;
var filas = 50;
var tablero; //matriz del nivel

//Celdas
var ancho;
var alto;

// var imagen = new Image();
// imagen.src="Bloque rojo.png";

//Tipos
const ParedColor = '#000000';
const SueloColor = '#999999';
const OpenSetColor = '#008000';
const CloseSetColor = '#FF0000';
const RecorridoColor = "#0000FF";

const ParedID = 1;
const SueloID = 0;
const OpenSetID = 2;
const CloseSetID = 3;
const RecorridoID = 4;

//Ruta
var inicio;
var final;

var openSet = [];
var closeSet = [];

var terminado = false;

var celdaFinal;

function celda(x,y){
    //Posición
    this.x = x;
    this.y = y;
    
    //Tipo 0 vacio 1 obstaculo 2 open set 3 close set
    this.tipo = 0;

    //Asignar tipo 
    var aleatorio = Math.floor(Math.random() *5);
    if(aleatorio == 1){
        this.tipo = 1;
    }
    else{
        this.tipo = 0;
    }

    //valores para el pathfinding
    this.g = 0;//pasos dados
    this.h = 0;//heurístíca(distancia que se cree hay hasta al final)
    this.f = 0;//g+h

    this.vecinos = [];
    this.padre = null;

    this.GuardarVecinos = function(){
        // if(this.x > 0 && this.y > 0)
        // {
        //     this.vecinos.push(tablero[this.x - 1][this.y - 1]);
        // }
        if(this.y > 0)
        {
            this.vecinos.push(tablero[this.x][this.y - 1]);
        }
        // if(this.x < columnas-1 && this.y > 0)
        // {
        //     this.vecinos.push(tablero[this.x + 1][this.y - 1]);
        // }
        if(this.x > 0)
        {
            this.vecinos.push(tablero[this.x -1][this.y]);
        }
        if(this.x < columnas - 1)
        {
            this.vecinos.push(tablero[this.x +1][this.y]);
        }
        // if(this.x > 0 && this.y < filas - 1)
        // {
        //     this.vecinos.push(tablero[this.x - 1][this.y + 1]);
        // }
        if(this.y < filas - 1)
        {
            this.vecinos.push(tablero[this.x][this.y + 1]);
        }
        // if(this.x < columnas-1 && this.y < filas - 1)
        // {
        //     this.vecinos.push(tablero[this.x + 1][this.y + 1]);
        // }
       
    }
    this.calcularF = function(){
        this.f = this.g+this.h;
    }
    //Dibuja la celda
    this.dibujarCelda = function(){
        var color;
        if(this.tipo == SueloID){
            color = SueloColor;
        }
        else if(this.tipo == ParedID){
            color = ParedColor;
        }
        else if(this.tipo == OpenSetID){
            color = CloseSetColor;
        }
        else if(this.tipo == CloseSetID){
            color = CloseSetColor;
        }
        else if(this.tipo == RecorridoID){
            color = RecorridoColor;
        }
        //DibujarCirculo(this.x,this.y,color)
        contexto.fillStyle = color;
        contexto.fillRect(this.x * ancho, this.y * alto,ancho,alto);
    }
}

function crearArray2D(c,f){
    var obj = new Array(c);
    for(a=0;a<c;a++){
        obj[a] = new Array(f);
    }
    return obj;
}
function DistanciaEntre(a,b)
{
    DistanciaX = Math.abs(a.x - b.x);
    DistanciaY = Math.abs(a.y - b.y);
    return DistanciaX+DistanciaY;
}

function agregarAOpenSet(a){
    a.tipo = OpenSetID;
    openSet.push(a);
}
function moverACloseSet(a){
    a.tipo = CloseSetID;
    closeSet.push(a);
    openSet = openSet.filter(celda => celda != a)
}
function DibujarCirculo(X,Y,color){
    contexto.fillStyle = color;
    contexto.beginPath();
    const x = ancho /2 + X * ancho; // Coordenada x
    const y = alto/2 + Y * alto; // Coordenada y
    const radius = ancho/2; // Radio del Arco
    const startAngle = 0; // Punto inicial del Círculo
    const endAngle = Math.PI*2; // Punto final del Círculo

    contexto.arc(x, y, radius, startAngle, endAngle, false);

    contexto.fill();
}
function iniciar(){
    openSet = [];
    closeSet = [];

    terminado = false;
    canvas = document.getElementById("canvas");
    contexto = canvas.getContext("2d");

    //calculamos el tamaño de las celdas
    alto = parseInt(canvas.height / filas);
    ancho = parseInt(canvas.width / columnas);

    //contexto.arc(10, 10, 10, 0, 360, false)
    

    //Creamos el tablero
    tablero = crearArray2D(columnas,filas)

    //Añado las celdas al tablero
    for(x=0; x < columnas;x++){
        for(y=0; y< filas; y++){
            tablero[x][y] = new celda(x,y);
        }
    }
    for(x=0; x < columnas;x++){
        for(y=0; y< filas; y++){
            tablero[x][y].GuardarVecinos();
        }
    }


    inicio = tablero[0][0];
    final = tablero[columnas-1][filas-1];

    agregarAOpenSet(inicio);
    
    for(i=0;i< openSet[0].vecinos.length;i++){
        var celdaAAnalizar = openSet[0].vecinos[i];

        if(celdaAAnalizar.tipo == 0){
            celdaAAnalizar.padre = openSet[0]
            celdaAAnalizar.g = openSet[0].g + 1;
            celdaAAnalizar.h = DistanciaEntre(celdaAAnalizar,final);
            celdaAAnalizar.calcularF();
            agregarAOpenSet(celdaAAnalizar);
        }
    }

    moverACloseSet(openSet[0]);




    // for(i=0;i< openSet[ganador].vecinos.length;i++){
    //     var celdaAAnalizar = openSet[ganador].vecinos[i];

    //     if(celdaAAnalizar.tipo == 0){
    //         celdaAAnalizar.padre = openSet[ganador]
    //         celdaAAnalizar.g = openSet[ganador].g + 1;
    //         celdaAAnalizar.h = DistanciaEntre(celdaAAnalizar,final);
    //         celdaAAnalizar.calcularF();
    //         celdaAAnalizar.tipo = OpenSetID;
    //         openSet.push(celdaAAnalizar);
    //     }
    // }
    // closeSet.push(openSet[ganador]);
    // openSet.splice(ganador,1)

    // for(i=0;i<openSet.length;i++){
    //     tablero[openSet[i].x][openSet[i].y].tipo = OpenSetID;
    // }
    // for(i=0;i<closeSet.length;i++){
    //     tablero[closeSet[i].x][closeSet[i].y].tipo = CloseSetID;
    // }

    console.log(openSet);
    // for(i=0; i<openSet.length ;i++){
    //     openSet[i].GuardarVecinos();
    // }

    //Empezamos el bucle principal
    setInterval(function(){Update()},1000 /FPS);
    
    //
}
function Update(){
    ActualizarOpenSet();
    BorrarCanvas();
    DibujarCanvas();

}
function ActualizarOpenSet(){
    // for(i=0; i<openSet.length ;i++){
    //     openSet[i].GuardarVecinos();
    // }
        //buscar el que tiene f mas baja
        if(terminado == false)
        {
            var ganador = 0;
            for(i=0 ; i<openSet.length;i++){
                if(openSet[ganador].f > openSet[i].f){
                    ganador = i;
                }
            }
            if(openSet[ganador].h<1){
                terminado = true;
                celdaFinal = openSet[ganador];
                return;
            }
            for(i=0;i< openSet[ganador].vecinos.length;i++){
                var celdaAAnalizar = openSet[ganador].vecinos[i];
        
                if(celdaAAnalizar.tipo == 0){
                    if(celdaAAnalizar.padre == null)
                    {
                        celdaAAnalizar.padre = openSet[ganador]
                    }
                    celdaAAnalizar.g = openSet[ganador].g + 1;
                    celdaAAnalizar.h = DistanciaEntre(celdaAAnalizar,final);
                    celdaAAnalizar.calcularF();
                    agregarAOpenSet(celdaAAnalizar);
                }
            }    
            moverACloseSet(openSet[ganador]);


        }
        else
        {
            console.log(openSet);
            console.log(celdaFinal);
            while(celdaFinal.padre != null)
            {
                celdaFinal.tipo = RecorridoID;
                celdaFinal = celdaFinal.padre;

            }
        }

    
}
function DibujarCanvas() {
    for (x = 0; x < columnas; x++) {
        for (y = 0; y < filas; y++) {
            tablero[x][y].dibujarCelda();
        }
    }    
}
// imagen.onLoad = function(){
//     contexto.drawImage(imagen,0,0);
// }

function BorrarCanvas(){
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}