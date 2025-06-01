import User from "@/lib/db/models/user.model";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const GET = async () => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;

    const user = await User.findById(userId);

    if (user) {
      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in getUser:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
