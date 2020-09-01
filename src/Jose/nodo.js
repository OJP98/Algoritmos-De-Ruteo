class Node {
  constructor(name = '-', cost = null, neighbor = []) {
    this.name = name;
    this.neighbors = neighbor;
    this.cost = cost;
  }

  /**
   * Actualiza el routing table del nodo cuando se agrega un vecino
   * @param {Node} newNode nodo a agregar como vecino
   * @param {number} cost delay para llegar a este nuevo nodo
   */
  AddNeighbor(newNode) {
    this.neighbors.push(newNode);
  }
}

module.exports = Node;
