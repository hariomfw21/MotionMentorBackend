const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
  steps: [
    {
      stepNumber: {
        type: Number,
        required: true,
      },
      stepName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      stepImage: {
        type: String,
      },
    },
  ],
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workout",
  },
},{
  versionKey:false
});

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = { ExerciseModel };
