const Node = require('./nodo');
const Flooding = require('./flooding');

let grafo= [];

let A = new Node((name = 'A'));
A.AddNeighbor(new Node((name = 'B'), (cost = 1)));
A.AddNeighbor(new Node((name = 'C'), (cost = 2)));
grafo.push(A);

let B = new Node((name = 'B'));
B.AddNeighbor(new Node((name = 'A'), (cost = 1)));
B.AddNeighbor(new Node((name = 'E'), (cost = 4)));
B.AddNeighbor(new Node((name = 'C'), (cost = 3)));
B.AddNeighbor(new Node((name = 'D'), (cost = 5)));
grafo.push(B);

let C = new Node((name = 'C'));
C.AddNeighbor(new Node((name = 'A'), (cost = 2)));
C.AddNeighbor(new Node((name = 'B'), (cost = 3)));
C.AddNeighbor(new Node((name = 'D'), (cost = 6)));
grafo.push(C);

let D = new Node((name = 'D'));
D.AddNeighbor(new Node((name = 'C'), (cost = 6)));
D.AddNeighbor(new Node((name = 'B'), (cost = 5)));
D.AddNeighbor(new Node((name = 'E'), (cost = 7)));
grafo.push(D);

let E = new Node((name = 'E'));
E.AddNeighbor(new Node((name = 'B'), (cost = 4)));
E.AddNeighbor(new Node((name = 'D'), (cost = 7)));
grafo.push(E);

const graph = {
    A: { B: 1, C: 2 },
    B: { A: 1, C: 3, D: 5, E: 4 },
    C: { A: 2, B: 3, D: 6 },
    D: { C: 6, B: 3, E: 7 },
    E: { B: 4, D: 7 },
};

message="El mensaje ha llegado";

let flooding = new Flooding();
let hop_count = flooding.contar(graph);
flooding.sendMessage(graph,null,'A', 'D',hop_count-1, message);  