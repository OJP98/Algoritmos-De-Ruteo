const WebSocket = require('ws');
const readline = require('readline');
const LSR = require('./lsr');
const ClienteDVR = require('../Oscar/clientedvr');
const rl = readline.createInterface(process.stdin, process.stdout);

const { fork } = require('child_process');
const { truncate } = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
let processFork;

// ? Se define la url del servidor
if (process.argv[2] === undefined) {
  var url = 'ws://localhost:4200';
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
  connection.send(
    JSON.stringify({
      option: 1,
      nodo: nombreNodo,
    })
  );
  rl.close();
});

let GrafoCompleto;
//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos flooding

function EnviarMensajeFlooding(mensaje) {
  console.log(mensaje.Grafo);
  processFork = fork('./getInput.js');
  processFork.send('servidor');

  processFork.on('message', (message) => {
    if (message.option === 0) process.exit();
    console.log(`Destino ${message.destino}`);
    console.log(`Mensaje ${message.mensaje}`);

    const objeto = {
      option: 5,
      NodoPrevio: null,
      NodoInicio: nombreNodo,
      NodoFin: message.destino,
      mensaje: message.mensaje,
      hopCount: 5,
    };

    connection.send(JSON.stringify(objeto));
  });
}

function ReplicarFlooding(mensaje) {
  if (!(mensaje.NodoFin === nombreNodo)) {
    if (mensaje.hopCount > 0) {
      const objeto = {
        option: 5,
        NodoPrevio: mensaje.NodoPrevio,
        NodoInicio: mensaje.NodoInicio,
        NodoFin: mensaje.NodoFin,
        mensaje: mensaje.mensaje,
        hopCount: mensaje.hopCount - 1,
      };
      console.log('Se envio de ', mensaje.NodoPrevio, ' a', nombreNodo);
      console.log('Quedan ', mensaje.hopCount, ' saltos');
      connection.send(JSON.stringify(objeto));
    }
    console.log('Se envio de ', mensaje.NodoPrevio, ' a', nombreNodo);
    console.log('Quedan ', mensaje.hopCount, ' saltos');
  } else {
    console.log('Se envio de ', mensaje.NodoPrevio, ' a', nombreNodo);
    console.log('Quedan ', mensaje.hopCount, ' saltos');
    console.log('');
    console.log(mensaje.mensaje);
    console.log('');
  }
}

function LogMensaje(objeto) {
  if (objeto.NodoFin === nombreNodo) {
    console.log(`
  Nodo Fuente: ${objeto.NodoInicio}
  Nodo Destino: ${objeto.NodoFin}
  Saltos Recorridos: ${objeto.ruta.indexOf(nombreNodo) + 1}/${
      objeto.ruta.length
    }
  Distancia Total: ${objeto.distanciaTotal}
  Mensaje: ${objeto.mensaje}
  `);
  } else {
    console.log(`
  Nodo Fuente: ${objeto.NodoInicio}
  Nodo Destino: ${objeto.NodoFin}
  Saltos Recorridos: ${objeto.ruta.indexOf(nombreNodo) + 1}/${
      objeto.ruta.length
    }
  Distancia Total: ${objeto.distanciaTotal}
  `);
  }
}

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

function ExplorarNodo(mensaje) {
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
  if (nextNodo === false) {
    //? Fin del algoritmo
    console.log('Fin del algoritmo');
    connection.send(
      JSON.stringify({
        option: 4,
        Grafo: mensaje.GrafoLImitado,
      })
    );
  } else {
    connection.send(
      JSON.stringify({
        option: 3,
        nextNodo,
        NodoInicio: mensaje.NodoInicio,
        NodoFin: mensaje.NodoFin,
      })
    );
  }
}

