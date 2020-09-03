const Node = require('./nodeV2');

class ServerDVR {

  constructor() {
    this.grafo = {};
    this.availableNodes = []
    this.a = new Node('A');
    this.b = new Node('B');
    this.c = new Node('C');
    this.d = new Node('D');
    this.e = new Node('E');
    this.f = new Node('F');
    this.g = new Node('G');
    this.h = new Node('H');
    this.i = new Node('I');

    this.a.AddNeighbor('B', 7);
    this.a.AddNeighbor('I', 1);
    this.a.AddNeighbor('C', 7);

    this.b.AddNeighbor('A', 7);
    this.b.AddNeighbor('F', 2);

    this.c.AddNeighbor('A', 7);
    this.c.AddNeighbor('D', 5);

    this.d.AddNeighbor('I', 6);
    this.d.AddNeighbor('C', 5);
    this.d.AddNeighbor('E', 1);

    this.e.AddNeighbor('D', 1);
    this.e.AddNeighbor('G', 4);

    this.f.AddNeighbor('G', 3);
    this.f.AddNeighbor('H', 4);
    this.f.AddNeighbor('B', 2);

    this.g.AddNeighbor('E', 4);
    this.g.AddNeighbor('F', 3);

    this.h.AddNeighbor('F', 4);

    this.i.AddNeighbor('A', 1);
    this.i.AddNeighbor('D', 6);

    this.availableNodes.push(
      this.a,
      this.b,
      this.c,
      this.d,
      this.e,
      this.f,
      this.g,
      this.h,
      this.i,
    );
  }

  NewClientConnected() {
    let newNode = this.availableNodes.shift();
    this.grafo[newNode.name] = newNode;

    console.log('EL GRAFO DEL SERVER AHORA ES: ');
    console.table(this.grafo);
    return [newNode.name, newNode.edges];
  }
}

module.exports = ServerDVR;