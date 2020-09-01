const Node = require('./Node');
const readline = require('readline');
const NODE_LIST = [];

let a = new Node('A', {
  'A': {
    'A': {
      cost: 0,
      path: 'A'
    }
  }
});

let b = new Node('B', {
  'B': {
    'B': {
      cost: 0,
      path: 'B'
    }
  }
});

let c = new Node('C', {
  'C': {
    'C': {
      cost: 0,
      path: 'C'
    }
  }
});

let d = new Node('D', {
  'D': {
    'D': {
      cost: 0,
      path: 'D'
    }
  }
});

let e = new Node('E', {
  'E': {
    'E': {
      cost: 0,
      path: 'E'
    }
  }
});

let f = new Node('F', {
  'F': {
    'F': {
      cost: 0,
      path: 'F'
    }
  }
});

let g = new Node('G', {
  'G': {
    'G': {
      cost: 0,
      path: 'G'
    }
  }
});

let h = new Node('H', {
  'H': {
    'H': {
      cost: 0,
      path: 'H'
    }
  }
});

let i = new Node('I', {
  'I': {
    'I': {
      cost: 0,
      path: 'I'
    }
  }
});

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
  node.UpdateRoutingVector();
  node.edges.forEach(dest => {
    dest.ReceivedNewInformation(node.name, node.routingTable[node.name]);
  });
});

NODE_LIST.forEach(node => {
  console.log(node.name);
  console.log(node.routingTable[node.name]);
  console.log('===================')
});

// NODE_LIST.forEach(node => {
//   console.log(`EVALUANDO: ${node.name}`);
//   a.ReceivedNewInformation(node.name, node.routingTable[node.name]);
// })
// a.ReceivedNewInformation('B', b.routingTable['B']);
// a.ReceivedNewInformation('C', c.routingTable['C']);
// a.ReceivedNewInformation('I', i.routingTable['I']);