import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Movie } from './movie/movie';
import { User } from './user/user';
import { Login } from './login/login';
import { Order } from './order/order';
import { Signup } from './signup/signup';


export const routes: Routes = [
    {path: '', component : Home},
    {path: 'movie/short/:name', component : Movie},
    {path: 'profile', component : User},
    {path: 'login', component : Login},
    {path: 'signup', component : Signup},
    {path: 'order/:id', component : Order},


    {path: '**', redirectTo: ''}
];
