/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console


var container = document.getElementById("mynetwork");

var data = {
  nodes: nodes,
  edges: edges
};
var nodes = new vis.DataSet([
  { id: "ins",color: "#C2FABC", label: "Instalación" },
  { id: "c1", color: "#fabcbc", label: "Centro de distribución 1" },
  { id: "c2", color: "#fabcbc", label: "Centro de distribución 2" },
  { id: "p1", label: "Punto de venta 1" },
  { id: "p2", label: "Punto de venta 2" },
  { id: "p3", label: "Punto de venta 3" },
  { id: "p4", label: "Punto de venta 4"}
]);

var o_nodes = new vis.DataSet(nodes);

// create an array with edges

var edges = new vis.DataSet([
  { id: "ins-c1", from: "ins", to: "c1", label: "2" },
  { id: "ins-c2", from: "ins", to: "c2", label: "4" },
  { id: "c1-p1", from: "c1", to: "p1", label: "5" },
  { id: "c1-p2", from: "c1", to: "p2", label: "1" },
  { id: "c1-p3", from: "c1", to: "p3", label: "4" },
  { id: "p1-p2", from: "p1", to: "p2", label: "3" },
  { id: "p2-p3", from: "p2", to: "p3", label: "3" },
  { id: "c2-p4", from: "c2", to: "p4", label: "3" }
]);

data = {
  nodes: nodes,
  edges: edges
};

 var lat1 = -2;
 var long1 = 77;
 var lat2 = 10;
 var long2 = 6;

function getKilometros(lat1,lon1,lat2,lon2)
 {
let rad = function(x) {return x*Math.PI/180;}
let R = 6371; //Radio de la tierra en km
   
 let radaux1 = (lat2 - lat1)
 let radaux2 = (lon2 - lon1) 
 let dLat = rad( radaux1 );
 let dLong = rad( radaux2 );
   
let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
 let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 let d = R * c;
return d.toFixed(5); //Retorna tres decimales
 }



console.log(getKilometros(lat1,long1,lat2,long2))


function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById('contenido-archivo');
  elemento.innerHTML = contenido;
}

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);

console.log(file-input);




var options = {
  manipulation: {
    enabled: true,
    addNode: false,
    addEdge: false,
    editEdge: false,
    deleteNode: false,
    deleteEdge: true
  }
};
var network = new vis.Network(container, data, options);
network.setOptions(options);
