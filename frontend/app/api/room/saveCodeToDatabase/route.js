import Room from "@/lib/db/models/room.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";

export async function POST(req) {
  await connectDB();

  try {
    const { roomId, roomCode, htmlCode, cssCode, jsCode } = await req.json();
    if (!roomId) {
      return NextResponse.json(
        { error: "Room ID and code are required" },
        { status: 400 }
      );
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // room.roomCode = roomCode;
    room.htmlCode = htmlCode;
    room.cssCode = cssCode;
    room.jsCode = jsCode;
    await room.save();

    return NextResponse.json(
      { message: "Code saved to DataBase!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving code to database:", error);
    return NextResponse.json({ error: "Failed to save code" }, { status: 500 });
  }
}
