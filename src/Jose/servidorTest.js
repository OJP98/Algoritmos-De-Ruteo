var server = require('ws').Server;
const Node = require('./nodo');

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
    ?#############################
    ?#############################
*/

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

/*
    ?#############################
    ?#############################
*/

try {
  var s = new server({ port: process.argv[2] });
} catch (error) {
  var s = new server({ port: 8080 });
}

let NodosActuales = {};

function InterpretarMensaje(mensaje, cliente) {
  if (mensaje.option === 1) {
    // nueva conexion
    NodosActuales[mensaje.nodo] = cliente;
    console.log(NodosActuales);
  }
}

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    InterpretarMensaje(JSON.parse(message), ws);

    NodosActuales['A'].send(JSON.stringify(GetGrafoLimitada('A')));
  });

  ws.on('close', function (message) {
    console.log('se cierra un cliente ' + message);
  });

  console.log('cliente conectado ');
});
