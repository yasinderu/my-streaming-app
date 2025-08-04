import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("stream-db");

  await db.collection("movies").insertMany(body);

  return new Response(
    JSON.stringify({
      message: "Success",
    }),
    {
      status: 201,
    }
  );
}
