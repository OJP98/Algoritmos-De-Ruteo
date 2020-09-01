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
message="El mensaje ha llegado";
sendMessageEff(graph, 'I', 'H',hop_count-1, message);  