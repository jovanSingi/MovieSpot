import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { OrderModel } from '../models/order.model';
import { Utils } from '../utils';
import { Order } from '../order/order';
import { UserModel } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

  public orders: OrderModel[] = [];
  public user: UserModel;

  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';




  constructor(private router: Router, public utils: Utils) {
    if (!UserService.getActiveUser())
      router.navigate(['/login'])



    this.orders = UserService.getActiveUser().orders;
    this.user = UserService.getActiveUser();
  }


  changeRating(order: OrderModel, rating: 'liked' | 'disliked') {
    // uzimamo sve korisnike iz localStorage
    const users: UserModel[] = JSON.parse(localStorage.getItem('users') || '[]');

    // aktivni korisnik
    const user = UserService.getActiveUser();
    if (!user) return;

    // pronalazimo indeks aktivnog korisnika u listi
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex === -1) return;

    // pronalazimo order unutar korisnika
    const orderIndex = users[userIndex].orders.findIndex(
      o => o.selectedMovie.movieId === order.selectedMovie.movieId
    );
    if (orderIndex === -1) return;

    // menja rating
    users[userIndex].orders[orderIndex].rating = rating;

    // čuvamo nazad u localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // opcionalno, da se odmah vidi u UI
    order.rating = rating;
  }

  public doChangePassword() {
    if (this.currentPassword == '' || this.newPassword == '' || this.confirmPassword == '') {
      alert("Morate popuniti sva polja da bi promenili password ")
    } else {
      UserService.changePassword(this.currentPassword, this.newPassword, this.confirmPassword);
    }
  }



}
