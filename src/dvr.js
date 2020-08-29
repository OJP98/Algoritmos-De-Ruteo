const Node = require('./Node');
const readline = require('readline');
const NODE_LIST = [];

// TODO: Mover esta función para que sea propia de la clase nodo
function UpdateVectorRouting(node) {
  const edges = node.edges;
  const srcName = node.name;
  const srcRoutingTable = node.routingTable[srcName];
  var path;
  var srcDistToDest;

  edges.forEach(edge => {

    const edgeName = edge.name;
    const edgeRoutingTable = edge.routingTable;
    const srcDistToEdge = srcRoutingTable[edgeName].cost;

    edge.edges.forEach(dest => {
      if (dest.name != node.name) {
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

        node.UpdateEdge(destName, min, path);
      }
    });
  });

  edges.forEach(edge => {
    SendRoutingTable(srcName, edge.name, srcRoutingTable);
  });

  d.ReceivedNewInformation(srcName, srcRoutingTable);
}

// Server debería de encargarse de enviar info. a nodo especificado
function SendRoutingTable(srcName, destName, routingTable) {
  // TODO: Enviar la información con sockets
  console.log(`${srcName} ==INFO==> ${destName}`);
}

let a = new Node('A', {
  'A': {
    'A': {
      cost: 0,
      path: ''
    }
  }
});

let b = new Node('B', {
  'B': {
    'B': {
      cost: 0,
      path: ''
    },
    'D': {
      cost: Infinity,
      path: ''
    }
  }
});

let c = new Node('C', {
  'C': {
    'C': {
      cost: 0,
      path: ''
    }
  }
});

let d = new Node('D', {
  'D': {
    'B': {
      cost: Infinity,
      path: ''
    },
    'D': {
      cost: 0,
      path: ''
    }
  }
});

NODE_LIST.push(a, b, c, d);
a.AddNeighbor(b, 2);
a.AddNeighbor(c, 5);
a.AddNeighbor(d, 1);

b.AddNeighbor(a, 2);
b.AddNeighbor(c, 1);

c.AddNeighbor(a, 5);
c.AddNeighbor(b, 1);
c.AddNeighbor(d, 1);

d.AddNeighbor(a, 1);
d.AddNeighbor(c, 1);

UpdateVectorRouting(a);