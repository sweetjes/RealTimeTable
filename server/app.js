const express = require('express');
const app = express();
const server = require('http').Server(app);
// const { applyOperation } = require('fast-json-patch');
// const applyOperation = require('fast-json-patch').applyOperation;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const fs = require('fs');
const port = 8010;

io.attach(server);
io.on('connection', function (socket) {
  fs.readFile('db.json', function (err, data) {
    const db = JSON.parse(data);

    db.users.push({ id: socket.id, x: 0, y: 0 });

    io.sockets.emit('loadTable', db.table);
    fs.writeFile('db.json', JSON.stringify(db), (err) => {
      if (err) throw err;
    });
  });

  socket.emit('connectUser', { id: socket.id });
  io.sockets.emit('connectUsers', { id: socket.id, x: 0, y: 0 });

  socket.on('saveAmount', (payload) => {
    fs.readFile('db.json', function (err, data) {
      const db = JSON.parse(data);

      let newDB = [...db.table];
      newDB[payload.id].amount = Number(payload.value);

      fs.writeFile('db.json', JSON.stringify({ ...db, table: [...newDB] }), (err) => {
        if (err) throw err;
      });

      io.sockets.emit('editAmount', payload);
    });
  });

  socket.on('savePrice', (payload) => {
    fs.readFile('db.json', function (err, data) {
      const db = JSON.parse(data);

      let newDB = [...db.table];

      newDB[payload.id].priceForOne = Number(payload.value);

      fs.writeFile('db.json', JSON.stringify({ ...db, table: newDB }), (err) => {
        if (err) throw err;
      });

      io.sockets.emit('editPrice', payload);
    });
  });

  socket.on('sendCoordinates', (payload) => {
    io.sockets.emit('getCoordinates', payload);
  });

  socket.on('disconnect', function () {
    fs.readFile('db.json', function (err, data) {
      let db = JSON.parse(data);
      const newUsers = db.users;
      db.users.forEach((user) => {
        if (user.id === socket.id) {
          const index = newUsers.indexOf(user);
          newUsers.splice(index, 1);
        }
      });

      db = { ...db, users: newUsers };

      fs.writeFile('db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
      });
    });
  });
});

server.listen(port, () => console.log(`server is running on ${port}`));
