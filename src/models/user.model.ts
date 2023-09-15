import moongose from "mongoose";

const userSchema = new moongose.Schema(
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

export const UserModel = moongose.model("User", userSchema);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const fetchUserWithSelectFields = (
  userId: moongose.Types.ObjectId,
  selectFields: string[]
) => {
  return UserModel.findById(userId).select(selectFields);
};
