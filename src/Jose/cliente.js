const WebSocket = require('ws');
const readline = require('readline');
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

// ? Se define el nombre del nodo

let nombreNodo;
rl.question('Ingrese el nombre de su Nodo ', (nombre) => {
  console.log('Used es el nodo: ' + nombre);
  nombreNodo = nombre;
  connection.send(JSON.stringify({ option: 1, nodo: nombreNodo }));
  rl.close();
});

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
let algoritmoUsado;
function InterpretarMensaje(mensaje) {
  if (mensaje.option === 1) {
    // ? Conectar
    algoritmoUsado = mensaje.algoritmo;
  } else if (mensaje.option === 2) {
    // ? Iniciar algoritmo
    console.log(mensaje);
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
  console.log(`WebSocket error: ${error}`);
};
