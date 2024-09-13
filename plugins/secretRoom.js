module.exports = {
  init: function (gameAPI) {
    gameAPI.addRoom("secret", {
      name: "Secret Room",
      description: "You have discovered a secret room!",
      options: ["start"],
    });

    // Modify existing room to include a new option
    const cave = gameAPI.getRoom("cave");
    if (cave) {
      cave.options.push("secret");
    }
  },
};
