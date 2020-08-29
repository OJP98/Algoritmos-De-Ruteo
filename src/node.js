class Node {
  constructor(name = '-', routingTable = {}, edges = []) {
    this.name = name;
    this.routingTable = routingTable;
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
    this.routingTable[nodeName] = {}
    this.routingTable[this.name][nodeName] = {
      cost,
      path: ''
    };
  }

  /**
   * Actualiza el vector routing en base a un nuevo cálculo.
   * @param {string} edgeName el nombre del vecino
   * @param {number} newDist nuevo delay hacia el vecino
   * @param {string} newPath el nodo (o vecino) por el que hay que pasar para llegar
   */
  UpdateEdge(edgeName, newDist, newPath = '') {
    this.routingTable[this.name][edgeName].cost = newDist;
    this.routingTable[this.name][edgeName].path = newPath;
  }

  /**
   * Actualizar routing table en base a la información recibida de otro nodo
   * @param {string} srcName nombre del nodo emisor
   * @param {Object} srcRoutingTable vector de rutas del nodo emisor
   */
  ReceivedNewInformation(srcName, srcRoutingTable) {
    console.log(`${this.name} <==INFO== ${srcName}`);
    console.log(srcRoutingTable);
  }

  // TODO: Implementar este método del lado del nodo/cliente
  UpdateVectorRouting() {
    const srcName = this.name;
    const srcRoutingTable = this.routingTable[srcName];
    var path, min, srcDistToDest;

    this.edges.forEach(edge => {

      const edgeName = edge.name;
      const edgeRoutingTable = edge.routingTable;
      const srcDistToEdge = srcRoutingTable[edgeName].cost;

      edge.edges.forEach(dest => {
        if (dest.name != this.name) {
          let destName = dest.name;
          let edgeDistToDest = edgeRoutingTable[edgeName][destName];
          srcDistToDest = srcRoutingTable[destName];

          if (srcDistToEdge + edgeDistToDest.cost <= srcDistToDest.cost) {
            min = srcDistToEdge + edgeDistToDest.cost;
            path = edgeName;
          } else {
            min = srcDistToDest.cost;
            path = destName;
          }
          this.UpdateEdge(destName, min, path);
        }
      });
    });

    console.log(this.routingTable[this.name]);
  }
}

module.exports = Node;