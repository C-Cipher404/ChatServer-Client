const net = require("net");
const readline = require("readline");

const client = net.createConnection(5000, () => {
  console.log("Connected to the server.");
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.on("data", (data) => {
  console.log(data.toString());
});

rl.on("line", (input) => {
  client.write(input);
});

client.on("end", () => {
  console.log("Disconnected from the server.");
  rl.close();
});
