const fs = require('fs');
const csv = require('csv-parser');
const Node = require('./nodo');

GrafoCSV = {};
fs.createReadStream('grafo.csv')
  .pipe(csv())
  .on('data', function (row) {
    if (GrafoCSV[row.Nodo1] === undefined) {
      // ! no existe nodo en grafo
      GrafoCSV[row.Nodo1] = {};
    }
    GrafoCSV[row.Nodo1][row.Nodo2] = row.Peso;
  })
  .on('end', function () {
    ArmarObjetoGrafo(GrafoCSV);
  });
let Grafo = [];
function ArmarObjetoGrafo(GrafoCSV) {
  Object.keys(GrafoCSV).forEach((NombreNodo) => {
    let Nodo = new Node((name = NombreNodo));
    Object.keys(GrafoCSV[NombreNodo]).forEach((NeighborName) => {
      Nodo.AddNeighbor(
        new Node(
          (name = NeighborName),
          (cost = GrafoCSV[NombreNodo][NeighborName])
        )
      );
    });
    Grafo.push(Nodo);
  });
  console.log(Grafo);
}
