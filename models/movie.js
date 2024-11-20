import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    review: {
      type: String,
      required: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      default: "0",
    },
    isWatched: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
