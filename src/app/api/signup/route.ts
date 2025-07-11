import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/model";
import { DbConnect } from "@/lib/utils";

export async function POST(req: Request) {
  await DbConnect();
  const { username, email, password } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }
  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "Username or email already exists." },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ username, email, password: hashedPassword });
  await user.save();
  return NextResponse.json(
    { message: "User created successfully." },
    { status: 201 }
  );
}
