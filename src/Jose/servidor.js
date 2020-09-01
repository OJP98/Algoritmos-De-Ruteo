const Node = require('./nodo');
const LSR = require('./lsr');
/*
A: { B: 2, C: 4, D: 10 },
B: { A: 2, C: 1, D: 6, E: 9 },
C: { A: 4, B: 1, D: 4 },
D: { C: 4, B: 6, E: 2 },
E: { B: 9, D: 2 },
*/

function ConvertToJSON(grafo) {
  let nuevoGrafo = {};
  grafo.forEach((nodo) => {
    nuevoGrafo[nodo.name] = {};
    nodo.neighbors.forEach((neighbor) => {
      nuevoGrafo[nodo.name][neighbor.name] = neighbor.cost;
    });
  });
  console.log(nuevoGrafo);
  return nuevoGrafo;
}

function GetGrafoLimitada(NodoActual) {
  let retorno;
  Grafo.forEach((element) => {
    if (element.name === NodoActual) {
      retorno = element;
    }
  });
  return retorno;
}

let Grafo = [];

let A = new Node((name = 'A'));

A.AddNeighbor(new Node((name = 'B'), (cost = 2)));
A.AddNeighbor(new Node((name = 'C'), (cost = 4)));
A.AddNeighbor(new Node((name = 'D'), (cost = 10)));
Grafo.push(A);

let B = new Node((name = 'B'));
B.AddNeighbor(new Node((name = 'A'), (cost = 2)));
B.AddNeighbor(new Node((name = 'E'), (cost = 9)));
B.AddNeighbor(new Node((name = 'C'), (cost = 1)));
B.AddNeighbor(new Node((name = 'D'), (cost = 6)));
Grafo.push(B);

let C = new Node((name = 'C'));
C.AddNeighbor(new Node((name = 'A'), (cost = 4)));
C.AddNeighbor(new Node((name = 'B'), (cost = 1)));
C.AddNeighbor(new Node((name = 'D'), (cost = 4)));
Grafo.push(C);

let D = new Node((name = 'D'));
D.AddNeighbor(new Node((name = 'C'), (cost = 4)));
D.AddNeighbor(new Node((name = 'B'), (cost = 6)));
D.AddNeighbor(new Node((name = 'E'), (cost = 2)));
Grafo.push(D);

let E = new Node((name = 'E'));
E.AddNeighbor(new Node((name = 'B'), (cost = 9)));
E.AddNeighbor(new Node((name = 'D'), (cost = 2)));
Grafo.push(E);

LinkAlgorithm = new LSR();

//console.log(Grafo);
/*
const GrafoJSON = ConvertToJSON(Grafo);

console.log('Viene lo bueno');
LinkAlgorithm.findShortestPath(GrafoJSON, 'A', 'E');
*/

const listaDeNodos = ['A', 'B', 'C', 'D', 'E'];
const nodoInicio = 'A';
const nodoFinal = 'E';
let GrafoChico = [];

listaDeNodos.forEach((element) => {
  console.log(element);
  GrafoChico.push(GetGrafoLimitada(element));
  LinkAlgorithm.findShortestPath(
    ConvertToJSON(GrafoChico),
    nodoInicio,
    nodoFinal
  );

  console.log();
  console.log('---');
});

//console.log(GetGrafoLimitada('B'));
