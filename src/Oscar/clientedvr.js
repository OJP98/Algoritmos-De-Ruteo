const Node = require('./nodeV2');

class ClienteDVR {
  constructor(nodeName, edges) {
    this.node = new Node(nodeName);
    edges.forEach(edge => {
      this.NodeAddNeighbor(edge.name, edge.cost);
    });

    console.log(this.node);
  }

  NodeAddNeighbor(newNode, cost) {
    this.node.AddNeighbor(newNode, cost);
  }

  NodeReceivedRoutingVector(srcName, srcRoutingVector) {
    this.node.ReceivedNewInformation(srcName, srcRoutingVector);
  }

  NodeUpdateRoutingVector() {
    this.node.UpdateRoutingVector();
  }

  NodeRecievedMessage(srcName, destName, message) {
    let result = this.node.EvaluateMessage(srcName, destName, message);

    if (message !== result) this.NodeSendMessage(srcName, destName, message);
    else console.log(`${this.node.name} RECIBE DE ${srcName}: ${result}`);
  }

  get NodeNeighbors() {
    return this.node.edges.map(edge => edge.name);
  }

  get NodeName() {
    return this.node.name;
  }

  GetNodeRoutingVector() {
    return this.node.routingVector;
  }

}

module.exports = ClienteDVR;