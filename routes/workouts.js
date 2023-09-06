const express = require("express");
const { WorkoutModel } = require("../model/yogaModel");
const workouts = express();

workouts.get("/workouts", async (req, res) => {
  try {
    const totalWorkouts = await WorkoutModel.find();
    res.json(totalWorkouts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving Workouts exercises" });
  }
});

workouts.post("/workouts", async (req, res) => {
  try {
    const workout = new WorkoutModel(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Error creating yoga exercise" });
  }
});

workouts.put("/workouts/:id", async (req, res) => {
  try {
    const updatedWorkout = await WorkoutModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: "Error updating workouts exercise" });
  }
});

workouts.delete("/workouts/:id", async (req, res) => {
  try {
    await WorkoutModel.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting yoga exercise" });
  }
});

module.exports = {
  workouts,
};
