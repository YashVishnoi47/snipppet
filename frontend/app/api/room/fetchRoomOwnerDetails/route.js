import { connectDB } from "@/lib/db/db";
import User from "@/lib/db/models/user.model";

export const GET = async (req) => {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);

    const OwnerID = searchParams.get("ownerID");
    if (!OwnerID) {
      return Response.json({ error: "Provide Owner ID" }, { status: 401 });
    }

    const Owner = await User.findById(OwnerID);

    if (Owner) {
      return new Response(JSON.stringify({ Owner }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("Error Fetching Owner", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
