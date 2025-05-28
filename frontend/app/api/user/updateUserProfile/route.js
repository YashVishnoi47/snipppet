import User from "@/lib/db/models/user.model";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const POST = async (req) => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { email, FirstName, LastName, aboutUser } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      session.user._id,
      {
        email,
        FirstName,
        LastName,
        aboutUser,
      },
      { new: true }
    );

    return new Response(
      JSON.stringify(
        {
          message: "User updated successfully",
          user: updatedUser,
        },
        { status: 200 }
      ),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
