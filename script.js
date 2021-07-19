// Variables Globales
var archivo1listo=0;
var archivo2listo=0;
var ArrayArchivo1 = [];
var ArrayArchivo2 = [];
var ArrayauxiliarArchivo1 = [];
var ArrayauxiliarArchivo2 = [];
var ArrayTipo = [];
var ArrayIDTipo = [];
var ArrayCoordenada = [];
var ArrayIDCentroArchivo = [];
var ArrayIDPuntoArchivo = [];
var ArrayIDPuntoArchivo2 = [];
var ArrayProductos = [];
var nodes,edges;
var container = document.getElementById("mynetwork");
 nodes = new vis.DataSet([
     { id: "ins",fixed:true,x:0,y:0,label:"estacionamiento",color: "#C2FABC" },
 ]);
 edges = new vis.DataSet([]);

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
  return d.toFixed(5); //Retorna 5 decimales
}
function kilometros(x1,x2,y1,y2){

  var auxx=x2-x1;
  var auxy=y2-y1;
  var aux=(auxx*auxx)+(auxy*auxy);
  var resultado=Math.sqrt(aux);
  return resultado.toFixed(5);
}

function leerArchivo1(e) {
    if(archivo1listo==1){
      borrar(1);
  }
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
  ocultarhojaderuta();
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
    var alertaProductos = 0;
    for (let i = 0; i < ArrayauxiliarArchivo1.length; i++) {
      var verificar = ArrayauxiliarArchivo1[i][2];
      var coordenadas=verificar.split(",");
      var coorx=coordenadas[0];
      var coory=coordenadas[1];
     // console.log(coordenadas);
      
      if (ArrayauxiliarArchivo1[i][0] != "P" && ArrayauxiliarArchivo1[i][0] != "C") {
        alertaProductos = 1;
        console.log(alertaProductos);
        console.log(ArrayauxiliarArchivo1[i][0]);
      } else if (isNaN(ArrayauxiliarArchivo1[i][1]) == true) {
        alertaProductos = 2;
      }
      else if((isNaN(coorx)==true || isNaN(coory)==true)&&coordenadas.length!=2){
        alertaProductos = 3;
      }
    }
    if(alertaProductos==1){
      alert("La primera parte del archivo debe ser una C de centro de distribucion o una P Punto de venta");
      return;
    }
    else if(alertaProductos==2){
      alert("La segunda parte del archivo debe ser un numero n que es cantidad de productos a repartir");
      return;
    }
    else if(alertaProductos==3){
      alert("Alguno de las dos no son cordenadas");
      return;
    }
    else{
      for (let i = 0; i < ArrayauxiliarArchivo1.length; i++) {
      ArrayTipo.push(ArrayauxiliarArchivo1[i][0]);

      ArrayIDTipo.push(ArrayauxiliarArchivo1[i][1]);

      ArrayCoordenada.push(ArrayauxiliarArchivo1[i][2]);
    }
    
    }
      
      
    CREARGRAFO();
archivo1listo=1;
     if(archivo1listo==1&&archivo2listo==1){
      UNIRGRAFO();
    }
    
    console.log(ArrayArchivo1);
    console.log(ArrayauxiliarArchivo1);

    console.log(ArrayTipo);
    console.log(ArrayIDTipo);
    console.log("coordenada", ArrayCoordenada);
    console.log('Nodos',nodes.getIds());
    
    
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
  if(archivo2listo==1){
      borrar(2);

  }
var alertaProductos;
  ArrayArchivo2 = [];
  ArrayauxiliarArchivo2 = [];
  ArrayIDCentroArchivo = [];
    ArrayIDPuntoArchivo = [];
  ArrayIDPuntoArchivo2 = [];
  ArrayProductos = [];
  let archivo2 = e.target.files[0];
  if (!archivo2) {
    return;
  }
ocultarhojaderuta();
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
    archivo2listo=1;
    if(archivo1listo==1&&archivo2listo==1){
      UNIRGRAFO();
    }

    console.log(ArrayArchivo2);
    console.log(ArrayauxiliarArchivo2);
    console.log(ArrayIDCentroArchivo);
    console.log(ArrayIDPuntoArchivo);
    console.log(ArrayIDPuntoArchivo2);
    console.log(ArrayProductos);
     alertaProductos=0;
    for (let i = 0; i < ArrayProductos.length; i++){
      if(ArrayProductos[i]%1!=0||ArrayProductos[i]<0||1000<ArrayProductos[i]){
         alertaProductos=1;
break ;
      }
    }
     if(alertaProductos==1){
    alert("Existe una cantidad mal ingresada,revise contenido de archivo");
       return;
    }
  }; 
 console.log("f");
    
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


