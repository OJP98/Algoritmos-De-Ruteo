const sendMessage = (graph, startNode, endNode, hop_count, already_sent, message) => {
    console.log('Estamos en el nodo ',startNode)
    if (startNode != endNode && hop_count>0){
        hop_count= hop_count-1;
        already_sent.push(startNode);
        for (let child in graph[startNode]) {
            if (!(already_sent.includes(child))){
                console.log('El mensaje es enviado desde ', startNode, ' hacia ', child );
                sendMessage(graph, child, endNode, hop_count, already_sent, message)
            }else{
                console.log('El mensaje ya ha sido enviado desde ', child, ' hacia ', startNode)
            }
        }
    }else{
        if(hop_count==0){
            console.log("El mensaje aún no ha llegado pero se acabaron los saltos");
        }
        if(startNode==endNode){
            console.log(message)
        }
    }
};
  
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
console.log(hop_count)
already_sent = []
message="El mensaje ha llegado";
const shortestPath = sendMessage(graph, 'A', 'H',hop_count,already_sent, message);  