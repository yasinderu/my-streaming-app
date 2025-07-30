import clientPromise from "@/lib/mongodb";
import { Favorite } from "@/types/Favorite";
import { Movie } from "@/types/Movie";

export async function getFavorite(userId: string): Promise<Favorite | null> {
  try {
    const client = await clientPromise;
    const db = client.db("stream-db");

    const result = await db.collection("favorites").findOne({ userId });

    if (!result) return null;

    return {
      id: result._id.toString(),
      userId: result.userId,
      movies: result.movies,
    };
  } catch (error) {
    console.error("Failed to fetch favorite movies:", error);
    throw new Error("Failed to fetch avorite movies.");
  }
}

export async function addMovieToFavorite(
  userId: string,
  movie: Movie
): Promise<Favorite | null> {
  const fav = await getFavorite(userId);
  const client = await clientPromise;
  const db = client.db("stream-db");

  let favoriteCollection = {} as Favorite;

  if (!fav) {
    const favData: Favorite = {
      id: "abc",
      userId: userId,
      movies: [{ ...movie }],
    };
    const result = await db.collection("favorites").insertOne(favData, {});
    if (result) {
      favoriteCollection = {
        id: result.insertedId.toString(),
        _id: result.insertedId,
        userId: userId,
        movies: [{ ...movie }],
      };
    }
  } else {
    const result = await db.collection<Favorite>("favorites").findOneAndUpdate(
      { userId },
      { $push: { movies: movie } },
      {
        returnDocument: "after",
      }
    );

    if (result) {
      favoriteCollection = {
        id: result._id.toString(),
        _id: result._id,
        userId: result.userId,
        movies: result.movies,
      };
    }
  }

  if (!favoriteCollection) return null;

  return favoriteCollection;
}

export async function removeMovieFromFavorite(
  userId: string,
  movieId: string
): Promise<Favorite | null> {
  const fav = await getFavorite(userId);
  const client = await clientPromise;
  const db = client.db("stream-db");

  if (!fav) return null;

  const newMovies = fav.movies.filter((movie) => movie.id !== movieId);

  await db
    .collection("favorites")
    .updateOne({ userId }, { $set: { movies: newMovies } });

  return {
    ...fav,
    movies: newMovies,
  };
}
