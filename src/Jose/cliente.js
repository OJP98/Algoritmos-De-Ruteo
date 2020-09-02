const WebSocket = require('ws');
const readline = require('readline');
const LSR = require('./lsr');
const ClienteDVR = require('../Oscar/clientedvr');
const rl = readline.createInterface(process.stdin, process.stdout);

// ? Se define la url del servidor
if (process.argv[2] === undefined) {
  var url = 'ws://localhost:8080';
} else {
  var url = process.argv[2];
}
const connection = new WebSocket(url);

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

var clienteDvr;

// ? Se define el nombre del nodo

let nombreNodo;
rl.question('Ingrese el nombre de su Nodo ', (nombre) => {
  console.log('Used es el nodo: ' + nombre);
  nombreNodo = nombre;
  connection.send(JSON.stringify({
    option: 1,
    nodo: nombreNodo
  }));
  rl.close();
});
//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos link
const LinkAlgorithm = new LSR();

function IniciarAlgoritmo(mensaje) {
  console.log(mensaje);

  let iterLink = LinkAlgorithm.findShortestPath(
    mensaje.GrafoLImitado,
    mensaje.NodoInicio,
    mensaje.NodoFin
  );
  LinkAlgorithm.printTable(iterLink);
  const nextNodo = LinkAlgorithm.GetNextNodo(
    iterLink['distances'],
    mensaje.nodosVisitados
  );
  console.log(nextNodo);
  connection.send(
    JSON.stringify({
      option: 3,
      nextNodo,
      NodoInicio: mensaje.NodoInicio,
      NodoFin: mensaje.NodoFin,
    })
  );
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
let algoritmoUsado;

function InterpretarMensaje(mensaje) {
  if (mensaje.option === 1) {
    // ? Conectar
    algoritmoUsado = mensaje.algoritmo;

    if (algoritmoUsado === 2) {
      clienteDvr = new ClienteDVR(mensaje.nodo);
    }
  } else if (mensaje.option === 2) {
    // ? Iniciar algoritmo
    if (algoritmoUsado === 3) {
      IniciarAlgoritmo(mensaje);
    }
  } else if (mensaje.option === 3) {
    // ? Explorar nuevo nodo
    if (algoritmoUsado === 3) {
      console.log(mensaje);
    }
  }
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos propios del cliente
connection.onmessage = (mensaje) => {
  console.log(mensaje.data);
  InterpretarMensaje(JSON.parse(mensaje.data));
};

connection.onerror = (error) => {
  console.log('WebSocket error\n', {
    error
  });
};