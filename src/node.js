class Node {
  constructor(name = '-', routingVector = {}, edges = []) {
    this.name = name;
    this.routingVector = routingVector;
    this.edges = edges;
  }

  /**
   * Actualiza el routing table del nodo cuando se agrega un vecino
   * @param {Node} newNode nodo a agregar como vecino
   * @param {number} cost delay para llegar a este nuevo nodo
   */
  AddNeighbor(newNode, cost) {
    let nodeName = newNode.name;
    this.edges.push(newNode);
    this.routingVector[nodeName] = {
      cost,
      path: nodeName
    };
  }

  /**
   * Actualiza el vector routing en base a un nuevo cálculo.
   * @param {string} edgeName el nombre del vecino
   * @param {number} newDist nuevo delay hacia el vecino
   * @param {string} newPath el nodo (o vecino) por el que hay que pasar para llegar
   */
  UpdateEdge(edgeName, newDist, newPath = '') {
    this.routingVector[edgeName] = {
      cost: newDist,
      path: newPath
    }
  }

  /**
   * Actualizar routing table en base a la información recibida de otro nodo
   * @param {string} srcName nombre del nodo emisor
   * @param {Object} srcRoutingVector vector de rutas del nodo emisor
   */
  ReceivedNewInformation(srcName, srcRoutingVector) {
    console.log(`${this.name} <==INFO== ${srcName}`);
    var myRoutingVector = this.routingVector;
    var currentDist;
    var path, min, currentDist;

    for (var node in srcRoutingVector) {
      var nodeName = node.toString();

      if (myRoutingVector[nodeName]) {
        currentDist = myRoutingVector[srcName].cost;
        let evalDist = srcRoutingVector[nodeName].cost;

        if (evalDist + currentDist < myRoutingVector[nodeName].cost) {
          path = srcRoutingVector[nodeName].path;
          min = evalDist + currentDist;
          this.UpdateEdge(nodeName, min, path);
        }
      } else {
        this.routingVector[nodeName] = {
          cost: srcRoutingVector[nodeName].cost + myRoutingVector[srcName].cost,
          path: srcName,
        }
      }
    }
  }

  /**
   * Actualiza su tabla en base a los vecinos que tiene.
   */
  UpdateRoutingVector() {
    const srcName = this.name;
    const srcRoutingVector = this.routingVector;
    var path, min, srcDistToDest;

    this.edges.forEach(edge => {

      const edgeName = edge.name;
      const edgeRoutingVector = edge.routingVector;
      const srcDistToEdge = srcRoutingVector[edgeName].cost;

      edge.edges.forEach(dest => {
        if (dest.name != this.name) {
          let destName = dest.name;
          let edgeDistToDest = edgeRoutingVector[destName];

          if (!srcRoutingVector[destName])
            srcDistToDest = Infinity;
          else
            srcDistToDest = srcRoutingVector[destName].cost;

          if (srcDistToEdge + edgeDistToDest.cost <= srcDistToDest) {
            min = srcDistToEdge + edgeDistToDest.cost;
            path = edgeName;
            this.UpdateEdge(destName, min, path);
          } else if (destName in Object.keys(this.edges)) {
            min = srcDistToDest;
            path = destName;
            this.UpdateEdge(destName, min, path);
          }

        }
      });
    });

    // console.log(this.routingVector);
  }

  SendRoutingVectorToNeighbors() {
    this.edges.forEach(edge => {
      console.log(`${this.name} ==INFO=> ${edge.name}`);
    });
  }
}

module.exports = Node;