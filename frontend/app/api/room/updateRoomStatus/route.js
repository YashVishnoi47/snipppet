import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";

export const POST = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const RoomId = searchParams.get("roomId");
    const live = searchParams.get("live");
    if (!RoomId) {
      return new Response(
        JSON.stringify({ error: "RoomId is not available" }, { status: 401 })
      );
    }

    const room = await Room.findByIdAndUpdate(
      RoomId,
      { isPublic: live },
      { new: true }
    );
    if (!room) {
      return new Response(JSON.stringify({ error: "Room not found" }), {
        status: 404,
      });
    }

    // if (room.isPublic === live) {
      console.log(`Room is now ${live}`);
      return new Response(JSON.stringify({ room }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    // }
  } catch (error) {
    console.error("Update room status error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
