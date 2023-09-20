import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// export const fetchUserWithSelectFields = (
//   userId: moongose.Types.ObjectId,
//   selectFields: string[]
// ) => {
//   return UserModel.findById(userId).select(selectFields);
// };

export const findUserById = async (userId: mongoose.Types.ObjectId) => {
  return await UserModel.findById(userId).then((user) => user?.toObject());
};
