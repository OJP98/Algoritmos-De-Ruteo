const Node = require('./node');

class ClienteDVR {
  constructor(node) {
    this.node = node;
    console.log({
      node
    });
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
}

module.exports = ClienteDVR;