function borrar(e) {
  var borrar = nodes.getIds();
            var aristas=edges.get();
if(borrar.length==0){
  return
}else if(e==1){
  archivo1listo=0;
     for (var i = 0; i < borrar.length; i++) {
          nodes.remove(borrar[i]);
        var contadoraristas = aristas.filter(aristas => aristas.from == borrar[i]);
          for (var j = 0; j <contadoraristas.length; j++){
            edges.remove(contadoraristas[j].id);
          }
          
        }
  nodes.add({ id: "ins",fixed:true,x:0,y:0,label:"estacionamiento",color: "#C2FABC" }),
              

}else if(e==2&&archivo1listo==1){
  archivo2listo=0;
  for (var i = 1; i < borrar.length; i++) {
        var contadoraristas = aristas.filter(aristas => aristas.from == borrar[i]);
          for (var j = 0; j <contadoraristas.length; j++){
            edges.remove(contadoraristas[j].id);
          }
          
        }
}else if(e==2){
  archivo2listo=0;
  for (var i = 0; i < borrar.length; i++) {
        var contadoraristas = aristas.filter(aristas => aristas.from == borrar[i]);
          for (var j = 0; j <contadoraristas.length; j++){
            edges.remove(contadoraristas[j].id);
          }
          
        }
}


 }

  function CREARGRAFO(){
   // borrar();
 for(let i=0; i<ArrayTipo.length ;i++){
   var coordenadas=ArrayCoordenada[i].split(",");
   var coorx=coordenadas[0];
   var coory=coordenadas[1];
  if(ArrayTipo[i]=='C'){
    var tipo = 'C';//'Centro de distribución '
    edges.add([{id: "ins-"+ArrayTipo[i].concat(ArrayIDTipo[i]),from: "ins", to: ArrayTipo[i].concat(ArrayIDTipo[i]), label: kilometros(0,coorx,0,coory),fixed:{x:coorx,y:-coory}}]);
  }
   else{
     tipo ='Pv ';// 'Punto de venta '
   }
   let id = ArrayTipo[i].concat(ArrayIDTipo[i]);
   let label = tipo + ArrayIDTipo[i];
   
   nodes.add([{id: id , label: label,fixed:true,x:coorx,y:-coory }]);
   console.log(edges.get());
 } 
}

  function UNIRGRAFO(){
  let id,from,to,label;
  let ins="ins";
  for(let i=0; i<ArrayIDCentroArchivo.length ;i++){
    id="C"+ArrayIDCentroArchivo[i]+"-"+"P"+ArrayIDPuntoArchivo[i];
    from="C"+ArrayIDCentroArchivo[i];
    to="P"+ArrayIDPuntoArchivo[i];
    var x1=nodes.get(from).x;
    console.log(x1);
    var x2=nodes.get(to).x;
    var y1=nodes.get(from).y;
    var y2=nodes.get(to).y;
    console.log(x1,"-",x2,"-",y1,"-",y2);
    console.log(kilometros(x1,x2,y1,y2));
    edges.add([{id: id ,from: from, to: to, label: kilometros(x1,x2,y1,y2)}]);
  }
    var options = {
                     physics: { enabled: true, wind: { x: 1 } },

    };
    network.setOptions(options);

    var nodos=nodes.getIds();
      for(let i=0; i<nodos.length ;i++){
        if(nodos[i]!="ins")
  nodes.updateOnly({id:nodos[i] ,fixed:false });
        
        
}   /* var nodos =nodes.get()
    var C =nodos.filter(nodos => nodos.id[0]=="C" );
    console.log(C);
    for(let j=0;j<C.length;j++){
     var x=C[j].x
     var y=C[j].y
     
     edges.add([{id: ins ,from: C[j].id, to: to, label: kilometros(0,x,0,y)+" km"}]);
   }
   */
  }
