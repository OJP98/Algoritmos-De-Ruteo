const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
async function inputListener(servidor) {
  rl.question('Mensaje: ', (mensaje) => {
    console.log('Fork ' + mensaje);
    if (mensaje === 'exit()') {
      rl.close();
      return;
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
