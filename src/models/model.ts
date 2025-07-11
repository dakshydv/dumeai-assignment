import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const noteSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, "Please provide users email"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
  },
  text: {
    type: String,
    required: false,
  },
});

const taskSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, "Please provide users email"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
  },
  text: {
    type: String,
    required: false,
  },
});

export const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
export const NoteModel = mongoose.models.notes || mongoose.model("notes", noteSchema);
export const TaskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);