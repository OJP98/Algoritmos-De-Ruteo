var server = require('ws').Server;
const readline = require('readline');
const Node = require('./nodo');
const rl = readline.createInterface(process.stdin, process.stdout);

// ? Se define el puerto del servidor
if (process.argv[2] === undefined) {
  var s = new server({ port: 8080 });
} else {
  var s = new server({ port: process.argv[2] });
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
let algoritmoUsado;
let Grafo = [];
// ? Se define el algoritmo a usar
rl.question(
  'Ingrese que algoritmo usar: \n 1. Flooding \n 2. Distance vector routing \n 3. Link state routing \n >',
  (algoritmo) => {
    if (algoritmo == 1) {
      console.log('Usando Flooding...');
      algoritmoUsado = 1;
    } else if (algoritmo == 2) {
      console.log('Usando Distance vector routing...');
      algoritmoUsado = 2;
    } else if (algoritmo == 3) {
      console.log('Usando Link state routing...');
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

      algoritmoUsado = 3;
    } else {
      console.log('Usando Flooding...');
      algoritmoUsado = 1;
    }
    rl.close();
  }
);
//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

let NodosActuales = {};
//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos Link
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

function IniciarAlgoritmo(NodoInicio, NodoFin) {
  NodosActuales[NodoInicio].send(
    JSON.stringify({
      option: 2,
      NodoInicio,
      NodoFin,
      GrafoLImitado: GetGrafoLimitada(NodoInicio),
    })
  );
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

// ? Metodos compartidos

function InterpretarMensaje(mensaje, cliente) {
  if (mensaje.option === 1) {
    // nueva conexion
    NodosActuales[mensaje.nodo] = cliente;
    cliente.send(JSON.stringify({ option: 1, algoritmo: algoritmoUsado }));

    if (Object.keys(NodosActuales).length === 1) {
      // ! Comienza algoritmo para recorrer el grafo
      if (algoritmoUsado === 3) {
        IniciarAlgoritmo('A', 'E');
      }
    }
  }
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

// ? Metodos del servidor
s.on('connection', function (ws) {
  ws.on('message', function (message) {
    InterpretarMensaje(JSON.parse(message), ws);
  });

  ws.on('close', function (message) {
    console.log('se cierra un cliente ' + message);
  });

  console.log('cliente conectado ');
  console.log(Grafo);
});
