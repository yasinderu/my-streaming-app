export interface Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids?: number[];
}
