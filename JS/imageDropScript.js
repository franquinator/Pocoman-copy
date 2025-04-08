const dropAreaTesoro = document.getElementById("div-tesoro");
const inputFileTesoro = document.getElementById("input-file-tesoro");
const imageViewTesoro = document.getElementById("img-tesoro");

inputFileTesoro.addEventListener("change",function(){uploadImage(inputFileTesoro,imageViewTesoro)});

dropAreaTesoro.addEventListener("dragover",function(e){
    e.preventDefault();
});

dropAreaTesoro.addEventListener("drop",function(e){
    e.preventDefault();
    inputFileTesoro.files = e.dataTransfer.files;
    uploadImage(inputFileTesoro,imageViewTesoro);
});

function uploadImage(inputFile,imageView){
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.src = imgLink;
    console.log("subido");
}



const dropAreaCaja = document.getElementById("div-caja");
const inputFileCaja = document.getElementById("input-file-caja");
const imageViewCaja = document.getElementById("img-caja");

inputFileCaja.addEventListener("change",function(){uploadImage(inputFileCaja,imageViewCaja)});

dropAreaCaja.addEventListener("dragover",function(e){
    e.preventDefault();
});

dropAreaCaja.addEventListener("drop",function(e){
    e.preventDefault();
    inputFileCaja.files = e.dataTransfer.files;
    uploadImage(inputFileCaja,imageViewCaja);
});

function uploadImage(inputFile,imageView){
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.src = imgLink;
    cambiarCaja(imgLink);
    console.log("subido");
}



