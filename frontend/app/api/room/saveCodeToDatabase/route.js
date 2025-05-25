import Room from "@/lib/db/models/room.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";

export async function POST(req) {
  await connectDB();

  try {
    const { roomId, roomCode } = await req.json();
    console.log(roomCode);
    if (!roomId || !roomCode) {
      return NextResponse.json(
        { error: "Room ID and code are required" },
        { status: 400 }
      );
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    room.roomCode = roomCode;
    await room.save();

    return NextResponse.json(
      { message: "Room code saved successfully.", roomCode: room.roomCode },

      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving code to database:", error);
    return NextResponse.json({ error: "Failed to save code" }, { status: 500 });
  }
}
