const Node = require('./nodeV2');
const chalk = require('chalk');
const NODE_LIST = [];

let A = new Node('A');
let B = new Node('B');
let C = new Node('C');
let D = new Node('D');
let E = new Node('E');
let F = new Node('F');
let G = new Node('G');
let H = new Node('H');
let I = new Node('I');

NODE_LIST.push(A, B, C, D, E, F, G, H, I);

A.AddNeighbor('B', 7);
A.AddNeighbor('I', 1);
A.AddNeighbor('C', 7);

B.AddNeighbor('A', 7);
B.AddNeighbor('F', 2);

C.AddNeighbor('A', 7);
C.AddNeighbor('D', 5);

D.AddNeighbor('I', 6);
D.AddNeighbor('C', 5);
D.AddNeighbor('E', 1);

E.AddNeighbor('D', 1);
E.AddNeighbor('G', 4);

F.AddNeighbor('G', 3);
F.AddNeighbor('H', 4);
F.AddNeighbor('B', 2);

G.AddNeighbor('E', 4);
G.AddNeighbor('F', 3);

H.AddNeighbor('F', 4);

I.AddNeighbor('A', 1);
I.AddNeighbor('D', 6);


// NODE_LIST.forEach(node => {
//   // Mandar mensaje a vecinos
//   node.SendRoutingVectorToNeighbors();
// });

// NODE_LIST.forEach(node => {
// node.ReceivedNewInformation
// })

// A.ReceivedNewInformation('B', B.routingVector);
// A.ReceivedNewInformation('C', C.routingVector);
// A.ReceivedNewInformation('I', I.routingVector);

// B.ReceivedNewInformation('A', A.routingVector);
// B.ReceivedNewInformation('F', F.routingVector);

// C.ReceivedNewInformation('A', A.routingVector);
// C.ReceivedNewInformation('D', D.routingVector);

// D.ReceivedNewInformation('I', I.routingVector);
// D.ReceivedNewInformation('C', C.routingVector);
// D.ReceivedNewInformation('E', E.routingVector);

// E.ReceivedNewInformation('D', D.routingVector);
// E.ReceivedNewInformation('G', G.routingVector);

// F.ReceivedNewInformation('G', G.routingVector);
// F.ReceivedNewInformation('H', H.routingVector);
// F.ReceivedNewInformation('B', B.routingVector);

// G.ReceivedNewInformation('E', E.routingVector);
// G.ReceivedNewInformation('F', F.routingVector);

// H.ReceivedNewInformation('F', F.routingVector);

// I.ReceivedNewInformation('A', A.routingVector);
// I.ReceivedNewInformation('D', D.routingVector);

// I.ReceivedNewInformation('A', A.routingVector);
// I.ReceivedNewInformation('D', D.routingVector);

// A.ReceivedNewInformation('B', B.routingVector);
// A.ReceivedNewInformation('C', C.routingVector);
// A.ReceivedNewInformation('I', I.routingVector);

// B.ReceivedNewInformation('A', A.routingVector);
// B.ReceivedNewInformation('F', F.routingVector);

// C.ReceivedNewInformation('A', A.routingVector);
// C.ReceivedNewInformation('D', D.routingVector);

// D.ReceivedNewInformation('I', I.routingVector);
// D.ReceivedNewInformation('C', C.routingVector);
// D.ReceivedNewInformation('E', E.routingVector);

// E.ReceivedNewInformation('D', D.routingVector);
// E.ReceivedNewInformation('G', G.routingVector);

// F.ReceivedNewInformation('G', G.routingVector);
// F.ReceivedNewInformation('H', H.routingVector);
// F.ReceivedNewInformation('B', B.routingVector);

// G.ReceivedNewInformation('E', E.routingVector);
// G.ReceivedNewInformation('F', F.routingVector);

// H.ReceivedNewInformation('F', F.routingVector);


// console.log(
//   a.routingVector
// );


NODE_LIST.forEach(node => {
  console.log(chalk.red.bgGrey(`==========| ${node.name} |==========`))
  console.table(node.routingVector);
});

// console.log('\nQUIERO MANDAR UN MENSAJE DE A -> G:\n');
// a.SendMessage('A', 'G', 'Hello world');