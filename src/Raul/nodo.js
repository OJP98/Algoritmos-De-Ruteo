class Node {

    constructor(name = '-', cost = null, neighbor = []) {
        this.name = name;
        this.neighbors = neighbor;
        this.cost = cost;
    }
    
    AddNeighbor(newNode) {
      this.neighbors.push(newNode);
    }

}

module.exports = Node;