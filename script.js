// Variables Globales
var ArrayArchivo1 = [];
var ArrayArchivo2 = [];
var ArrayauxiliarArchivo1 = [];
var ArrayauxiliarArchivo2 = [];
var ArrayTipo = [];
var ArrayIDTipo = [];
var ArrayCoordenada = [];
var ArrayIDCentroArchivo = [];
var ArrayIDPuntoArchivo = [];
var ArrayProductos = [];

var container = document.getElementById("mynetwork");

var nodes = new vis.DataSet([
  
]);

var edges = new vis.DataSet([
]);

var nodes = new vis.DataSet([
  { id: "ins", color: "#C2FABC", label: "Instalación"},
  { id: "c1", color: "#fabcbc", label: "Centro de distribución 1"},
  { id: "c2", color: "#fabcbc", label: "Centro de distribución 2"},
  { id: "p1", label: "Punto de venta 1"},
  { id: "p2", label: "Punto de venta 2"},
  { id: "p3", label: "Punto de venta 3"},
  { id: "p4", label: "Punto de venta 4"}
]);

var edges = new vis.DataSet([
  { id: "ins-c1", from: "ins", to: "c1", label: "2" },
  { id: "ins-c2", from: "ins", to: "c2", label: "4" },
  { id: "c1-p1", from: "c1", to: "p1", label: "5" },
  { id: "c1-p2", from: "c1", to: "p2", label: "1" },
  { id: "c1-p3", from: "c1", to: "p3", label: "4" },
  { id: "p1-p2", from: "p1", to: "p2", label: "3" },
  { id: "p1-p3", from: "p1", to: "p3", label: "3" },
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

function getKilometros(lat1, lon1, lat2, lon2) {
  let rad = function(x) {
    return (x * Math.PI) / 180;
  };
  let R = 6371; //Radio de la tierra en km

  let radaux1 = lat2 - lat1;
  let radaux2 = lon2 - lon1;
  let dLat = rad(radaux1);
  let dLong = rad(radaux2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d.toFixed(5); //Retorna tres decimales
}
function kilometros(x1,x2,y1,y2){
  var auxx=x2-x1;
  var auxy=y2-y1;
  var aux=(auxx*auxx)+(auxy*auxy);
  var resultado=Math.sqrt(aux);
  return resultado.toFixed(5);
}

console.log(getKilometros(lat1, long1, lat2, long2));

function leerArchivo1(e) {
  ArrayArchivo1 = [];
  ArrayauxiliarArchivo1 = [];
  ArrayTipo = [];
  ArrayIDTipo = [];
  ArrayCoordenada = [];
      //borrar();
  let archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  lector.onload = function(e) {
    let contenido = e.target.result;
    mostrarContenido(contenido);
    ArrayArchivo1 = e.target.result.split("\r\n");
    ArrayArchivo1.pop();
    for (let i = 0; i < ArrayArchivo1.length; i++) {
      ArrayArchivo1[i] = ArrayArchivo1[i].replace(/["]/g, "");
      ArrayauxiliarArchivo1.push(ArrayArchivo1[i].split(";"));
    }

    for (let i = 0; i < ArrayauxiliarArchivo1.length; i++) {
      ArrayTipo.push(ArrayauxiliarArchivo1[i][0]);

      ArrayIDTipo.push(ArrayauxiliarArchivo1[i][1]);

      ArrayCoordenada.push(ArrayauxiliarArchivo1[i][2]);
    }
    CREARGRAFO();

    console.log(ArrayArchivo1);
    console.log(ArrayauxiliarArchivo1);

    console.log(ArrayTipo);
    console.log(ArrayIDTipo);
    console.log("coordenada", ArrayCoordenada);
    console.log('Nodos',nodes2.getIds());
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  let elemento = document.getElementById("contenido-archivo");
  elemento.innerHTML = contenido;
}

document
  .getElementById("file-input")
  .addEventListener("change", leerArchivo1, false);

function leerArchivo2(e) {
  ArrayArchivo2 = [];
  ArrayauxiliarArchivo = [];
  ArrayIDCentroArchivo = [];
  ArrayIDPuntoArchivo2 = [];
  ArrayProductos = [];
  let archivo2 = e.target.files[0];
  if (!archivo2) {
    return;
  }

  let lector = new FileReader();
  lector.onload = function(e) {
    let contenido2 = e.target.result;
    mostrarContenido2(contenido2);
    ArrayArchivo2 = e.target.result.split("\r\n");
    ArrayArchivo2.pop();
    for (let i = 0; i < ArrayArchivo2.length; i++) {
      ArrayArchivo2[i] = ArrayArchivo2[i].replace(/["]/g, "");
      ArrayauxiliarArchivo2.push(ArrayArchivo2[i].split(";"));
    }

    for (let i = 0; i < ArrayauxiliarArchivo2.length; i++) {
      ArrayIDCentroArchivo.push(ArrayauxiliarArchivo2[i][0]);

      ArrayIDPuntoArchivo.push(ArrayauxiliarArchivo2[i][1]);

      ArrayProductos.push(ArrayauxiliarArchivo2[i][2]);
    }
    UNIRGRAFO();
    console.log(ArrayArchivo2);

    console.log(ArrayauxiliarArchivo2);

    console.log(ArrayIDCentroArchivo);
    console.log(ArrayIDPuntoArchivo);
    console.log(ArrayProductos);
    var alertaProductos=0;
    for (let i = 0; i < ArrayProductos.length; i++){
      if(ArrayProductos[i]%1!=0||ArrayProductos[i]<0||1000<ArrayProductos[i]){
         alertaProductos=1;
      }
    }
    console.log(alertaProductos);
    if(alertaProductos==1){
      alert("Existe al menos una cantidad incorrecta");
    }
    console.log('Aristas',edges2.getIds());
    
  };   
  lector.readAsText(archivo2);
}

function mostrarContenido2(contenido) {
  let elemento2 = document.getElementById("contenido-archivo2");
  elemento2.innerHTML = contenido;
}

document
  .getElementById("file-input2")
  .addEventListener("change", leerArchivo2, false);


/*var clusss=Network.clusterByConnection("c1")
console.log("AAAA",clusss)
*/


function borrar() {
  var borrar = nodes2.getIds();
            var aristas=edges2.get();
if(borrar.length==0){
  return
}else{
     for (var i = 0; i < borrar.length; i++) {
          nodes.remove(borrar[i]);
        var contadoraristas = aristas.filter(aristas => aristas.from == borrar[i]);
          console.log(contadoraristas);
          for (var j = 0; j <contadoraristas.length; j++){
            edges.remove(contadoraristas[j].id);
          }
          
        }
      
}

     
      

 }



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


