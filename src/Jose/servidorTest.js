var server = require('ws').Server;
const CLIENT_READY = require('ws').OPEN;
const ServerDVR = require('../Oscar/serverdvr');
const readline = require('readline');
const Node = require('./nodo');
const chalk = require('chalk');
const fs = require('fs');
const csv = require('csv-parser');
const rl = readline.createInterface(process.stdin, process.stdout);

// ? Se define el puerto del servidor
if (process.argv[2] === undefined) {
  var s = new server({
    port: 4200,
  });
} else {
  var s = new server({
    port: process.argv[2],
  });
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
let algoritmoUsado;
let Grafo = [];
var dvr;
var clientesDvr = {};
// ? Se lee el csv con la informacion del grafo
let GrafoCSV = {};
//fs.createReadStream('grafo.csv')
fs.createReadStream('src/Jose/grafo_lab.csv')
  .pipe(csv())
  .on('data', function (row) {
    if (GrafoCSV[row.Nodo1] === undefined) {
      // ! no existe nodo en grafo
      GrafoCSV[row.Nodo1] = {};
    }
    GrafoCSV[row.Nodo1][row.Nodo2] = row.Peso;
  })
  .on('end', function () {
    // ! Se termina la lectura del CSV
    console.log(GrafoCSV);
    // ? Se define el algoritmo a usar
    rl.question(
      'Ingrese que algoritmo usar: \n 1. Flooding \n 2. Distance vector routing \n 3. Link state routing \n >',
      (algoritmo) => {
        if (algoritmo == 1) {
          console.log('Usando Flooding...');
          ArmarObjetoGrafo(GrafoCSV);
          algoritmoUsado = 1;
        } else if (algoritmo == 2) {
          console.log('Usando Distance vector routing...');
          algoritmoUsado = 2;
          // dvr = new ServerDvr();
          dvr = new ServerDVR(GrafoCSV);
          clientesDvr = {};
        } else if (algoritmo == 3) {
          console.log('Usando Link state routing...');
          //Aqui
          ArmarObjetoGrafo(GrafoCSV);
          algoritmoUsado = 3;
        } else {
          console.log('Usando Flooding...');
          algoritmoUsado = 1;
        }
        rl.close();
      }
    );
    // ? FIN Se define el algoritmo a usar
  });

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

let NodosActuales = {};
let nodosVisitados = [];
let GrafoChico = [];

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos Flooding
let Grafito = [];

function HabilitarMensajesFlooding(cantidad) {
  for (var key in GrafoCSV) {
    NodosActuales[key].send(
      JSON.stringify({
        option: 2,
        hopCount: cantidad,
        Grafo: 'ahi vamos',
      })
    );
  }
}

function UsarFlooding(mensaje) {
  let vecinitos = GrafoCSV[mensaje.NodoInicio];
  for (var key in vecinitos) {
    if (key != mensaje.NodoPrevio) {
      let distancias = parseInt(mensaje.Distancia) + parseInt(vecinitos[key]);
      const objeto = {
        option: 6,
        NodoPrevio: mensaje.NodoInicio,
        NodosUsados: mensaje.NodosUsados,
        NodoInicio: key,
        NodoFin: mensaje.NodoFin,
        Distancia: distancias,
        mensaje: mensaje.mensaje,
        NodoEmisor: mensaje.NodoEmisor,
        hopCount: mensaje.hopCount - 1,
      };
      NodosActuales[key].send(JSON.stringify(objeto));
    }
  }
}
//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************
// ? Metodos Link

function ArmarObjetoGrafo(GrafoCSV) {
  Object.keys(GrafoCSV).forEach((NombreNodo) => {
    let Nodo = new Node((name = NombreNodo));
    Object.keys(GrafoCSV[NombreNodo]).forEach((NeighborName) => {
      Nodo.AddNeighbor(
        new Node(
          (name = NeighborName),
          (cost = parseInt(GrafoCSV[NombreNodo][NeighborName]))
        )
      );
    });
    Grafo.push(Nodo);
  });
  console.log(Grafo);
}

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
  console.log(nuevoGrafo);
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

function IniciarAlgoritmo(NodoInicio, NodoFin) {
  GrafoChico.push(GetGrafoLimitada(NodoInicio));
  nodosVisitados.push(NodoInicio);
  NodosActuales[NodoInicio].send(
    JSON.stringify({
      option: 2,
      NodoInicio,
      NodoFin,
      GrafoLImitado: ConvertToJSON(GrafoChico),
      nodosVisitados,
    })
  );
}

function VisitarNuevoNodo(nodoAVisita, NodoInicio, NodoFin) {
  GrafoChico.push(GetGrafoLimitada(nodoAVisita));
  nodosVisitados.push(nodoAVisita);
  NodosActuales[nodoAVisita].send(
    JSON.stringify({
      option: 3,
      NodoInicio,
      NodoFin,
      GrafoLImitado: ConvertToJSON(GrafoChico),
      nodosVisitados,
    })
  );
}

function EnviarGrafo(mensaje) {
  Object.keys(NodosActuales).forEach((element) => {
    NodosActuales[element].send(
      JSON.stringify({
        option: 4,
        Grafo: mensaje.Grafo,
      })
    );
  });
}

function EnviarMensaje(mensaje) {
  NodosActuales[mensaje.nextNodo].send(JSON.stringify(mensaje));
}

//**********************************************************************************************
//**********************************************************************************************
//**********************************************************************************************

// ? Metodos compartidos

function InterpretarMensaje(mensaje, cliente) {
  if (mensaje.option === 1) {

    if (algoritmoUsado === 2) {

      if (Object.keys(clientesDvr).length >= 9) return;
      // dvr brinda nodo disponible
      let nuevoNodo = dvr.NewClientConnected(mensaje.nodo);

      // Cliente se agrega a mi diccionario de clientes.
      clientesDvr[nuevoNodo[0]] = cliente;

      // Enviamos a cliente opcion, algoritmo y nodo correspondiente.
      cliente.send(
        JSON.stringify({
          option: 1,
          algoritmo: algoritmoUsado,
          nodo: nuevoNodo[0],
          vecinos: nuevoNodo[1],
        })
      );

      // Si todos están listos, enviar opción 2
      if (Object.keys(clientesDvr).length === 9) {
        var counter = 0;

        const interval = setInterval(function () {
          s.clients.forEach(function each(client) {
            if (client.readyState === CLIENT_READY) {
              client.send(
                JSON.stringify({
                  option: 2,
                })
              );
            }
          });

          counter += 1;
          if (counter > 3) clearInterval(interval);
        }, 200);

        // Enviarle a todos que estamos listos
        s.clients.forEach(function each(client) {
          if (client.readyState === CLIENT_READY) {
            client.send(
              JSON.stringify({
                option: 7,
              })
            );
          }
        });
      }
    } else {
      NodosActuales[mensaje.nodo] = cliente;
      cliente.send(
        JSON.stringify({
          option: 1,
          algoritmo: algoritmoUsado,
        })
      );

      if (Object.keys(NodosActuales).length === Object.keys(GrafoCSV).length) {
        if (algoritmoUsado === 1) {
          HabilitarMensajesFlooding(Object.keys(GrafoCSV).length);
        }
        // ! Comienza algoritmo para recorrer el grafo
        if (algoritmoUsado === 3) {
          IniciarAlgoritmo('A', 'H');
        }
      }
    }
    // ! nueva conexion

  } else if (mensaje.option === 2) {
    if (algoritmoUsado === 2) {
      let destName = mensaje.destName;
      let srcName = mensaje.srcName;
      let routingVector = mensaje.routingVector;
      let destClient = clientesDvr[destName];

      if (destClient == null) return;

      destClient.send(
        JSON.stringify({
          option: 3,
          srcName,
          routingVector,
        })
      );
    }
  } else if (mensaje.option === 3) {
    //! Explorar nuevo nodo

    if (algoritmoUsado === 3) {
      console.log(mensaje);
      VisitarNuevoNodo(mensaje.nextNodo, mensaje.NodoInicio, mensaje.NodoFin);
    }
  } else if (mensaje.option === 4) {
    //! Fin de algoritmo
    if (algoritmoUsado === 3) {
      EnviarGrafo(mensaje);
    }
  } else if (mensaje.option === 5) {
    if (algoritmoUsado === 1) {
      UsarFlooding(mensaje);
    }
    //! Enviar mensaje
    if (algoritmoUsado === 3) {
      console.log(mensaje);
      EnviarMensaje(mensaje);
    }

    if (algoritmoUsado === 2) {
      clientesDvr[mensaje.ruta].send(
        JSON.stringify(mensaje)
      );
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
  // console.log(Grafo);
  console.log(GrafoCSV);
});