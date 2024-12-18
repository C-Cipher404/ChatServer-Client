const net = require("net");
const fs = require("fs");

let clientId = 0;
let clients = [];

const server = net.createServer((client) => {
  clientId++;
  client.name = `Client${clientId}`;

  fs.appendFile("chat.log", `${client.name} connected\n`, (err) => {
    if (err) throw err;
  });

  client.write(`Welcome to the chat room, ${client.name}!\n`);

  clients.forEach((otherClient) => {
    if (otherClient !== client) {
      otherClient.write(`${client.name} has joined the chat.\n`);
    }
  });

  clients.push(client);

  client.on("data", (data) => {
    const message = `${client.name}: ${data}`;

    clients.forEach((otherClient) => {
      if (otherClient !== client) {
        otherClient.write(message);
      }
    });

    fs.appendFile("chat.log", message, (err) => {
      if (err) throw err;
    });
  });

  client.on("end", () => {
    clients = clients.filter((otherClient) => otherClient !== client);
    clients.forEach((otherClient) => {
      otherClient.write(`${client.name} has left the chat.\n`);
    });

    fs.appendFile("chat.log", `${client.name} disconnected\n`, (err) => {
      if (err) throw err;
    });
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
