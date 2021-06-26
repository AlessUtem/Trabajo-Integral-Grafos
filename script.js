/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints a message in the browser's dev tools console


var container = document.getElementById("mynetwork");

var data = {
  nodes: nodes,
  edges: edges
};
var nodes = new vis.DataSet([
  { id: 1, label: "Instalación" },
  { id: 2, label: "Nodo 2" },
  { id: 3, label: "Nodo 3" },
  { id: 4, label: "Nodo 4" },
  { id: 5, label: "Nodo 5" }
]);

var o_nodes = new vis.DataSet(nodes);

// create an array with edges

var edges = new vis.DataSet([
  { id: "1-1", from: 1, to: 2, label: "2" },
  { id: "1-3", from: 1, to: 4, label: "4" },
  { id: "1-2", from: 1, to: 3, label: "5" },
  { id: "2-1", from: 2, to: 5, label: "1" },
  { id: "3-1", from: 3, to: 5, label: "4" },
  { id: "5-1", from: 5, to: 4, label: "3" }
]);



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
