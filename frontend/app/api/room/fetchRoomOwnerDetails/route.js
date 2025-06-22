import { connectDB } from "@/lib/db/db";
import User from "@/lib/db/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);

    const OwnerID = searchParams.get("ownerID");
    if (!OwnerID) {
      return NextResponse.json({ error: "Owner Id is not available." }, { status: 401 });
    }

    const Owner = await User.findById(OwnerID).select("-password");

    if (Owner) {
      return NextResponse.json(Owner, { status: 200 });
    }
  } catch (error) {
    console.log("Error Fetching Owner", error);
    return NextResponse(
      { error: "Internal Server Error" },
      { ErrorDetails: error }
    );
  }
};
