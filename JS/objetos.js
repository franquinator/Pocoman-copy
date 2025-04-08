const pjImg = new Image();
const muroImg = new Image();
const nadaImg = new Image();
const equisImg = new Image();



function iniciarImg(){
    pjImg.src = "1.png";
    muroImg.src = "muro.png";
    nadaImg.src = "nada.png";
    equisImg.src = "equis.png";
    console.log("inicio objetos");
}
class Nada{
    constructor(cordenadaX,cordenadaY) {
        this.posX = cordenadaX;
        this.posY = cordenadaY;
    }
    Imagen(){
        return nadaImg;
    }
}
class Equis{
    constructor(cordenadaX,cordenadaY) {
        this.posX = cordenadaX;
        this.posY = cordenadaY;
    }
    Imagen(){
        return equisImg;
    }
}
class Muro {
    constructor(cordenadaX,cordenadaY) {
        this.posX = cordenadaX;
        this.posY = cordenadaY;
    }
    Imagen(){
        return muroImg;
    }
    EsMovil(){
        return false;
    }
    PuedeMoverseHacia(x,y){
        return false;
    }
}
class Caja {
    constructor(cajaImg,tesoroImg,cordenadaX,cordenadaY) {
        this.cajaImg = cajaImg;
        this.tesoroImg = tesoroImg;
        this.imagen = cajaImg;
        this.posX = cordenadaX;
        this.posY = cordenadaY;
        this.soyTesoro = false;
    }
    Imagen(){
        var imagen = new Image();
        imagen.src = this.imagen;
        return imagen;
    }
    EsMovil(){
        return true;
    }
    PuedeMoverseHacia(x,y){
        var proxObj = tablero[this.posX+x][this.posY+y]
        if(proxObj == null){
            this.MoverHacia(x,y);
            return true;
        }
        else{
            return false;
        }
    }
    MoverHacia(x,y){
        console.log("se movio");
        tablero[this.posX][this.posY] = null;
        //tablero[this.posX][this.posY] = new Nada(this.posX,this.posY);
        tablero[this.posX += x][this.posY += y] = this
        if(!this.soyTesoro && tableroFondo[this.posX][this.posY] instanceof Equis){
            this.convertirseEnTesoro();
        }
        else if(this.soyTesoro && !(tableroFondo[this.posX][this.posY] instanceof Equis)){
            this.convertirseEnCaja();
        }
        if(Gane()){
            setTimeout(function () {alert("ganaste ")}, 500);    
        }
        dibujarTablero();

    }
    convertirseEnTesoro(){
        console.log("soy un tesoro")
        this.imagen = this.tesoroImg;
        this.soyTesoro = true;
    }

    convertirseEnCaja(){
        console.log("soy una caja")
        this.imagen = this.cajaImg;
        this.soyTesoro = false;
    }
    EsTesoro(){
        return this.soyTesoro;
    }
}
class Pocoman {
    constructor(cordenadaX,cordenadaY) {
        this.posX = cordenadaX;
        this.posY = cordenadaY;
    }
    Imagen(){
        return pjImg;
    }

    PuedeMoverseHacia(x,y){
        var proxObj = tablero[this.posX+x][this.posY+y]
        // return true;
        return proxObj == null || proxObj.PuedeMoverseHacia(x,y);
    }

    MoverHacia(x,y){
        tablero[this.posX][this.posY] = null;
        //tablero[this.posX][this.posY] = new Nada(this.posX,this.posY);
        tablero[this.posX += x][this.posY += y] = this
        dibujarTablero();
    }

    MoverHacia_SiPuede(x,y){
        if(this.PuedeMoverseHacia(x,y)){
            this.MoverHacia(x,y);
        }
    }
    HayAlgoHacia(x,y){
        return tablero[this.posX+x][this.posY+y] != Nada;
    }

    Dibujarse() {
        DibujarImagenEn(this.imagen,this.posX * 16,this.posY * 16,this.tamanioX,this.tamanioY)
    }
}

function HayAlgoEn(x,y){
    return tablero[x][y] != Nada;
}
// class Objeto {
//     constructor(imagenSrc,posX,posY,tamanioX,tamanioY) {
//         this.imagen = new Image();
//         this.imagen.src = imagenSrc;
//         this.posX = posX;
//         this.posY = posY;
//         this.tamanioX = tamanioX;
//         this.tamanioY = tamanioY;
//     }
//     Dibujarse() {
//         DibujarImagenEn(this.imagen,this.posX * 16,this.posY * 16,this.tamanioX,this.tamanioY)
//     }
// }
// class Caja extends Objeto{
//     TieneAlgoHacia(x,y){
//         tablero[posX+x][posY+y] != null;
//     }

//     MoverHacia(x,y){
//         tablero[posX][posY] = null;
//         tablero[posX+x][posY+y] = this
//     }

//     MoverHacia_SiPuede(x,y){
//         if(!this.TieneAlgoHacia(x,y)){
//             this.MoverHacia(x,y);
//         }
//     }
// }