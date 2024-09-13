const express = require("express");
const app = express();
const path = require("path");

const fs = require("fs");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendStatus(200);
});

let rooms = {
  start: {
    name: "Start Room",
    description: "You are in the starting room.",
    options: ["forest", "cave"],
  },
  forest: {
    name: "Forest",
    description: "You are in a dark forest.",
    options: ["start"],
  },
  cave: {
    name: "Cave",
    description: "You are in a spooky cave.",
    options: ["start"],
  },
};

const gameAPI = {
  addRoom: function (roomName, roomData) {
    rooms[roomName] = roomData;
  },
  getRoom: function (roomName) {
    return rooms[roomName];
  },
};

function loadPlugins() {
  const pluginDir = path.join(__dirname, "plugins");
  fs.readdirSync(pluginDir).forEach((file) => {
    const pluginPath = path.join(pluginDir, file);
    const plugin = require(pluginPath);
    if (typeof plugin.init === "function") {
      plugin.init(gameAPI);
      console.log(`Loaded plugin: ${file}`);
    }
  });
}

loadPlugins();

app.get("/room/:roomName", (req, res) => {
  const roomName = req.params.roomName;
  const room = rooms[roomName];

  console.log(rooms);

  if (room) {
    res.render("index", { room });
  } else {
    res.status(404).send("Room not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
