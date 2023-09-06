const express = require("express");
const { connection } = require("./connection/connection");
const { userRouter } = require("./routes/user");
const cors = require("cors");
const { workouts } = require("./routes/workouts");
const { exerciseRoute } = require("./routes/exercises");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fitnessa App");
});

app.use(userRouter);
app.use(workouts);
app.use(exerciseRoute);

app.listen(3000, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log(`Listening on ${3000}`);
  } catch (error) {
    console.log("Failed while connecting to Database");
    console.log(error);
  }
});
