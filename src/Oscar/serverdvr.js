const Node = require('./node');

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

    this.a.AddNeighbor(this.b, 7);
    this.a.AddNeighbor(this.i, 1);
    this.a.AddNeighbor(this.c, 7);

    this.b.AddNeighbor(this.a, 7);
    this.b.AddNeighbor(this.f, 2);

    this.c.AddNeighbor(this.a, 7);
    this.c.AddNeighbor(this.d, 5);

    this.d.AddNeighbor(this.i, 6);
    this.d.AddNeighbor(this.c, 5);
    this.d.AddNeighbor(this.e, 1);

    this.e.AddNeighbor(this.d, 1);
    this.e.AddNeighbor(this.g, 4);

    this.f.AddNeighbor(this.g, 3);
    this.f.AddNeighbor(this.h, 4);
    this.f.AddNeighbor(this.b, 2);

    this.g.AddNeighbor(this.e, 4);
    this.g.AddNeighbor(this.f, 3);

    this.h.AddNeighbor(this.f, 4);

    this.i.AddNeighbor(this.a, 1);
    this.i.AddNeighbor(this.d, 6);

    this.availableNodes.push(
      this.a,
      this.b,
      this.c,
      this.d,
      this.e,
      this.f,
      this.g,
      this.h,
      this.i
    );
  }

  NewClientConnected() {
    let newNode = this.availableNodes.shift();
    this.grafo.push({
      newNode: new Node(newNode)
    });
    return newNode;
  }
}

module.exports = ServerDVR;