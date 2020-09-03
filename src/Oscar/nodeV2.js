class Node {
  constructor(name = '-') {
    this.name = name;
    this.routingVector = {};
    this.routingVector[name] = {
      cost: 0,
      path: name
    }
    this.edges = [];
  }

  /**
   * Actualiza el routing table del nodo cuando se agrega un vecino
   * @param {Node} newNode nodo a agregar como vecino
   * @param {number} cost delay para llegar a este nuevo nodo
   */
  AddNeighbor(nodeName, cost) {
    this.edges.push({ name: nodeName, cost });
    this.routingVector[nodeName] = {
      cost,
      path: nodeName
    };
  }

  /**
   * Actualiza el vector routing en base a un nuevo cálculo.
   * @param {string} nodeName el nombre del vecino
   * @param {number} newDist nuevo delay hacia el vecino
   * @param {string} newPath el nodo (o vecino) por el que hay que pasar para llegar
   */
  UpdateVector(nodeName, newDist, newPath = '') {
    this.routingVector[nodeName] = {
      cost: newDist,
      path: newPath
    }
  }

  /**
   * Actualizar routing vectot en base a la información recibida de otro nodo
   * @param {string} srcName nombre del nodo emisor
   * @param {Object} srcRoutingVector vector de rutas del nodo emisor
   */
  ReceivedNewInformation(srcName, srcRoutingVector) {
    console.log(`${this.name} <==INFO== ${srcName}`);
    var currentDist;
    var path, min, currentDist;

    for (var node in srcRoutingVector) {
      var nodeName = node.toString();

      if (this.routingVector[nodeName]) {
        currentDist = this.routingVector[srcName].cost;
        let evalDist = srcRoutingVector[nodeName].cost;

        if (evalDist + currentDist < this.routingVector[nodeName].cost) {
          path = srcName;
          min = evalDist + currentDist;
          this.UpdateVector(nodeName, min, path);
        }
      } else {
        this.routingVector[nodeName] = {
          cost: srcRoutingVector[nodeName].cost + this.routingVector[srcName].cost,
          path: srcName,
        }
      }
    }
  }


  /**
   * Envía su propia vector a sus vecinos
   */
  SendRoutingVectorToNeighbors() {
    this.edges.forEach(edge => {
      edge.ReceivedNewInformation(this.name, this.routingVector);
    });
  }

  /**
   * Envía de forma recursiva un mensaje a otro nodo
   * @param {string} srcName nombre del que envía el mensaje
   * @param {string} destName nombre del que recibe el mensaje
   * @param {string} message mensaje a enviar
   */
  EvaluateMessage(srcName, destName, message) {
    const nextNode = this.routingVector[destName];
    if (destName === this.name) return message;
    else return this.edges.find(x => x.name === nextNode.path);


  }
}

module.exports = Node;