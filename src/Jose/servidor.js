const Node = require('./nodo');
const LSR = require('./lsr');
/*
A: { B: 2, C: 4, D: 10 },
B: { A: 2, C: 1, D: 6, E: 9 },
C: { A: 4, B: 1, D: 4 },
D: { C: 4, B: 6, E: 2 },
E: { B: 9, D: 2 },
*/

/*
  Convierte el grafo de objetos en JSON
*/
function ConvertToJSON(grafo) {
  let nuevoGrafo = {};
  grafo.forEach((nodo) => {
    nuevoGrafo[nodo.name] = {};
    nodo.neighbors.forEach((neighbor) => {
      nuevoGrafo[nodo.name][neighbor.name] = neighbor.cost;
    });
  });
  //console.log(nuevoGrafo);
  return nuevoGrafo;
}

/*
  Te da solo el grafo y las conexiones
  respecto al NodoActual
*/
function GetGrafoLimitada(NodoActual) {
  let retorno;
  Grafo.forEach((element) => {
    if (element.name === NodoActual) {
      retorno = element;
    }
  });
  return retorno;
}

/*
  Calcula cual es el siguiente nodo a visitar,
  si es que lo hay
*/
function GetNextNodo(distances, nodosVisitados) {
  const sortedDistances = Object.keys(distances).sort();

  for (let index = 0; index < sortedDistances.length; index++) {
    if (
      distances[sortedDistances[index]] !== 'Infinity' &&
      !nodosVisitados.includes(sortedDistances[index])
    ) {
      return sortedDistances[index];
    }
  }
  return false;
}

/* 
  Imprime la tabla de distancia y nodo 
  padre
*/
function printTable(iterLink) {
  console.log('Nodo \t Dist. \t padre');
  Object.keys(iterLink['distances']).forEach((element) => {
    if (iterLink['distances'][element] === 'Infinity') {
      console.log(`${element} \t Inf \t ${iterLink['parents'][element]}`);
    } else
      console.log(
        `${element} \t ${iterLink['distances'][element]} \t ${iterLink['parents'][element]}`
      );
  });
}

// Se declara el grafo
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

// Se declara nodo inicial y Final
const nodoInicio = 'A';
const nodoFinal = 'E';

/*
  GrafoChico guarda la informacion del grafo
  conforme lo va visitando
*/
let GrafoChico = [];

// Iteracion inicial del algoritmo
console.log(`Nodo Actual: ${nodoInicio}`);

let nodosVisitados = [];
GrafoChico.push(GetGrafoLimitada(nodoInicio));
nodosVisitados.push(nodoInicio);
let iterLink = LinkAlgorithm.findShortestPath(
  ConvertToJSON(GrafoChico),
  nodoInicio,
  nodoFinal
);
printTable(iterLink);

// Iteraciones desconocidas
let nextNodo;
while (true) {
  nextNodo = GetNextNodo(iterLink['distances'], nodosVisitados);
  if (!nextNodo) {
    console.log('Algoritmo terminado');
    break;
  }
  nodosVisitados.push(nextNodo);
  console.log(`Nodo Actual: ${nextNodo}`);
  GrafoChico.push(GetGrafoLimitada(nextNodo));
  iterLink = LinkAlgorithm.findShortestPath(
    ConvertToJSON(GrafoChico),
    nodoInicio,
    nodoFinal
  );
  //console.log(iterLink);
  printTable(iterLink);
}
