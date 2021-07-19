var container2 = document.getElementById("mynetwork2");

var nodes2 = new vis.DataSet([
  { id: "ins",fixed:true,x:0,y:0,label:"estacionamiento",color: "#C2FABC" },
]);

var edges2 = new vis.DataSet([
]);

data2 = {
  nodes: nodes2,
  edges: edges2
  
};
function creargrafo2(){
  for(let i=0; i<ArrayTipo.length ;i++){
   var coordenadas=ArrayCoordenada[i].split(",");
   console.log(coordenadas[0]);
   var coorx=coordenadas[0];
   var coory=coordenadas[1];
  if(ArrayTipo[i]=='C'){
    var tipo = 'Centro de distribución '
    //edges2.add([{id: "ins-"+ArrayTipo[i].concat(ArrayIDTipo[i]),from: "ins", to: ArrayTipo[i].concat(ArrayIDTipo[i]), label: kilometros(0,coorx,0,coory) ,fixed:{x:coorx,y:coory}}]);
  }
   else{
     tipo = 'Punto de venta '
   }
   let id = ArrayTipo[i].concat(ArrayIDTipo[i]);
   let label = tipo + ArrayIDTipo[i];
   
nodes2.add([{id: id , label: label,fixed:{x:coorx,y:coory} }]);
        
 } 
}
function aristarepetida(nombre){
  var repetido;
  var aristas=edges2.getIds();
  for (let k = 0; k < aristas.length; k++) {
    
    if (nombre == aristas[k]) {
    console.log(nombre,"==",aristas[k]);
      repetido = true;
      break;
    } else {
      repetido = false;
    }
  }
  return repetido;
  
}
function unirgrafo2(primero,segundo,ncamion){
  console.log(edges2.getIds());
  var  cont=0;
   var nombre="camion"+ncamion+"-"+cont;
  while(aristarepetida(nombre)==true){
    cont++;
    nombre="camion"+ncamion+"-"+cont;
  }
  var distancia=kilometros(primero.x,segundo.x,primero.y,segundo.y);
  edges2.add([{id:nombre ,from: primero.id, to: segundo.id, label:"camion "+ncamion+"("+distancia+")"}]);
}

var options2 = {
 
 edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" }
    }
    }
};


var network2 = new vis.Network(container2, data2, options2);
network2.setOptions(options2);
