import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router'
import { MovieModel } from '../models/movie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  movies: MovieModel[] | null = null;
  error: string | null = null;
  loading: boolean = true;
  filteredMovies: MovieModel[] | null = null;
  genres: any[] = [];
  selectedGenre: string = '';
  search = '';

  constructor() {
    MovieService.getMovies()
      .then(rsp => {
        // setTimeout(() => {
        //   this.movies = rsp.data;
        // this.loading = false;
        // }, 1000) 

        this.movies = rsp.data;
        this.filteredMovies = rsp.data;
        this.loading = false;

      })
      .catch(err => {
        console.error('Error fetching flights:', err);
        this.error = 'Failed to load flights. Please try again later.';
      });

      MovieService.getGenres()
        .then(rsp => this.genres = rsp.data)
      
  }

  applyFilters() {
  if (!this.movies) return;

  let filtered = [...this.movies];

  //search filter
  const input = this.search.trim().toLowerCase();
  if (input) {
    filtered = filtered.filter(movie => movie.originalTitle.toLowerCase().includes(input));
  }

  //genre filter
  if (this.selectedGenre) {
    filtered = filtered.filter(movie =>
      movie.movieGenres.some(mg =>
        mg.genre.name.toLowerCase() === this.selectedGenre.toLowerCase()
      )
    );
  }

  this.filteredMovies = filtered;
}


  

}
