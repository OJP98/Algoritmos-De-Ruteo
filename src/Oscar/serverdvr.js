const Node = require('./nodeV2');

class ServerDVR {

  constructor(csvObject) {
    this.grafo = {};
    this.availableNodes = [];
    this.CreateAllNodes(csvObject);
  }

  CreateAllNodes(csvObject = null) {
    if (csvObject == null) return;

    Object.keys(csvObject).forEach(nodeName => {

      let node = new Node(nodeName);

      Object.keys(csvObject[nodeName]).forEach(edge => {
        node.AddNeighbor(edge, parseInt(csvObject[nodeName][edge]))
      });

      this.availableNodes.push(node);
    });
  }

  NewClientConnected(nodeRequested = null) {
    if (nodeRequested == null) return;

    let newNode = this.availableNodes.find(node => {
      return node.name === nodeRequested;
    });

    if (newNode == undefined) newNode = this.availableNodes.pop();

    this.grafo[newNode.name] = newNode;
    this.availableNodes.pop(newNode);
    console.log('EL GRAFO DEL SERVER AHORA ES: ');
    console.table(this.grafo);
    return [newNode.name, newNode.edges];
  }

}

module.exports = ServerDVR;