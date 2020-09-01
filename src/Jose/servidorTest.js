var server = require('ws').Server;
const readline = require('readline');
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

function InterpretarMensaje(mensaje, cliente) {
  if (mensaje.option === 1) {
    // nueva conexion
    NodosActuales[mensaje.nodo] = cliente;
    cliente.send(JSON.stringify({ option: 1, algoritmo: algoritmoUsado }));
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
});
