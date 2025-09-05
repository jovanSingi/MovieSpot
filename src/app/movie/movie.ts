import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../models/movie.model';
import { NgStyle } from "@angular/common";
import { Utils } from '../utils';

@Component({
  selector: 'app-movie',
  imports: [NgStyle, RouterLink],
  templateUrl: './movie.html',
  styleUrl: './movie.css'
})
export class Movie {
  public movie: MovieModel | null = null;

  public constructor(route: ActivatedRoute, public utils: Utils) {
    route.params.subscribe(params => {
      MovieService.getMovieByShortURL(params['name'])
        .then(rsp => {
          this.movie = rsp.data
          console.log('movie:', this.movie)
        })
        .catch(err => {
          console.error('error:', err)
        })
    })
  }
}