function repetido(camino,recorrido){
  var repetido;
  for (let k = 0; k < recorrido.length; k++) {
    if (camino== recorrido[k].id) {
      
      repetido = true;
      break;
    } else {
      repetido = false;
    }
  }
  return repetido;
}
function suma(valor){
  //console.log(valor);
  var cantidad=0;
  for(let i=0;i<valor.length;i++){
    cantidad=cantidad+valor[i];    
  }
  //console.log(valor);
  //console.log(cantidad);
  if(valor.length==0){
    return 0;
  }else{
  return cantidad;
  }
}
function centro() {
  console.log(ArrayArchivo2);
  console.log(ArrayIDCentroArchivo);
  console.log(ArrayIDPuntoArchivo2);
  console.log(ArrayProductos);
  if (archivo1listo == 0 || archivo2listo == 0) {
    alert("Deben estar ambos archivos subidos para usar esta opcion");
    return;
  }
  mostrarhojaderuta();
  creargrafo2();

  console.log(ArrayIDCentroArchivo);

  var obtenercentro = ArrayIDCentroArchivo;
  var obtenernodos = nodes.getIds();
  var centro = [];
  let resultado = obtenercentro.reduce((a, e) => {
    if (!a.find(d => d == e)) {
      a.push(e);
    }

    return a;
  }, []);
  console.log(resultado);
  console.log(resultado.length);
  console.log(obtenernodos);

  console.log(nodes.get("C" + resultado[0]));
  for (let i = 0; i < resultado.length; i++) {
    centro.push(nodes.get("C" + resultado[i]));
    console.log(centro);
  }
  for (let j = 0; j < centro.length; j++) {
    console.log(centro[j]);
    console.log(centro.length);
    recorridocamion(centro[j]);
  }
}
function productospunto(valor){
   console.log(ArrayIDPuntoArchivo);
  console.log(valor);
  for(let i=0;ArrayIDPuntoArchivo.length;i++){
    
    if(ArrayIDPuntoArchivo[i]==valor[1]){
      console.log(parseInt(ArrayProductos[i]));
      return parseInt(ArrayProductos[i]);
    }
  }
 
}
function recorridocamion(centro){
  console.log(ArrayArchivo2);
      console.log(ArrayIDCentroArchivo);
    console.log(ArrayIDPuntoArchivo2);
    console.log(ArrayProductos);
  if(archivo1listo==0||archivo2listo==0){
    alert("Deben estar ambos archivos subidos para usar esta opcion");
    return;
  }
  
  var camion=1000;
  var cantcamiones=1;
  var totalcantidad=0;
  var auxproductos=0;
  var recorrido=[];
  var cantrecorrido=[];
  var valorrecorrido=[];
  var aristas=edges.get();
  var caminos=aristas.filter(aristas => aristas.from == centro.id);
  console.log(caminos);
  var despliegeacentro=aristas.filter(aristas => aristas.to == centro.id);
  var minimodistancia =caminos[0].label;
  var minimo;
  var auxdistancia;
  var auxcamino;
  
  for(let o=0;o<ArrayProductos.length;o++){
    for(let p=0;p<caminos.length;p++){
    if(ArrayIDPuntoArchivo[o]==caminos[p].to[1]){
    totalcantidad=totalcantidad+parseInt(ArrayProductos[o]);
    }
  }}
  console.log(ArrayProductos);
  console.log(valorrecorrido);
  console.log(suma(valorrecorrido),"!=",totalcantidad);
  while(suma(valorrecorrido)!=totalcantidad){
     var minimodistancia =caminos[0].label;
    
    console.log("valorrecorrido=",suma(valorrecorrido));
  
  for(let i=0;i<ArrayIDPuntoArchivo.length;i++){
    for(let j=0;j<caminos.length;j++){
      console.log(minimodistancia);
            console.log(ArrayIDPuntoArchivo[i]);

            console.log(caminos[j].to[1]);
     if(minimodistancia>=caminos[j].label && ArrayIDPuntoArchivo[i]==caminos[j].to[1] && repetido(caminos[j].to,recorrido)!=true){
       minimodistancia=caminos[j].label;
      minimo=nodes.get(caminos[j].to);
      auxproductos=parseInt(ArrayProductos[i]);
       unirgrafo2(centro,minimo,cantcamiones);
     }
    }
  }
    console.log(minimo);
  recorrido.push(minimo.id);
  cantrecorrido.push(minimodistancia);
  if(camion-auxproductos<0){
    var reserva=auxproductos-camion;
    unirgrafo2(minimo,nodes2.get("ins"),cantcamiones);
    cantcamiones++;
    console.log("un camion ya entrego todos sus productos");
    camion=1000;
   
  }else{
    camion=camion-auxproductos;
    valorrecorrido.push(productospunto(minimo.id));
    console.log("valorrecorrido=",suma(valorrecorrido));
  }
  
  while(suma(valorrecorrido)!=totalcantidad){
     
   if(reserva!=0){
     if(camion-reserva<=0){
       reserva=reserva-camion;
       unirgrafo2(minimo,nodes2.get("ins"),cantcamiones);
       cantcamiones++;
       console.log("un camion ya entrego todos sus productos");
       camion=1000;
       
       break;
     }else{
       camion=camion-reserva;
       reserva=0;
       console.log("se completo la entrega de un punto de venta");
       valorrecorrido.push(productospunto(minimo.id));
       console.log("valorrecorrido=",suma(valorrecorrido));
     }
   }else{
     
     var aux=minimo;
     for(let m=0;m<caminos.length;m++){
       if(minimo.id!=caminos[m].to){
         auxcamino=nodes.get(caminos[m].to);
         minimodistancia=kilometros(aux.x,auxcamino.x,aux.y,auxcamino.y);
         break;
       }
     }
    for(let i=0;i<ArrayIDPuntoArchivo.length;i++){
      for(let j=0;j<caminos.length;j++){
        auxcamino=nodes.get(caminos[j].to);
        var distancia=kilometros(aux.x,auxcamino.x,aux.y,auxcamino.y);
        if(minimodistancia>=distancia && ArrayIDPuntoArchivo[i]==caminos[j].to[1] && repetido(caminos[j].to,recorrido)!=true){
     minimodistancia=caminos[j].label;
          minimo=nodes.get(caminos[j].to);
        auxproductos=parseInt(ArrayProductos[i]);
        unirgrafo2(aux,minimo,cantcamiones);
       }
    }
   }
     console.log(minimo.id);
  recorrido.push(minimo);
  cantrecorrido.push(minimodistancia);
     if(camion-auxproductos<0){
      var reserva=auxproductos-camion;
      unirgrafo2(minimo,nodes2.get("ins"),cantcamiones);
      cantcamiones++;
      console.log("un camion ya entrego todos sus productos");  
       camion=1000;
     }else{
      camion=camion-auxproductos;
       console.log("se completo la entrega de un punto de venta");
       valorrecorrido.push(productospunto(minimo.id));
       console.log("valorrecorrido=",suma(valorrecorrido));
     }
   }  
    if(camion==1000){
      break;
    }
   } 
   
  }
  console.log(centro.id," cantidad de camiones=",cantcamiones,"y valorrecorrido=",suma(valorrecorrido));
  console.log(recorrido);
  //----------------------------------------------------
  
  
  for(let h=0;h<cantcamiones;h++){
    unirgrafo2(nodes2.get("ins"),centro,h+1);
  }
  if(cantcamiones==1){
    unirgrafo2(minimo,nodes2.get("ins"),1);
  }
  
  
}
function mostrarhojaderuta(){
  document.getElementById('mynetwork2').style.display='block';
  document.getElementById('Titulomynetwork2').style.display='block';
}
function ocultarhojaderuta(){
  document.getElementById('mynetwork2').style.display='none';
  document.getElementById('Titulomynetwork2').style.display='none';
}
var options = {//physics: false,
  manipulation: {
    enabled: false,
    addNode: false,
    addEdge: false,
    editEdge: false,
    deleteNode: false,
    deleteEdge: true
  } 
 
};


var network = new vis.Network(container, data, options);
network.setOptions(options);



