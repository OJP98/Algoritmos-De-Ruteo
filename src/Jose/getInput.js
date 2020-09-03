const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

async function inputListener(servidor) {
  rl.question('Mensaje: ', (mensaje) => {
    console.log('Fork ' + mensaje);

    if (mensaje === 'exit()') {
      rl.close();
      process.send({
        option: 0,
      });
      process.exit();
    } else {
      // console.log(mensaje.substring(0, mensaje.indexOf('>')));
      // console.log(mensaje.substring(mensaje.indexOf('>') + 1, mensaje.length));
      process.send({
        option: 1,
        destino: mensaje.substring(mensaje.indexOf('>') + 1, mensaje.length),
        mensaje: mensaje.substring(0, mensaje.indexOf('>')),
      });
    }

    inputListener();

  });

}

// receive message from master process
process.on('message', async (servidor) => {
  await inputListener(servidor);

  // send response to master process
  //process.send({ counter: numberOfMailsSend });
});