function GuardarGrafo(mensaje) {
  GrafoCompleto = mensaje.Grafo;
  processFork = fork('./getInput.js');
  processFork.send('servidor');

  processFork.on('message', (message) => {
    if (message.option === 0) process.exit();
    console.log(`Destino ${message.destino}`);
    console.log(`Mensaje ${message.mensaje}`);

    const ruta = LinkAlgorithm.findShortestPath(
      GrafoCompleto,
      nombreNodo,
      message.destino
    );
    const objeto = {
      option: 5,
      NodoInicio: nombreNodo,
      NodoFin: message.destino,
      mensaje: message.mensaje,
      ruta: ruta.path,
      distanciaTotal: ruta.distance,
      nextNodo: ruta.path[1],
    };

    connection.send(JSON.stringify(objeto));
    LogMensaje(objeto);
  });
}

function ReplicarMensaje(mensaje) {
  if (!(mensaje.NodoFin === nombreNodo)) {
    const objeto = {
      option: 5,
      NodoInicio: mensaje.NodoInicio,
      NodoFin: mensaje.NodoFin,
      mensaje: mensaje.mensaje,
      ruta: mensaje.ruta,
      distanciaTotal: mensaje.distanciaTotal,
      nextNodo: mensaje.ruta[mensaje.ruta.indexOf(nombreNodo) + 1],
    };

    connection.send(JSON.stringify(objeto));
    LogMensaje(objeto);
  } else {
    LogMensaje(mensaje);
  }
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
let algoritmoUsado;

function LogMensaje(objeto) {
  if (objeto.NodoFin === nombreNodo) {
    console.log(`
  Nodo Fuente: ${objeto.NodoInicio}
  Nodo Destino: ${objeto.NodoFin}
  Ruta: ${objeto.ruta}
  Saltos Recorridos: ${objeto.ruta.indexOf(nombreNodo) + 1}/${
      objeto.ruta.length
    }
  Distancia Total: ${objeto.distanciaTotal}
  Mensaje: ${objeto.mensaje}
  `);
  } else {
    console.log(`
  Nodo Fuente: ${objeto.NodoInicio}
  Nodo Destino: ${objeto.NodoFin}
  Ruta: ${objeto.ruta}
  Saltos Recorridos: ${objeto.ruta.indexOf(nombreNodo) + 1}/${
      objeto.ruta.length
    }
  Distancia Total: ${objeto.distanciaTotal}
  `);
  }
}

function InterpretarMensaje(mensaje) {
  if (mensaje.option === 1) {
    // ? Conectar
    algoritmoUsado = mensaje.algoritmo;

    if (algoritmoUsado === 2) {
      // Crear nuevo cliente
      clienteDvr = new ClienteDVR(mensaje.nodo, mensaje.vecinos);
    }
  } else if (mensaje.option === 2) {
    if (algoritmoUsado === 1) {
      EnviarMensajeFlooding(mensaje);
    }

    if (algoritmoUsado === 2) {
      // Enviar mensaje a cada vecino
      clienteDvr.NodeNeighbors.forEach((vecino) => {
        connection.send(
          JSON.stringify({
            option: 2,
            srcName: clienteDvr.NodeName,
            destName: vecino,
            routingVector: clienteDvr.GetNodeRoutingVector(),
          })
        );
      });
    }

    // ? Iniciar algoritmo
    if (algoritmoUsado === 3) {
      IniciarAlgoritmo(mensaje);
    }
  } else if (mensaje.option === 3) {
    if (algoritmoUsado === 2) {
      // Recibir y actualizar RV
      clienteDvr.NodeReceivedRoutingVector(
        mensaje.srcName,
        mensaje.routingVector
      );
      console.table(clienteDvr.GetNodeRoutingVector());
    }

    // ? Explorar nuevo nodo
    if (algoritmoUsado === 3) {
      ExplorarNodo(mensaje);
    }
  } else if (mensaje.option === 4) {
    // ? Servidor envia grafo
    if (algoritmoUsado === 3) {
      GuardarGrafo(mensaje);
    }
  } else if (mensaje.option === 5) {
    // ? Enviar Mensaje
    if (algoritmoUsado === 3) {
      console.log(mensaje);
      ReplicarMensaje(mensaje);
    }
  } else if (mensaje.option === 6) {
    if (algoritmoUsado === 1) {
      ReplicarFlooding(mensaje);
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
    error,
  });
};
