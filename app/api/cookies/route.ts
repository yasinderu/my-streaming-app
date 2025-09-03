import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const cookieStore = await cookies();
  const body = await request.json();

  if (!session)
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      { status: 401 }
    );

  const cookiesName = body.cookiesName;
  const cookiesValue = body?.cookiesValue;
  const actionType = body.actionType;

  console.log(body);

  if (actionType === "set") {
    cookieStore.set(cookiesName, cookiesValue);
  }

  if (actionType === "del") {
    cookieStore.delete(cookiesName);
  }

  return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
}
