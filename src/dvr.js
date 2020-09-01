const Node = require('./Node');
const readline = require('readline');
const NODE_LIST = [];

let a = new Node('A');

let b = new Node('B');

let c = new Node('C');

let d = new Node('D');

let e = new Node('E');

let f = new Node('F');

let g = new Node('G');

let h = new Node('H');

let i = new Node('I');

NODE_LIST.push(a, b, c, d, e, f, g, h, i);

a.AddNeighbor(b, 7);
a.AddNeighbor(i, 1);
a.AddNeighbor(c, 7);

b.AddNeighbor(a, 7);
b.AddNeighbor(f, 2);

c.AddNeighbor(a, 7);
c.AddNeighbor(d, 5);

d.AddNeighbor(i, 6);
d.AddNeighbor(c, 5);
d.AddNeighbor(e, 1);

e.AddNeighbor(d, 1);
e.AddNeighbor(g, 4);

f.AddNeighbor(g, 3);
f.AddNeighbor(h, 4);
f.AddNeighbor(b, 2);

g.AddNeighbor(e, 4);
g.AddNeighbor(f, 3);

h.AddNeighbor(f, 4);

i.AddNeighbor(a, 1);
i.AddNeighbor(d, 6);

NODE_LIST.forEach(node => {
  // Actualizar el nodo
  node.UpdateRoutingVector();

  // Mandar información a vecinos
  node.edges.forEach(dest => {
    dest.ReceivedNewInformation(node.name, node.routingVector);
  });
});

NODE_LIST.forEach(node => {
  console.log(node.name);
  console.log(node.routingVector);
  console.log('===================')
});