const net = require("net");

const client = net.createConnection(5000, () => {
  console.log("Connected");
});
