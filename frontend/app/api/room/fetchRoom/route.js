import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userID = session.user._id;
    if (!userID) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("roomName") || "";
    const lang = searchParams.get("lang") || "";

    let query = { createdBy: userID };

    if (search.trim()) {
      query.roomName = { $regex: search, $options: "i" };
    }

    if (lang.trim() !== "all") {
      query.codingLang = { $regex: lang, $options: "i" };
    }

    const rooms = await Room.find(query);

    if (rooms.length > 0) {
      return NextResponse.json({ rooms }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No Rooms Created" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
