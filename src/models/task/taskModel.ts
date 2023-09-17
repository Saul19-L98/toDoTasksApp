import moongose from "mongoose";

const taskSchema = new moongose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      requiered: true,
    },
    user: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = moongose.model("Task", taskSchema);
