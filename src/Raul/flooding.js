class Node {
    constructor(name = '-', edges) {
      this.name = name;
      this.edges = edges;
    }

    sendMessage(startNode, endNode, hop_count, message) {
        if(this.name == endNode){
            console.log(message);
        }
        else{
            for (let child in this.edges) {
                console.log(child);
              }
        }
    }
}

const sendMessage = (graph, startNode, endNode, hop_count, message, already_sent=[]) => {
    if (endNode == startNode){
        console.log(message);
    }
    else{
        if( hop_count > 0){
            for (let child in graph[startNode]) {
                console.log("se envia de ",startNode," a ",child);
                sendMessage(graph, child, endNode, hop_count-1, message, already_sent);
            }
        }
        else{
            console.log("Se acabaron los saltos")
        }
        
    }
};

const sendMessageEff = (graph, startNode, endNode, hop_count, message, already_sent=[]) => {
    if (endNode == startNode){
        console.log(message);
        console.log(already_sent);
    }
    else{
        if(hop_count > 0){
            for (let child in graph[startNode]) {
                if(!(already_sent.includes(child))){
                    console.log("de ",startNode," a ",child)
                    already_sent.push(startNode);
                    sendMessageEff(graph, child, endNode, hop_count-1, message, already_sent);
                }
            }
        }
        else{
            console.log("Se acabaron los saltos")
        }
        
    }
}
  
const graph = {
    A: { B: 7, C: 7, I: 1 },
    B: { A: 7, F: 2 },
    C: { A: 7, D: 5 },
    D: { C: 5, I: 6, E: 1, F: 2 },
    E: { G: 4, D: 1 },
    F: { B: 2, D: 2, G: 3, H: 4},
    G: { F: 3, E: 4},
    H: { F: 4},
    I: { A: 1, D: 6}
};

let hop_count = 0;

for (let child in graph) {
    hop_count=hop_count+1;
}


let a = new Node ('A', { B: 7, C: 7, I: 1 });
let b = new Node ('B', { A: 7, F: 2 });
let c = new Node ('C', { A: 7, D: 5 });
let d = new Node ('D', { C: 5, I: 6, E: 1, F: 2 });
let e = new Node ('E', {G: 4, D: 1 });
let f = new Node ('F', { B: 2, D: 2, G: 3, H: 4});
let g = new Node ('G', { F: 3, E: 4});
let h = new Node ('H', { F: 4});
let i = new Node ('I', { A: 1, D: 6});

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);
console.log(i);

message="El mensaje ha llegado";
//sendMessageEff('I', 'H',hop_count-1, message);  