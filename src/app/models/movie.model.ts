export interface DirectorModel {
  directorId: number;
  name: string;
  createdAt: string;
}

export interface ActorModel {
  actorId: number;
  name: string;
  createdAt: string;
}

export interface MovieActorModel {
  movieActorId: number;
  movieId: number;
  actorId: number;
  actor: ActorModel;
}

export interface GenreModel {
  genreId: number;
  name: string;
  createdAt: string;
}

export interface MovieGenreModel {
  movieGenreId: number;
  movieId: number;
  genreId: number;
  genre: GenreModel;
}

export interface MovieModel {
  movieId: number;
  internalId: string;
  corporateId: string;
  directorId: number;
  title: string;
  originalTitle: string;
  description: string;
  shortDescription: string;
  poster: string;
  startDate: string;
  shortUrl: string;
  runTime: number;
  active: boolean;
  createdAt: string;
  updatedAt: string | null;
  director: DirectorModel;
  movieActors: MovieActorModel[];
  movieGenres: MovieGenreModel[];
}
