import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const RoomId = searchParams.get("roomId");
    const live = searchParams.get("live");
    if (!RoomId) {
      return NextResponse.json(
        { error: "RoomId is not available" },
        { status: 401 }
      );
    }

    const room = await Room.findByIdAndUpdate(
      RoomId,
      { isPublic: live },
      { new: true }
    );
    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Update room status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { details: error.message }
    );
  }
};
