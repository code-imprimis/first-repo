// FS package for file management
const fileSystem = require('fs');

const file = fileSystem.readFileSync('myData.txt');
console.log(file.toString());
fileSystem.writeFileSync('myData.txt', 'new text');
fileSystem.writeFileSync('index2.js', 'console.log("new js file");');
fileSystem.rmSync('node.js');

// OS Package for operating system details
const operatingSystem = require('os');
console.log(operatingSystem.uptime());

// readline PACKAGE for input
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});

// DNS PACKAGE
const dns = require('dns');
dns.lookup('google.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});

// Making requests with http
const http = require('http');
http.get({
    hostname: 'localhost',
    port: 5500,
    path: '/myData.txt',
  }, (res) => {
    console.log('Status: ', res.statusCode);
    res.on('data', (chunk) => {
        const content = chunk.toString();
        fileSystem.writeFileSync('myData2.txt', content);
    });
  });