export interface Season {
	movieId: number;
	number: number;
	episodes: Episode[];
	name: string;
	enName: string;
}
export interface Episode {
	number: number;
	name: string;
	enName: string;
	description: string;
}

export interface MovieCard {
	id: number;
	name: string;
	poster: string;
}

export interface MoviePerson {
	id: number;
	photo: string;
	name: string;
	description: string;
	profession: string;
}

export interface Movie {
	id: number;
	name: string;
	type: string;
	poster: string;
	description: string;
	rating: {
		kp: number;
		imdb: number;
	};
	persons: MoviePerson[];
	similarMovies: MovieCard[];

}


export interface QueryParams {
	searchTerm: string;
	currentPage: string;
	pageSize: string;
	[key: string]: string;
  }
  

export interface MoviePoster {
	movieId: number,
	url: string,
}