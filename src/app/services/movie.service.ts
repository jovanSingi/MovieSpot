import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'MovieSpot'
    },
    validateStatus: (status: number) => {
        return status === 200 // samo ako je status 200 ostale baci exeption
    }
});

export class MovieService {

    static async getMovies() {
        return client.request({
            url: '/movie',
            method: 'GET',
        });
    }

    static async getMovieByShortURL(shortUrl: string) {
        return client.get(`/movie/short/${shortUrl}`);
    }

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }

    static async getGenres() {
        return client.get('/genre');
    }
}

