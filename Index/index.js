const express = require("express");
const PORT = 5000;
const app = express();
app.use(express.json());

const gamers = [
  { id: 1, name: "John", game: "Acade" },
  { id: 2, name: "Peter", game: "Adventure" },
  { id: 3, name: "Lebile", game: "Soccer" },
  { id: 4, name: "Judit", game: "Action" },
  { id: 5, name: "Kunle", game: "Raceing" },
];

//Default View
app.get("/", (req, res) => {
  res.send("Server is up and ready");
});

//Show all Gamers
app.get("/api/gamers", (req, res) => {
  res.send(gamers);
});

//To get gamers by id
app.get("/api/gamers/:id", (req, res) => {
  const gamerID = gamers.find((user) => user.id === parseInt(req.params.id));
  if (!gamerID) {
    res.status(400).send(`No gamer with this ID: ${req.params.id}`);
  }
  res.send(gamerID);
});

//Create a new gamer
app.post("/api/gamers/", (req, res) => {
  if (!req.body.name || !req.body.game) {
    res.status(400).send("Common Go back and fill in something joor");
    return;
  }
  const NewGamer = {
    id: gamers.length + 1,
    name: req.body.name,
    game: req.body.game,
  };

  gamers.push(NewGamer);
  res.status(200).send(NewGamer);
});

app.listen(PORT, () => {
  console.log(`Server is Ready to listen to port ${PORT}`);
});
