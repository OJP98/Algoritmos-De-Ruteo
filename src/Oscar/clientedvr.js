const Node = require('./node');

class ClienteDVR {
  constructor(nodeName, edges) {
    this.node = new Node(nodeName);
  }

  NodeAddNeighbor(newNode, cost) {
    this.node.AddNeighbor(newNode, cost);
  }

  NodeSendRoutingVectorToNeighbors() {
    this.node.edges.forEach(edge => {
      // TODO: Mandar routingvector al server
    });
  }

  NodeSendMessage(srcName, destName, message) {
    // TODO: Enviar mensaje con ayuda de server
  }

  NodeReceivedRoutingVector(srcName, srcRoutingVector) {
    this.node.ReceivedNewInformation(srcName, srcRoutingVector);
    this.NodeSendRoutingVectorToNeighbors();
  }

  NodeUpdateRoutingVector() {
    this.node.UpdateRoutingVector();
  }

  NodeRecievedMessage(srcName, destName, message) {
    let result = this.node.EvaluateMessage(srcName, destName, message);

    if (message !== result) this.NodeSendMessage(srcName, destName, message);
    else console.log(`${this.node.name} RECIBE DE ${srcName}: ${result}`);
  }

  PrintNode(node) {
    console.log({
      node
    });
  }
}

module.exports = ClienteDVR;