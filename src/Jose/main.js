const { fork } = require('child_process');

const process = fork('./send_mail.js');

process.send('servidor');

process.on('message', (message) => {
  console.log(`Number of mails sent ${message.counter}`);
});

function function1() {
  // stuff you want to happen right away
  console.log('Welcome to My Console,');
}

function function2() {
  // all the stuff you want to happen after that pause
  console.log('\nEntra un nuevo mensaje\n');
}

// call the first chunk of code right away
function1();

// call the rest of the code and have it execute after 3 seconds
setTimeout(function2, 3000);

setTimeout(function2, 6000);

setTimeout(function2, 12000);
