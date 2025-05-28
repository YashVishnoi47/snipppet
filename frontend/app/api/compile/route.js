import { compilewithjudge0 } from "@/lib/judge0";

export async function POST(req) {
  try {
    const { source_code, language_id, stdin } = await req.json();

    if (!source_code || !language_id) {
      return Response.json(
        { error: "Missing code or language" },
        { status: 400 }
      );
    }
    const result = await compilewithjudge0(
      source_code,
      language_id,
      stdin || ""
    );

    return Response.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Compilation Error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
