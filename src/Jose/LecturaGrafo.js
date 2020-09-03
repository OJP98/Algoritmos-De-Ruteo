const fs = require('fs');
const csv = require('csv-parser');

function LecturaGrafo() {
  Grafo = {};
  fs.createReadStream('grafo.csv')
    .pipe(csv())
    .on('data', function (row) {
      if (Grafo[row.Nodo1] === undefined) {
        // ! no existe nodo en grafo
        Grafo[row.Nodo1] = {};
      }
      Grafo[row.Nodo1][row.Nodo2] = row.Peso;
      /*
            console.log(row.Nodo1);
            console.log(row.Nodo2);
            console.log(row.Peso);
            console.log();
            */
    })
    .on('end', function () {
      console.log(Grafo);
      return Grafo;
    });
  return Grafo;
}

console.log(LecturaGrafo());
