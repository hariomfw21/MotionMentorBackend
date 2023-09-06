const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const { ExerciseModel } = require("../model/exerciseModel");
const exerciseRoute = express.Router();

exerciseRoute.get("/exercises", async (req, res) => {
  try {
    const exercises = await ExerciseModel.find();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error retrieving exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exerciseRoute.get("/exercises/:_id", async (req, res) => {
  const _id = req.params._id;
  try {
    const exercises = await ExerciseModel.findById(_id);
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error retrieving exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exerciseRoute.get("/workouts/exercises/:workoutId", async (req, res) => {
  const workoutId = req.params.workoutId;
  try {
    const exercises = await ExerciseModel.find({ workoutId });
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error retrieving exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exerciseRoute.post("/exercises", async (req, res) => {
  try {
    const newExercise = new ExerciseModel(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exerciseRoute.put("/exercises/:exerciseId", async (req, res) => {
  const exerciseId = req.params.exerciseId;
  const updatedExerciseData = req.body; // Updated exercise data sent in the request body

  try {
    const updatedExercise = await ExerciseModel.findByIdAndUpdate(
      exerciseId,
      updatedExerciseData,
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exerciseRoute.delete("/exercises/:exerciseId", async (req, res) => {
  const exerciseId = req.params.exerciseId;

  try {
    // Find the exercise by ID and delete it
    const deletedExercise = await ExerciseModel.findByIdAndRemove(exerciseId);

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(204).send(); // 204 No Content response, as there's no data to return
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  exerciseRoute,
};
