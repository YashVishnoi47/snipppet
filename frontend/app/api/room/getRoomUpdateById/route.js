import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "Room-ID is not available." },
        { status: 400 }
      );
    }

    const room = await Room.findById(roomId).select("updatedAt createdAt");

    if (room) {
      return NextResponse.json(room, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
