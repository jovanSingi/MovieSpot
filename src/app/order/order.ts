import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';



@Component({
  selector: 'app-order',
  imports: [ NgStyle, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {

  public currentMovie: MovieModel | null = null;
  public selectedDate: string;
  public selectedTime = '18:00';
  public numberOfTickets: number = 1;
  public pricePerItem: number = 300;
  public selectedMovie: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/login'])
    }

    route.params.subscribe(params => {
      MovieService.getMovieById(params['id']).then(response => {
        this.currentMovie = response.data
      })
    })

    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    
  }

  public doOrder() {
    const result = UserService.createOrder({
      selectedMovie: this.currentMovie,
      selectedDate: this.selectedDate,
      selectedTime: this.selectedTime,
      numberOfTickets: this.numberOfTickets,
      pricePerItem: this.pricePerItem,
      status: 'ordered',
      rating: 'not-rated'

    })
    result ? this.router.navigate(['/profile']) : alert('an error ocured while creating an order');
  }
}


