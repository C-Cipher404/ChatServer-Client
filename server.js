const net = require("net");

const server = net
  .createServer((client) => {
    client.write("Welcome to the chat room");
  })
  .listen(5000, () => {
    console.log("Listening on port 5000");
  });
