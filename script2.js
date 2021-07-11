var container2 = document.getElementById("mynetwork2");

var nodes2 = new vis.DataSet([
  { id:"ins", color: "#C2FABC", label: "Instalación" }
]);

var edges2 = new vis.DataSet([
]);

data2 = {
  nodes: nodes2,
  edges: edges2
};

function CREARGRAFO(){
 for(let i=0; i<ArrayTipo.length ;i++){
  if(ArrayTipo[i]=='C'){
    var tipo = 'Centro de distribución '
    edges2.add([{id: "ins-"+ArrayTipo[i].concat(ArrayIDTipo[i]),from: "ins", to: ArrayTipo[i].concat(ArrayIDTipo[i]), label: "2" }]);
  }
   else{
     tipo = 'Punto de venta '
   }
   let id = ArrayTipo[i].concat(ArrayIDTipo[i]);
   let label = tipo + ArrayIDTipo[i];
   
nodes2.add([{id: id , label: label }]);
        
}     
}


function UNIRGRAFO(){
  let id,from,to,label;
  let ins="ins";
  for(let i=0; i<ArrayIDCentroArchivo.length ;i++){
    id="C"+ArrayIDCentroArchivo[i]+"-"+"P"+ArrayIDPuntoArchivo[i];
    from="C"+ArrayIDCentroArchivo[i];
    to="P"+ArrayIDPuntoArchivo[i];
    edges2.add([{id: id ,from: from, to: to, label: "1" }]);  
  }
  
  
}









var options2 = {
  manipulation: {
    enabled: true,
    addNode: false,
    addEdge: false,
    editEdge: false,
    deleteNode: false,
    deleteEdge: true
  }
};


var network2 = new vis.Network(container2, data2, options2);
network2.setOptions(options2);
