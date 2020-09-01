const WebSocket = require('ws');
const LSR = require('./lsr');

LinkAlgorithm = new LSR();

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const url = 'ws://localhost:8080';
const connection = new WebSocket(url);
let nombreNodo;

rl.question('Ingrese el nombre de su Nodo ', (nombre) => {
  console.log('Used es el nodo: ' + nombre);
  nombreNodo = nombre;
  connection.send(JSON.stringify({ option: 1, nodo: nombreNodo }));
  rl.close();
});

connection.onmessage = (e) => {
  console.log(e.data);
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};
