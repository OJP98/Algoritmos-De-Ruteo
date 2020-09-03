const fs = require('fs');
const csv = require('csv-parser');


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
    console.log(GrafoCSV);
  });


