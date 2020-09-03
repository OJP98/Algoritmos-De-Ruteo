class Flooding{

    sendMessage(graph,previous, startNode, endNode, hop_count, message){    
        if (endNode == startNode){
            console.log("se envio de ",previous," a ",startNode);
            console.log(message);
        }
        else{
            if( hop_count > 0){
                for (let child in graph[startNode]) {
                    if (previous != child){
                    this.sendMessage(graph,startNode, child, endNode, hop_count-1, message);
                    }
                }
            }            
        }
    }

    contar(graph){
        let hop_count=0;
        for (let child in graph) {
            hop_count=hop_count+1;
        }
        return hop_count;
    }

}
module.exports = Flooding;