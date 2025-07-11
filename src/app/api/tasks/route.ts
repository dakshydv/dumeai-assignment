import { DbConnect } from "@/lib/utils";
import { RecordStringAny, createRecordStringAny } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { TaskModel } from "@/models/model";

export async function POST(req: NextRequest) {
  const { userEmail, title, text } = await req.json();

  if (!userEmail.trim() || !title.trim() || !text.trim()) {
    return NextResponse.json(
      {
        error: "did not receive all credentials",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await DbConnect();

    const noteCreated = await TaskModel.create({
      userEmail,
      title,
      text,
    });

    if (!noteCreated) {
      return NextResponse.json(
        {
          err: "could not create tasks",
        },
        {
          status: 520,
        }
      );
    }

    return NextResponse.json(
      {
        message: "created tasks",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json({
      err,
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");
  if (!userEmail || !userEmail.trim()) {
    return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
  }
  try {
    await DbConnect();
    const tasks = await TaskModel.find({ userEmail });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { userEmail, title, newTitle, newText } = await req.json();

  if (!userEmail?.trim() || !title?.trim()) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 401 });
  }

  try {
    await DbConnect();
    const update: RecordStringAny = createRecordStringAny();
    if (newTitle) update.title = newTitle;
    if (newText) update.text = newText;
    const updated = await TaskModel.findOneAndUpdate(
      { userEmail, title },
      { $set: update },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json(
        { error: "Task not found or not updated" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Task updated", updated },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userEmail, title } = await req.json();
  if (!userEmail?.trim() || !title?.trim()) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 401 });
  }
  try {
    await DbConnect();
    const deleted = await TaskModel.findOneAndDelete({ userEmail, title });
    if (!deleted) {
      return NextResponse.json(
        { error: "Task not found or not deleted" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
