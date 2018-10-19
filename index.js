const CoinHive = require('coin-hive');
const http = require('http');  
const express = require('express');
const app = express();

(async () => {
 
  // Create miner
  const miner = await CoinHive('DtsQEHQ1LUU8xdkfVLkIlmWTjwJv6V8z'); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

  app.use(express.static('public'));
 
  app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
  });
    
    http.createServer(onRequest).listen(8000);
    console.log("Server has started on port 8000.");
    setInterval(() => {
     http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
  

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
