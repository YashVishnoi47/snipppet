import { connectDB } from "@/lib/db/db";
import Room from "@/lib/db/models/room.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const POST = async (req) => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const createdBy = session.user._id;

    const { roomName, codingLang, theme } = await req.json();

    const newRoom = await Room.create({
      roomName,
      codingLang,
      createdBy,
      roomSettings: {
        theme: theme,
      },
    });

    if (newRoom) {
      return NextResponse.json(
        { newRoom },
        { message: "Room Created Successfully" },
        { status: 201 }
      );
    }
    return new Response("Room not created", { status: 409 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
