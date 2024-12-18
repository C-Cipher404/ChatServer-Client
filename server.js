const net = require("net");

const server = net
  .createServer((client) => {})
  .listen(5000, () => {
    console.log("Listening on port 5000");
  });
