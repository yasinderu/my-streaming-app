import { signOut } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await signOut({ redirectTo: "/" });

  return new Response(
    JSON.stringify({
      message: "SignOut successfully",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
