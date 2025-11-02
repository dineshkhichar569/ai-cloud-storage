import { getMongoose } from "./mongoose";
import { IUser, UserModel } from "../models/User";

export async function upsertUserByEmail(params: {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}): Promise<IUser | null> {
  if (!params.email) return null;
  await getMongoose();

  const user = await UserModel.findOneAndUpdate(
    { email: params.email.toLowerCase() },
    {
      $setOnInsert: { role: "user" as const, hasOnboarded: false },
      $set: {
        name: params.name ?? undefined,
        image: params.image ?? undefined,
      },
    },
    { new: true, upsert: true },
  )
    .lean<IUser>()
    .exec();

  return user;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  await getMongoose();
  return UserModel.findOne({ email: email.toLowerCase() }).lean<IUser>().exec();
}

export async function setOnboardingComplete(
  email: string,
  displayName: string,
): Promise<IUser | null> {
  await getMongoose();
  const now = new Date();
  const user = await UserModel.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      $set: {
        name: displayName,
        hasOnboarded: true,
        acceptedToSet: now,
      },
    },
    { new: true },
  )
    .lean<IUser>()
    .exec();
  return user;
}
