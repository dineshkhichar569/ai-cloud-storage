import { Schema, model, models, type InferSchemaType } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  role: UserRole;
  hasOnboarded: boolean;
  acceptedTosAt?: Date;
  quotaBytes: number;
  usedBytes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String },
    image: { type: String },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },

    hasOnboarded: { type: Boolean, default: false },
    acceptedToSet: Date,

    quotaBytes: { type: Number, default: 5 * 1024 * 1024 * 1024 },
    usedBytes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const UserModel = models.User<IUser> || model<IUser>("User", UserSchema);
