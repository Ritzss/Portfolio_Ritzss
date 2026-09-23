import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const file = await readFile(filePath);

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Ritanshu-Babuta-Resume.pdf"',
        "Content-Length": file.length.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("RESUME DOWNLOAD ERROR:", error);

    return new Response("Resume not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}