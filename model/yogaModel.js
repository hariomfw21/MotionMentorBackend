const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    noOfExercises: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "medium", "advanced"],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const WorkoutModel = mongoose.model("workouts", workoutSchema);

module.exports = { WorkoutModel };
